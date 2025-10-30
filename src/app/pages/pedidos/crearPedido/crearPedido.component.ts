import { CommonModule } from '@angular/common';
import { Component, HostListener, ChangeDetectorRef, ViewChild, ElementRef, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet, NavigationEnd } from '@angular/router';
import { ClientsService } from '../../../services/clientes.service';
import { ArticlesSharedService } from '../../../services/articlesShared.service';
import { ClientsDTO, CreateOrderDTO, ArticlesDTO } from './crearPedido.interface';
import { TABLA_ARTICULOS, ALERTA_MODAL } from './crearPedido.config';
import { AlertModalComponent } from '../../../shared/alertModal/alertModal.component';
import { OrderService } from '../../../services/pedidos.service';
import { OrderCreateDTO, CreateArticles } from '../../../models/pedidos.model';
import { FormsModule } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-crear-pedidos-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, AlertModalComponent],
  templateUrl: './crearPedido.component.html',
  styleUrls: ['./crearPedido.component.scss'],
})
export class CrearPedidosPageComponent implements OnInit, AfterViewChecked, OnDestroy {
  //Varible para almacenar los clientes
  clients: ClientsDTO[] = [];
  // variable para saber cuando el hijo cargo un nuevo articulo
  private subNewArticle!: Subscription;
  // Variable para almacenar datos del formulario
  newOrder: CreateOrderDTO = {
    customer_id: 0,
    client: '',
    articles: [],
  };

  //Varible para manejar visualizacion de hijos
  viewPageChildren = false;

  // Variables para el manejo de select personalizado
  openClient = false;

  // Variable para manjera lo logica de la tabla
  tableConfig = structuredClone(TABLA_ARTICULOS);

  // Variables para manejar el paginador
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  paginate: any[] = [];

  // manejo de configuraciones de entrada para el modal de alerta
  alertModalConfig = structuredClone(ALERTA_MODAL);
  showAlertModal: boolean = false;

  // Variable para almacenar el articulo que se quiere eliminar
  articleToDelete: number | null = null;

  //Variable para manejar los errores de validacion
  orderErrors = {
    client_error: '',
    articles_error: '',
  };
  counterErrors = 0;
  //variable para manejar error general
  generalError = '';
  //Variables para scroll automatico al error
  private hasScrolled = false;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly clienteService: ClientsService,
    private readonly articlesSharedService: ArticlesSharedService,
    private readonly orderService: OrderService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.clients.length === 0) {
      this.getClintes();
    }
    // Verificamos si llegó por flujo permitido
    const context = localStorage.getItem('lastContext');
    const fromParent = localStorage.getItem('fromParentCreate');

    // Si llegó desde el padre (pedidos)
    if (fromParent) {
      localStorage.removeItem('fromParentCreate');
    } else if (context) {
      // Si no hay contexto, se recargó directamente o vino por URL manual
      this.router.navigate(['/pedidos']);
      return;
    }
    // lógica para ocultar contenido si hay nieto
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const childRoute = this.route.firstChild;
      this.viewPageChildren = !!childRoute;
      this.cdr.detectChanges();

      // Si regresa al padre, verificamos si hay nuevo artículo
      if (!childRoute) {
        const article = this.articlesSharedService.getArticlesList();
      }
    });

    // Escuchar el artículo cuando sea emitido por el hijo
    this.subNewArticle = this.articlesSharedService.newArticle$.pipe(filter((article): article is ArticlesDTO => !!article)).subscribe((article) => {
      // Se ejecuta cuando el hijo hace sendNewArticle()
      this.newOrder.articles.push(article);
      // Limpia el valor para que no se vuelva a emitir al navegar
      this.articlesSharedService.sendNewArticle(null as any);
      this.totalPages = Math.ceil(this.newOrder.articles.length / this.itemsPerPage);
      // Si solo hay un artículo, reinicia la paginación
      if (this.newOrder.articles.length === 1) {
        this.currentPage = 1;
      }
      this.setPage(this.currentPage);
    });
  }

  // Accion para regresar al padre
  onBackAction() {
    localStorage.removeItem('lastContext');
    this.router.navigate(['/pedidos']);
  }

  // Logica para cuando se genere un error global lo lleve al mensaje
  @ViewChild('errorDiv') errorDiv!: ElementRef;
  ngAfterViewChecked() {
    if (this.generalError && this.errorDiv && !this.hasScrolled) {
      this.errorDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.hasScrolled = true;
    }
    // Resetear cuando desaparece el error
    if (!this.generalError) {
      this.hasScrolled = false;
    }
  }

  // Almacenar los datos de los selcts
  onFormChange(eventOrValue: Event | number | string, key: keyof CreateOrderDTO) {
    let value: any;

    if (eventOrValue instanceof Event) {
      const inputElement = eventOrValue.target as HTMLInputElement;
      value = inputElement.value;
    } else {
      value = eventOrValue;
    }
    // Si se selecciona un cliente tambien guarda el formato completo
    if (key === 'customer_id') {
      const getName = this.clients.find((u) => u.customer_id === value);
      if (getName) {
        this.newOrder.client = `${getName.name} - ${value}`;
        this.orderErrors.client_error = '';
      }
    }

    (this.newOrder as any)[key] = value;
  }

  // abrir pantalla de añadir articulos
  openAddArticlePage() {
    // Enviar articulos ya añadidos al hijo
    this.articlesSharedService.setArticlesList(this.newOrder.articles);
    localStorage.setItem('fromParentCreate', '1');
    // navegar pasando state para identificar que viene del padre
    this.router.navigate(['añadir-articulo'], { relativeTo: this.route });
  }

  // Limpiar servicio que comparte datos con añadir articulos
  ngOnDestroy() {
    this.articlesSharedService.clear();
  }

  toggleCategory() {
    this.openClient = !this.openClient;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select-container')) {
      this.openClient = false;
    }
  }

  // Logica para la tabla

  // Manejar el cambio en el input de cantidad
  onCostChange(value: string, item: ArticlesDTO) {
    // Logica de errores dinamicos para la tabla
    if (Number(value) < 1) {
      this.orderErrors.articles_error = 'Debe ingresar una cantidad válida mayor a 0.';
    } else {
      this.orderErrors.articles_error = '';
      item.amount = Number(value);
    }
  }

  // Permite solo números y teclas de control como Backspace, Delete, Arrow Keys
  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedKeys = ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace', 'Tab'];

    const isCtrlV = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v';
    if (isCtrlV) return;

    if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  // Logica para el paginador

  // Logica para dividir en paginas
  setPage(page: number) {
    const items = this.newOrder.articles;
    this.currentPage = page;
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginate = items.slice(start, end);
  }

  // Lógica de páginas visibles con puntos suspensivos
  get visiblePages(): (number | 'dots')[] {
    const pages: (number | 'dots')[] = [];
    if (this.totalPages <= 5) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (this.currentPage > 3) pages.push('dots');

      const start = Math.max(2, this.currentPage - 2);
      const end = Math.min(this.totalPages - 1, this.currentPage + 2);

      for (let i = start; i <= end; i++) pages.push(i);
      if (this.currentPage < this.totalPages - 2) pages.push('dots');
      pages.push(this.totalPages);
    }
    return pages;
  }

  // Ir a la pagina nueva
  goToPage(page: number | 'dots') {
    if (page !== 'dots') this.setPage(page);
  }

  //Primer dato del paginador
  get firstItemIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  //Ultimo dato del paginador
  get lastItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.newOrder.articles.length);
  }

  // Abrir y poblar modal de alerta

  onAlertModal(index: number) {
    // Guardar el articulo que se quiere eliminar
    this.articleToDelete = (this.currentPage - 1) * this.itemsPerPage + index;
    this.showAlertModal = true;
    this.alertModalConfig.title = '¿Desea eliminar este artículo?';
    this.alertModalConfig.text = 'Si el artículo es eliminado, podrá añadirlo nuevamente si lo necesita.';
  }

  // Eliminar articulo
  deleteArticle() {
    if (this.articleToDelete !== null) {
      this.newOrder.articles.splice(this.articleToDelete, 1);
      this.articleToDelete = null;
      this.closeAlertModal();

      // Recalcular paginación
      this.totalPages = Math.ceil(this.newOrder.articles.length / this.itemsPerPage);
      if (this.totalPages === 0) {
        this.currentPage = 1; // Reiniciar si no hay artículos
        this.paginate = [];
        return;
      }

      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      this.setPage(this.currentPage);
    }
  }

  // cerrar el modal de alerta
  closeAlertModal() {
    this.showAlertModal = false;
  }

  onCreateOrder() {
    this.generalError = '';
    this.validateRequiredFields();
    // Contar errores reales
    this.counterErrors = Object.values(this.orderErrors).filter((error) => error).length;

    if (this.counterErrors === 0) {
      this.createNewOrder();
    }
  }

  //limpiar errores
  clearErrors() {
    this.orderErrors = {
      client_error: this.orderErrors.client_error || '',
      articles_error: this.orderErrors.articles_error || '',
    };
    this.counterErrors = 0;
  }

  //Validacion de errores campos obligatorios
  validateRequiredFields() {
    // Si no hay cliente seleccionado y no hay un error previo, asigna el obligatorio
    if (!this.newOrder.client && !this.orderErrors.client_error) {
      this.orderErrors.client_error = 'Este campo es obligatorio';
    }

    // Si no hay artículos y no hay un error previo, asigna el obligatorio
    if ((!this.newOrder.articles || this.newOrder.articles.length === 0) && !this.orderErrors.articles_error) {
      this.orderErrors.articles_error = 'Este campo es obligatorio';
    }
  }

  //Ejecucion de EP's
  getClintes() {
    this.clienteService
      .getClients()
      .pipe(
        map((response) =>
          response.map((u) => ({
            customer_id: u.customer_id,
            name: u.name,
          })),
        ),
      )
      .subscribe({
        next: (res) => {
          this.clients = res;
        },
        error: (err) => {},
      });
  }

  // crear pedido
  createNewOrder() {
    const dataArticles: CreateArticles[] = this.newOrder.articles.map((art) => ({
      ref_design: art.ref_design,
      amount: art.amount,
      cod_color: art.cod_color,
      cod_size: art.cod_size,
    }));

    const dataCreate: OrderCreateDTO = {
      customer_id: this.newOrder.customer_id,
      articles: dataArticles,
    };

    this.orderService.postCreateOrder(dataCreate).subscribe({
      next: (res) => {
        this.onBackAction();
      },
      error: (err) => {
        this.generalError = 'No se pudo realizar la creación, intentelo nuevamente.';
      },
    });
  }
}

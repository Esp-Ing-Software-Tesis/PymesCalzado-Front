import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Component, ViewChild, ElementRef, OnInit, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputShowDetailGeneral } from './showDetailGeneral.interface';
import { DetailConfigService } from '../../services/detailConfig.service';
import { FormsModule } from '@angular/forms';
import { INFO_TASKS, INFO_TASKS_DETAIL } from './showDetailGeneral.config';
import { TasksDetailDTO } from '../../pages/tareasAdministrador/crearEditarTareas/crearEditarTareas.interface';
import { TasksSharedService } from '../../services/tasksShared.service';
import { TasksService } from '../../services/tareas.service';
import { CreateTasks } from '../../models/tareas.model';
import { map, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shoe-detail-general',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './showDetailGeneral.component.html',
  styleUrls: ['./showDetailGeneral.component.scss'],
})
export class ShowDetailGeneralComponent implements OnInit, AfterViewChecked {
  inputsConfigPage!: InputShowDetailGeneral;

  // Variable para manejar las tareas a crear
  dataCreateTask: TasksDetailDTO[] = [];

  // variable para saber cuando el hijo cargo un nuevo articulo
  private subNewTasks!: Subscription;

  //Varible para manejar visualizacion de hijos
  viewPageChildren = false;
  // manejo de configuraciones iniciales para la pagina de crear o editar tareas
  createEditConfig = structuredClone(INFO_TASKS);
  // manejo de configuraciones iniciales para la pagina de ver tareas
  showTasksConfig = structuredClone(INFO_TASKS_DETAIL);

  // Variables para manejar el paginador
  currentPage: number = 1;
  totalPages: number = 0;
  paginate: any[] = [];

  //variable para manejar error general
  generalError = '';
  //variable para contar errores
  numErrors = 0;
  //Variables para scroll automatico al error
  private hasScrolled = false;

  constructor(
    private readonly detailConfigService: DetailConfigService,
    private readonly tasksSharedService: TasksSharedService,
    private readonly router: Router,
    private readonly tasksService: TasksService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.viewPageChildren = url.includes('/crear-editar-tareas') || url.includes('/detalle-tareas');
    });

    // Escuchar la configuración desde el servicio (enviada por el padre)
    this.detailConfigService.config$.subscribe((config) => {
      if (config) {
        this.inputsConfigPage = config;

        const allItems = this.getOrderItems(); // <- plano
        this.dataCreateTask = allItems.map((item: any) => ({
          articleId: item.id,
          tasksArticlesDTO: [],
        }));

        if (this.inputsConfigPage.context === 'ORDERGERENT' || this.inputsConfigPage.context === 'ORDERGERENTADMIN') {
          const items = this.getOrderItems();
          this.totalPages = Math.ceil(items.length / this.inputsConfigPage.itemsPerPage);
          this.setPage(this.currentPage);
        }
      } else {
        const context = localStorage.getItem('lastContext');
        this.router.navigate([this.getFallbackRoute(context)]);
      }
    });

    // Escuchar las tareas cuando sean emitidas por el hijo
    this.subNewTasks = this.tasksSharedService.taskResponse$.pipe(filter((article): article is TasksDetailDTO => !!article)).subscribe((article) => {
      // Buscar el artículo en dataCreateTask
      const index = this.dataCreateTask.findIndex((t) => t.articleId === article.articleId);

      if (index !== -1) {
        this.dataCreateTask[index].tasksArticlesDTO = article.tasksArticlesDTO;
      }

      // Buscar el artículo dentro del datatable
      if (this.inputsConfigPage?.datatable?.length) {
        const dataItem = this.inputsConfigPage.datatable[0];

        // Extraer la lista de artículos sin romper tipos
        const orderList = (dataItem as any).dataTableDetailOrderAdmin ?? (dataItem as any).dataTableDetailOrder ?? [];

        // Buscar el artículo por ID
        const targetArticle = orderList.find((item: any) => item.id === article.articleId);

        if (targetArticle) {
          targetArticle.state = 'Completo';
        }
      }

      // Limpiar el estado en el servicio
      this.tasksSharedService.clear();
    });
  }

  // metodo por si se recarga la pagina redirija al padre
  getFallbackRoute(context: string | null): string {
    switch (context) {
      case 'SHOEDESIGN':
        return '/diseños-calzado';
      case 'ORDERGERENT':
        return '/pedidos';
      case 'ORDERGERENTADMIN':
        return '/pedidos-tareas';
      default:
        return '/';
    }
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

  // Extraer strings para llenar la tabla
  getValue(item: any, key: string): string {
    const value = item[key];
    return value !== undefined ? String(value) : '';
  }

  // Método para obtener los items planos del datatable
  getOrderItems(): any[] {
    return this.inputsConfigPage.datatable.flatMap((wrapper) => wrapper.dataTableDetailOrder);
  }

  // Logica para dividir en paginas
  setPage(page: number) {
    const items = this.getOrderItems();
    this.currentPage = page;
    const start = (page - 1) * this.inputsConfigPage.itemsPerPage;
    const end = start + this.inputsConfigPage.itemsPerPage;
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
    return (this.currentPage - 1) * this.inputsConfigPage.itemsPerPage + 1;
  }

  //Ultimo dato del paginador
  get lastItemIndex(): number {
    return Math.min(this.currentPage * this.inputsConfigPage.itemsPerPage, this.getOrderItems().length);
  }

  // Accion para regresar al padre
  onBackAction() {
    const context = localStorage.getItem('lastContext');
    localStorage.removeItem('lastContext');
    this.detailConfigService.clearConfig();
    0;
    this.router.navigate([this.getFallbackRoute(context)]);
  }

  // Logica para el caso que sea pedidos para el administrador
  //Logica para organizar el texto
  getOrderText(state?: string): string {
    if (!state) return '';
    // Limpiar tildes, reemplazar espacios y volver todo en minuscula
    return state
      .toString()
      .normalize('NFD')
      .replaceAll(/[\u0300-\u036f]/g, '')
      .replaceAll(/\s+/g, '_')
      .toLowerCase();
  }

  openCreateEditPage(item: any, action: 'create' | 'edit') {
    this.clearErrors();
    this.createEditConfig.context = 'ORDERGERENTADMIN-CREATE-EDIT';
    this.createEditConfig.action = action;
    this.createEditConfig.articleTaskDTO = {
      articleId: item.id,
      ref_design: item.ref_design,
      amount: item.amount,
      name_color: item.name_color,
      cod_size: item.cod_size,
    };
    this.createEditConfig.tasksDetailDTO = this.dataCreateTask;

    // Enviar articulos ya añadidos al hijo
    this.tasksSharedService.setTaskInfo(this.createEditConfig);
    localStorage.setItem('fromParentCreate', '1');
    // navegar pasando state para identificar que viene del padre
    this.router.navigate(['crear-editar-tareas'], { relativeTo: this.route });
  }

  // Lógica para validar que todos los artículos cuenten con tareas
  hasIncompleteStates(): boolean {
    if (!this.inputsConfigPage?.datatable?.length) return false;

    // Se recorre todos los registros
    return this.inputsConfigPage.datatable.some((wrapper) => {
      const table = wrapper.dataTableDetailOrderAdmin ?? wrapper.dataTableDetailOrder ?? [];

      return table.some((item) => {
        if ('state' in item) {
          return item.state !== 'Completo';
        }
        return false;
      });
    });
  }

  // Limpiar errores
  clearErrors() {
    this.generalError = '';
    this.numErrors = 0;
  }

  // Accion para crear las tareas
  onCreateTasks() {
    this.clearErrors();

    // Se valida que todos los articulos cuenten con tareas
    if (this.hasIncompleteStates()) {
      this.generalError =
        'No es posible finalizar la creación de tareas. Todos los artículos deben tener tareas asignadas y estar en estado Completo antes de continuar.';
    }

    // Se valida que no hayan errores
    if (this.generalError) {
      this.numErrors++;
    }

    // Si no hay errores se crea
    if (this.numErrors === 0) {
      this.createTasksToOrder();
    }
  }

  // Logica para pedidos con estado en progreso o finalizado
  // Abrir pagina de ver tareas
  openShowTasks(item: any) {
    this.showTasksConfig.articleTaskDTO = {
      articleId: item.id,
      ref_design: item.ref_design,
      amount: item.amount,
      name_color: item.name_color,
      cod_size: item.cod_size,
    };

    // Enviar articulos ya añadidos al hijo
    this.tasksSharedService.setTaskInfoShowDetail(this.showTasksConfig);
    localStorage.setItem('fromParentCreate', '1');
    // navegar pasando state para identificar que viene del padre
    this.router.navigate(['detalle-tareas'], { relativeTo: this.route });
  }

  // Ejecucion de EP's
  createTasksToOrder() {
    const orderId = this.inputsConfigPage?.orderId;
    if (!orderId) return;

    const dataTasks: CreateTasks = {
      order_id: orderId,
      articles: this.dataCreateTask.map((article) => ({
        article_id: article.articleId,
        tasks: article.tasksArticlesDTO.map((task) => ({
          amount: task.amount,
        })),
      })),
    };

    this.tasksService.postCreateTasks(dataTasks).subscribe({
      next: (res) => {
        this.onBackAction();
      },
      error: (err) => {
        this.generalError = 'No se pudo realizar la creación, intentelo nuevamente.';
      },
    });
  }
}

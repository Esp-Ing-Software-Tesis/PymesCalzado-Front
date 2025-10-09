import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputShowDetailGeneral } from './showDetailGeneral.interface';
import { DetailConfigService } from '../../services/detailConfig.service';

@Component({
  selector: 'app-shoe-detail-general',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showDetailGeneral.component.html',
  styleUrls: ['./showDetailGeneral.component.scss'],
})
export class ShowDetailGeneralComponent {
  inputsConfigPage!: InputShowDetailGeneral;

  // Variables para manejar el paginador
  currentPage: number = 1;
  totalPages: number = 0;
  paginate: any[] = [];

  constructor(
    private detailConfigService: DetailConfigService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.detailConfigService.config$.subscribe((config) => {
      if (config) {
        this.inputsConfigPage = config;

        if (this.inputsConfigPage.context === 'ORDERGERENT') {
          const items = this.getOrderItems();
          this.totalPages = Math.ceil(items.length / this.inputsConfigPage.itemsPerPage);
          this.setPage(this.currentPage);
        }
      } else {
        const context = localStorage.getItem('lastContext');
        this.router.navigate([this.getFallbackRoute(context)]);
      }
    });
  }

  // metodo por si se recarga la pagina redirija al padre
  getFallbackRoute(context: string | null): string {
    switch (context) {
      case 'SHOEDESIGN':
        return '/diseños-calzado';
      case 'ORDERGERENT':
        return '/pedidos';
      default:
        return '/';
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
}

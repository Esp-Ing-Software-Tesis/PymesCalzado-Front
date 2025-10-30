import { Component, OnChanges, input, Output, EventEmitter } from '@angular/core';
import { InputTableGeneral, ValueChangedEvent } from './tablaGeneral.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-general',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tablaGeneral.component.html',
  styleUrls: ['./tablaGeneral.component.scss'],
})
export class TablaGeneralComponent<Items extends Record<string, any>> implements OnChanges {
  //Variables para manejar el paginador
  currentPage: number = 1;
  totalPages: number = 0;
  // Variables para manejar los items
  paginate: Items[] = [];
  items = input.required<Items[]>();
  // LEntrada de configuraciones para la tabla
  inputsConfigTable = input.required<InputTableGeneral>();

  constructor() {}

  // Logica de inicio cantidad de paginas y setiar la pagina inicial
  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.items().length / this.inputsConfigTable().itemsPerPage);
    this.setPage(this.currentPage);
  }

  // Logica para dividir en paginas
  setPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.inputsConfigTable().itemsPerPage;
    const end = start + this.inputsConfigTable().itemsPerPage;
    this.paginate = this.items().slice(start, end);
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
    return (this.currentPage - 1) * this.inputsConfigTable().itemsPerPage + 1;
  }

  //Ultimo dato del paginador
  get lastItemIndex(): number {
    return Math.min(this.currentPage * this.inputsConfigTable().itemsPerPage, this.items().length);
  }

  //Logica para inactivar la fila cuando el estado es inactivo
  isInactiveRow(item: Items): boolean {
    return this.inputsConfigTable().colums?.some((col) => col.isUser && !item[col.key]) ?? false;
  }

  // Usuario manejo de button estado
  getStateUserValue(item: Items, key: string): any {
    return item[key];
  }

  // habilitar eventos para enviar informacion a los padres
  @Output() valueChanged = new EventEmitter<ValueChangedEvent<Items>>();

  // Evento para actualizar estado en usuarios padre
  setStateUserValue(event: Event, item: Items, key: string) {
    event.preventDefault();
    const checked = !item[key];
    this.valueChanged.emit({ item, key, value: checked, context: this.inputsConfigTable().context });
  }

  @Output() itemDetail = new EventEmitter<ValueChangedEvent<Items>>();
  // Evento para consultar el detalle
  setShowDetail(event: Event, item: Items, key: string) {
    event.preventDefault();
    this.itemDetail.emit({ item, key, context: this.inputsConfigTable().context });
  }

  // Logica para organizar los estados en clases validad para CSS
  getStateClass(state?: string): string {
    if (!state) return '';
    // Limpiar tildes, reemplazar espacios y volver todo en minuscula
    return state
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_')
      .toLowerCase();
  }

  // Logica para organizar los estados de las lineas de produccion para las tareas
  getStateProductionLine(state?: string): string {
    if (!state) return '';

    const normalized = state
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_')
      .toLowerCase();

    const nonProgressStates = ['nuevo', 'finalizado', 'en_revision', 'en_correccion', 'cancelado'];

    // Si el estado no es alguno valido pone en_progreso
    if (!nonProgressStates.includes(normalized)) {
      return 'en_progreso';
    }

    return normalized;
  }
}

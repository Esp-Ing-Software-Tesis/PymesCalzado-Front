import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { TablaGeneralComponent } from '../../shared/tablaGeneral/tablaGeneral.component';
import { SinInformacionComponent } from '../../shared/sinInformacion/sinInformacion.component';
import { ValueChangedEvent } from '../../shared/tablaGeneral/tablaGeneral.interface';
import { TABLA_GENERAL, SHOW_DETAIL_CREATE, SHOW_DETAIL_VIEW } from './tareasAdministrador.config';
import { OrderDTO } from './tareasAdministrador.interface';
import { DataTableDetailOrderAdmin } from '../../shared/showDetailGeneral/showDetailGeneral.interface';
import { OrderService } from '../../services/pedidos.service';
import { DetailConfigService } from '../../services/detailConfig.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-tareas-administrador-page',
  standalone: true,
  imports: [CommonModule, TablaGeneralComponent, SinInformacionComponent, RouterOutlet],
  templateUrl: './tareasAdministrador.component.html',
  styleUrls: ['./tareasAdministrador.component.scss'],
})
export class TareasAdministradorPageComponent implements OnInit {
  // Variable para manejar los datos generales de la tabla
  order: OrderDTO[] = [];
  // manejo de configuraciones iniciales para la tabla general
  tableGeneralConfig = structuredClone(TABLA_GENERAL);
  // manejo de configuraciones iniciales para el hijo de visualizar detalle cuando el estado es nuevo
  showDetailGeneralConfigCreate = structuredClone(SHOW_DETAIL_CREATE);
  // manejo de configuraciones iniciales para el hijo de visualizar detalle cuando el estado es diferente de nuevo
  showDetailGeneralConfigView = structuredClone(SHOW_DETAIL_VIEW);
  //Varible para manejar visualizacion de hijos
  viewPageChildren = false;
  // Variables para manejar datos del detalle del pedido articulos
  orderDetail: DataTableDetailOrderAdmin[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly orderService: OrderService,
    private readonly detailConfigService: DetailConfigService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  //Poblar data inicial en la tabla
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const url = this.router.url;

      // Oculta la tabla principal si esta en cualquier hijo
      this.viewPageChildren = /(detalle|crear-editar-tareas|detalle-tareas|gestionar-tareas)/.test(url);
      this.cdr.detectChanges();
    });

    this.loadOrders();
  }

  // Recibe el item del que se quiere consultar el detalle
  getArticleOrder(event: ValueChangedEvent<OrderDTO>) {
    if (event.context === 'ORDERGERENTADMIN') {
      if (event.key === 'showDetails') {
        const getShoeItem = this.order.find((u) => u.id === event.item.id);
        if (getShoeItem) {
          const client = `${getShoeItem.name_client} - ${getShoeItem.customer_id}`;
          const state = getShoeItem.state;
          this.openShowDetailPage(getShoeItem.id, client, state);
        }
      }
    }
  }

  // abrir pantalla de detalle
  openShowDetailPage(id: number, client: string, state: string) {
    //ejecutar EP
    this.loadOrdersDetail(id);
    const showDetailGeneralConfig = state === 'Nuevo' ? this.showDetailGeneralConfigCreate : this.showDetailGeneralConfigView;
    // asignar data a la informacion que sera enviada al detalle
    showDetailGeneralConfig.reference = 'Cliente: ' + client;
    // guardar el id del pedido
    showDetailGeneralConfig.orderId = id;
    showDetailGeneralConfig.stateOrder = state;
    //guardar datos para poblar la tabla
    if (showDetailGeneralConfig.datatable) {
      showDetailGeneralConfig.datatable = [
        {
          dataTableDetailOrder: this.orderDetail.map((item) => ({
            ...item,
            state: 'Sin Tareas',
          })),
        },
      ];
    }
    //Guardar en el local storage la pantalla actual
    localStorage.setItem('lastContext', showDetailGeneralConfig.context);
    // Enviar la configuración al servicio
    this.detailConfigService.setConfig(showDetailGeneralConfig);
    // navegar al hijo
    this.router.navigate(['detalle'], { relativeTo: this.route });
  }

  // Consulta de EP's
  // Get Orders
  loadOrders() {
    this.orderService
      .getOrder()
      .pipe(
        map((response) =>
          response
            .map((u) => ({
              id: u.orderId,
              name_client: u.nameClient,
              customer_id: u.customer_id,
              created_at: u.created_at,
              start_date: u.start_date,
              completion_date: u.completion_date,
              state: u.state,
            }))
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
        ),
      )
      .subscribe({
        next: (res) => {
          this.order = res;
        },
        error: (err) => {
          this.order = [];
        },
      });
  }

  // Get Orders Detail
  loadOrdersDetail(id_pedido: number) {
    this.orderService
      .getOrderDetail(id_pedido)
      .pipe(
        map((response) =>
          response.map((u) => ({
            id: u.articleId,
            ref_design: u.ref_design,
            amount: u.amount,
            name_color: u.color.name,
            cod_size: u.cod_size,
          })),
        ),
      )
      .subscribe({
        next: (res) => {
          this.orderDetail = res;
        },
        error: (err) => {
          this.order = [];
        },
      });
  }
}

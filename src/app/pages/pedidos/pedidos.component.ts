import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { TablaGeneralComponent } from '../../shared/tablaGeneral/tablaGeneral.component';
import { SinInformacionComponent } from '../../shared/sinInformacion/sinInformacion.component';
import { ValueChangedEvent } from '../../shared/tablaGeneral/tablaGeneral.interface';
import { TABLA_GENERAL, SHOW_DETAIL_GENERAL } from './pedidos.config';
import { OrderDTO } from './pedidos.interface';
import { DataTableDetailOrder } from '../../shared/showDetailGeneral/showDetailGeneral.interface';
import { OrderService } from '../../services/pedidos.service';
import { DetailConfigService } from '../../services/detailConfig.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-pedidos-page',
  standalone: true,
  imports: [CommonModule, TablaGeneralComponent, SinInformacionComponent, RouterOutlet],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosPageComponent implements OnInit {
  // Variable para manejar los datos generales de la tabla
  order: OrderDTO[] = [];
  // manejo de configuraciones iniciales para la tabla general
  tableGeneralConfig = structuredClone(TABLA_GENERAL);
  // manejo de configuraciones iniciales para el hijo de visualizar detalle
  showDetailGeneralConfig = structuredClone(SHOW_DETAIL_GENERAL);
  //Varible para manejar visualizacion de hijos
  viewPageChildren = false;
  // Variables para manejar datos del detalle del pedido articulos
  orderDetail: DataTableDetailOrder[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private detailConfigService: DetailConfigService,
    private cdr: ChangeDetectorRef,
  ) {}

  //Poblar data inicial en la tabla
  ngOnInit(): void {
    // volver a la pagina padre si esta en algun hijo
    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.viewPageChildren = /(detalle|crear)(?!\/añadir-articulo)/.test(url);
      this.cdr.detectChanges();
    });
    // cargar los pedidos
    this.loadOrders();
  }

  // Recibe el item del que se quiere consultar el detalle
  getArticleOrder(event: ValueChangedEvent<OrderDTO>) {
    if (event.context === 'ORDERGERENT') {
      if (event.key === 'showDetails') {
        const getShoeItem = this.order.find((u) => u.id === event.item.id);
        if (getShoeItem) {
          const client = `${getShoeItem.name_client} - ${getShoeItem.customer_id}`;
          this.openShowDetailPage(getShoeItem.id, client);
        }
      }
    }
  }

  // abrir pantalla de detalle
  openShowDetailPage(id: number, client: string) {
    //ejecutar EP
    this.loadOrdersDetail(id);
    // asignar data a la informacion que sera enviada al detalle
    this.showDetailGeneralConfig.reference = 'Cliente: ' + client;
    //guardar datos para poblar la tabla
    if (this.showDetailGeneralConfig.datatable) {
      this.showDetailGeneralConfig.datatable = [
        {
          dataTableDetailOrder: this.orderDetail.map((item) => ({
            ...item,
          })),
        },
      ];
    }
    //Guardar en el local storage la pantalla actual
    localStorage.setItem('lastContext', this.showDetailGeneralConfig.context);

    // Enviar la configuración al servicio
    this.detailConfigService.setConfig(this.showDetailGeneralConfig);

    // navegar al hijo
    this.router.navigate(['detalle'], { relativeTo: this.route });
  }

  // abrir pantalla de creacion
  openCreatePage() {
    // guardar contexto
    localStorage.setItem('lastContext', this.showDetailGeneralConfig.context);
    localStorage.setItem('fromParentCreate', '1');
    // navegar pasando state para identificar que viene del padre
    this.router.navigate(['crear'], { relativeTo: this.route });
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

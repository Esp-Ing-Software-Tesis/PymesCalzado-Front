import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Order, OrderDetail, OrderCreateDTO, OrderDetailArticles } from '../models/pedidos.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor() {}

  // Mock de get orders
  getOrder(): Observable<Order[]> {
    const orderMock: Order[] = this.setMockOrdersOptions();
    //const orderMock: Order[] = [];
    /*return throwError(() => ({
        description: 'No se ha encontrado data'
    }))*/
    return of(orderMock);
  }

  // Mock de get order detail
  getOrderDetail(id: number): Observable<OrderDetailArticles[]> {
    const orderDetailSelect = this.setMockOrderDetailOptions().find((i) => i.id === id)?.articles;
    if (orderDetailSelect) {
      return of(orderDetailSelect);
    } else {
      return throwError(() => ({
        description: 'No se ha encontrado data',
      }));
    }
  }

  // Mock de create pedidos
  postCreateOrder(pedido: OrderCreateDTO): Observable<OrderCreateDTO> {
    const nuevoPedido = { ...pedido };
    //return throwError(() => ({}))
    return of(nuevoPedido);
  }

  // Data Mock Orders
  private setMockOrdersOptions(): Order[] {
    const dataOrders: Order[] = [
      {
        id: 1,
        nameClient: 'Calzado Andino S.A.S.',
        customer_id: 900123456,
        created_at: '2025-06-01',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 2,
        nameClient: 'Industria Zapatera El Sol Ltda.',
        customer_id: 901234567,
        created_at: '2025-06-03',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 3,
        nameClient: 'Confecciones y Calzado Orion S.A.S.',
        customer_id: 902345678,
        created_at: '2025-06-05',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 4,
        nameClient: 'Distribuciones El Paso S.A.S.',
        customer_id: 903456789,
        created_at: '2025-06-07',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 5,
        nameClient: 'Calzado Urbano Ltda.',
        customer_id: 904567890,
        created_at: '2025-06-09',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 6,
        nameClient: 'Zapatería Moderna S.A.S.',
        customer_id: 905678901,
        created_at: '2025-06-11',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 7,
        nameClient: 'Exportadora de Calzado Andar S.A.S.',
        customer_id: 906789012,
        created_at: '2025-06-13',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 8,
        nameClient: 'Comercializadora Global Shoes Ltda.',
        customer_id: 907890123,
        created_at: '2025-06-15',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 9,
        nameClient: 'Calzado Andino S.A.S.',
        customer_id: 900123456,
        created_at: '2025-06-17',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 10,
        nameClient: 'Industria Zapatera El Sol Ltda.',
        customer_id: 901234567,
        created_at: '2025-06-19',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 11,
        nameClient: 'Confecciones y Calzado Orion S.A.S.',
        customer_id: 902345678,
        created_at: '2025-06-21',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 12,
        nameClient: 'Distribuciones El Paso S.A.S.',
        customer_id: 903456789,
        created_at: '2025-06-23',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 13,
        nameClient: 'Calzado Urbano Ltda.',
        customer_id: 904567890,
        created_at: '2025-06-25',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 14,
        nameClient: 'Zapatería Moderna S.A.S.',
        customer_id: 905678901,
        created_at: '2025-06-27',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 15,
        nameClient: 'Exportadora de Calzado Andar S.A.S.',
        customer_id: 906789012,
        created_at: '2025-06-29',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 16,
        nameClient: 'Comercializadora Global Shoes Ltda.',
        customer_id: 907890123,
        created_at: '2025-07-01',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 17,
        nameClient: 'Calzado Andino S.A.S.',
        customer_id: 900123456,
        created_at: '2025-07-04',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 18,
        nameClient: 'Industria Zapatera El Sol Ltda.',
        customer_id: 901234567,
        created_at: '2025-07-07',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 19,
        nameClient: 'Confecciones y Calzado Orion S.A.S.',
        customer_id: 902345678,
        created_at: '2025-07-10',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 20,
        nameClient: 'Distribuciones El Paso S.A.S.',
        customer_id: 903456789,
        created_at: '2025-07-13',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 21,
        nameClient: 'Calzado Urbano Ltda.',
        customer_id: 904567890,
        created_at: '2025-07-16',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 22,
        nameClient: 'Zapatería Moderna S.A.S.',
        customer_id: 905678901,
        created_at: '2025-07-19',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 23,
        nameClient: 'Exportadora de Calzado Andar S.A.S.',
        customer_id: 906789012,
        created_at: '2025-07-22',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 24,
        nameClient: 'Comercializadora Global Shoes Ltda.',
        customer_id: 907890123,
        created_at: '2025-07-25',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        id: 25,
        nameClient: 'Calzado Andino S.A.S.',
        customer_id: 900123456,
        created_at: '2025-07-28',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
    ];
    return dataOrders;
  }

  // Data Mock Shoe Designs Details
  private setMockOrderDetailOptions(): OrderDetail[] {
    const dataOrderDetail: OrderDetail[] = [
      {
        id: 1,
        articles: [
          {
            ref_design: 'REF00004',
            amount: 24,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00002',
            amount: 16,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00008',
            amount: 40,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00007',
            amount: 35,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00003',
            amount: 12,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00007',
            amount: 18,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00006',
            amount: 33,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00002',
            amount: 42,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00007',
            amount: 38,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 35,
          },
        ],
      },
      {
        id: 2,
        articles: [
          {
            ref_design: 'REF00009',
            amount: 18,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00009',
            amount: 42,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00011',
            amount: 9,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00009',
            amount: 39,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00001',
            amount: 10,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00004',
            amount: 32,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00001',
            amount: 41,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00007',
            amount: 13,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 35,
          },
        ],
      },
      {
        id: 3,
        articles: [
          {
            ref_design: 'REF00004',
            amount: 48,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00003',
            amount: 17,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00009',
            amount: 26,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00008',
            amount: 22,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00011',
            amount: 13,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00001',
            amount: 8,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00006',
            amount: 18,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00010',
            amount: 45,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00006',
            amount: 25,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00007',
            amount: 15,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00010',
            amount: 11,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 42,
          },
        ],
      },
      {
        id: 4,
        articles: [
          {
            ref_design: 'REF00007',
            amount: 48,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00001',
            amount: 32,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00004',
            amount: 19,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00001',
            amount: 37,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00004',
            amount: 24,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00004',
            amount: 15,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 35,
          },
        ],
      },
      {
        id: 5,
        articles: [
          {
            ref_design: 'REF00003',
            amount: 47,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00003',
            amount: 20,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00004',
            amount: 16,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00005',
            amount: 43,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00006',
            amount: 20,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00001',
            amount: 33,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00001',
            amount: 23,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 35,
          },
        ],
      },
      {
        id: 6,
        articles: [
          {
            ref_design: 'REF00005',
            amount: 9,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00003',
            amount: 38,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00008',
            amount: 47,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00002',
            amount: 36,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00006',
            amount: 42,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00005',
            amount: 31,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00003',
            amount: 38,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00007',
            amount: 15,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00010',
            amount: 41,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00004',
            amount: 25,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00008',
            amount: 5,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00003',
            amount: 8,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 32,
          },
        ],
      },
      {
        id: 7,
        articles: [
          {
            ref_design: 'REF00008',
            amount: 17,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00005',
            amount: 43,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00005',
            amount: 19,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00004',
            amount: 18,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00005',
            amount: 49,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00002',
            amount: 9,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00006',
            amount: 24,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00005',
            amount: 50,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00001',
            amount: 41,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00009',
            amount: 19,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 32,
          },
        ],
      },
      {
        id: 8,
        articles: [
          {
            ref_design: 'REF00001',
            amount: 12,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00004',
            amount: 41,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00002',
            amount: 14,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00005',
            amount: 29,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00010',
            amount: 31,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00008',
            amount: 50,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00003',
            amount: 25,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00002',
            amount: 31,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00010',
            amount: 20,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00008',
            amount: 10,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00005',
            amount: 16,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00002',
            amount: 32,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00006',
            amount: 13,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00006',
            amount: 22,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00008',
            amount: 28,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 38,
          },
        ],
      },
      {
        id: 9,
        articles: [
          {
            ref_design: 'REF00004',
            amount: 31,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00008',
            amount: 41,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00011',
            amount: 46,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00008',
            amount: 16,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00001',
            amount: 47,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00003',
            amount: 25,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00004',
            amount: 34,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00006',
            amount: 37,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 40,
          },
        ],
      },
      {
        id: 10,
        articles: [
          {
            ref_design: 'REF00005',
            amount: 25,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00001',
            amount: 24,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00005',
            amount: 22,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00004',
            amount: 39,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00005',
            amount: 38,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00002',
            amount: 45,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00002',
            amount: 33,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00003',
            amount: 13,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00002',
            amount: 13,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00002',
            amount: 8,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00006',
            amount: 37,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00007',
            amount: 29,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00006',
            amount: 32,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00005',
            amount: 36,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00010',
            amount: 38,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 35,
          },
        ],
      },
      {
        id: 11,
        articles: [
          {
            ref_design: 'REF00002',
            amount: 20,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00006',
            amount: 34,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00002',
            amount: 5,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00005',
            amount: 28,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00005',
            amount: 31,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00010',
            amount: 15,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00004',
            amount: 32,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 28,
          },
        ],
      },
      {
        id: 12,
        articles: [
          {
            ref_design: 'REF00009',
            amount: 10,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00006',
            amount: 44,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00010',
            amount: 29,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00006',
            amount: 19,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00001',
            amount: 31,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00006',
            amount: 42,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00006',
            amount: 6,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00009',
            amount: 12,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00004',
            amount: 47,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 40,
          },
        ],
      },
      {
        id: 13,
        articles: [
          {
            ref_design: 'REF00009',
            amount: 8,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00008',
            amount: 46,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00003',
            amount: 33,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00004',
            amount: 23,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00002',
            amount: 50,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00007',
            amount: 37,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00009',
            amount: 48,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00003',
            amount: 6,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00006',
            amount: 35,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 43,
          },
        ],
      },
      {
        id: 14,
        articles: [
          {
            ref_design: 'REF00009',
            amount: 30,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00010',
            amount: 29,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00002',
            amount: 35,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00009',
            amount: 11,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00006',
            amount: 41,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00002',
            amount: 6,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00001',
            amount: 16,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00004',
            amount: 15,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00009',
            amount: 28,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00009',
            amount: 46,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00010',
            amount: 30,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 24,
          },
        ],
      },
      {
        id: 15,
        articles: [
          {
            ref_design: 'REF00001',
            amount: 20,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00001',
            amount: 23,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00006',
            amount: 39,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00006',
            amount: 26,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00011',
            amount: 10,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00010',
            amount: 11,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00003',
            amount: 33,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 42,
          },
        ],
      },
      {
        id: 16,
        articles: [
          {
            ref_design: 'REF00008',
            amount: 44,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00008',
            amount: 15,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00001',
            amount: 49,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00007',
            amount: 12,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00002',
            amount: 11,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00010',
            amount: 17,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00003',
            amount: 48,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 42,
          },
        ],
      },
      {
        id: 17,
        articles: [
          {
            ref_design: 'REF00002',
            amount: 41,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00002',
            amount: 36,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00007',
            amount: 27,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00003',
            amount: 43,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00003',
            amount: 8,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00008',
            amount: 31,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 38,
          },
        ],
      },
      {
        id: 18,
        articles: [
          {
            ref_design: 'REF00005',
            amount: 40,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00001',
            amount: 37,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00011',
            amount: 50,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00009',
            amount: 44,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00003',
            amount: 21,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00003',
            amount: 7,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00001',
            amount: 13,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 40,
          },
        ],
      },
      {
        id: 19,
        articles: [
          {
            ref_design: 'REF00001',
            amount: 45,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00008',
            amount: 18,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00006',
            amount: 46,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00010',
            amount: 46,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00004',
            amount: 41,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00001',
            amount: 46,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00006',
            amount: 34,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00001',
            amount: 31,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00003',
            amount: 7,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00003',
            amount: 34,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00007',
            amount: 50,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00004',
            amount: 38,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00001',
            amount: 9,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 34,
          },
        ],
      },
      {
        id: 20,
        articles: [
          {
            ref_design: 'REF00004',
            amount: 6,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00008',
            amount: 11,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00006',
            amount: 36,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00005',
            amount: 27,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00004',
            amount: 33,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00003',
            amount: 13,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00004',
            amount: 12,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00001',
            amount: 44,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00007',
            amount: 7,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00003',
            amount: 45,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00008',
            amount: 37,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00005',
            amount: 10,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00005',
            amount: 11,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 38,
          },
        ],
      },
      {
        id: 21,
        articles: [
          {
            ref_design: 'REF00002',
            amount: 21,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00005',
            amount: 30,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00006',
            amount: 27,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00011',
            amount: 9,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00002',
            amount: 20,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00004',
            amount: 16,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00003',
            amount: 48,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00009',
            amount: 7,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00009',
            amount: 5,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00010',
            amount: 8,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00011',
            amount: 14,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00001',
            amount: 37,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 35,
          },
        ],
      },
      {
        id: 22,
        articles: [
          {
            ref_design: 'REF00006',
            amount: 6,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00008',
            amount: 34,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00003',
            amount: 36,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00008',
            amount: 27,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 38,
          },
          {
            ref_design: 'REF00004',
            amount: 19,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00007',
            amount: 46,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00007',
            amount: 11,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00003',
            amount: 12,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00009',
            amount: 25,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00005',
            amount: 36,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00011',
            amount: 46,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00004',
            amount: 49,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00005',
            amount: 10,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 40,
          },
        ],
      },
      {
        id: 23,
        articles: [
          {
            ref_design: 'REF00010',
            amount: 41,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00006',
            amount: 20,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00008',
            amount: 28,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00009',
            amount: 49,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00007',
            amount: 33,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 24,
          },
        ],
      },
      {
        id: 24,
        articles: [
          {
            ref_design: 'REF00010',
            amount: 37,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 39,
          },
          {
            ref_design: 'REF00010',
            amount: 26,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00004',
            amount: 5,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 40,
          },
          {
            ref_design: 'REF00009',
            amount: 16,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 43,
          },
          {
            ref_design: 'REF00008',
            amount: 49,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 40,
          },
        ],
      },
      {
        id: 25,
        articles: [
          {
            ref_design: 'REF00002',
            amount: 21,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00004',
            amount: 50,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 24,
          },
          {
            ref_design: 'REF00002',
            amount: 6,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 28,
          },
          {
            ref_design: 'REF00004',
            amount: 19,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00010',
            amount: 25,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00010',
            amount: 49,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00008',
            amount: 14,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 32,
          },
          {
            ref_design: 'REF00001',
            amount: 43,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 35,
          },
          {
            ref_design: 'REF00003',
            amount: 31,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 42,
          },
          {
            ref_design: 'REF00003',
            amount: 50,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 34,
          },
          {
            ref_design: 'REF00011',
            amount: 34,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 28,
          },
        ],
      },
    ];
    return dataOrderDetail;
  }
}

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
  getOrderDetail(orderId: number): Observable<OrderDetailArticles[]> {
    const orderDetailSelect = this.setMockOrderDetailOptions().find((i) => i.orderId === orderId)?.articles;
    if (orderDetailSelect) {
      return of(orderDetailSelect);
    } else {
      return throwError(() => ({
        description: 'No se ha encontrado data',
      }));
    }
  }

  // Mock de create pedorderIdos
  postCreateOrder(pedorderIdo: OrderCreateDTO): Observable<OrderCreateDTO> {
    const nuevoPedorderIdo = { ...pedorderIdo };
    //return throwError(() => ({}))
    return of(nuevoPedorderIdo);
  }

  // Data Mock Orders
  private setMockOrdersOptions(): Order[] {
    const dataOrders: Order[] = [
      {
        orderId: 1,
        nameClient: 'Calzado Andino S.A.S.',
        customer_id: 900123456,
        created_at: '2025-06-01',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        orderId: 2,
        nameClient: 'Industria Zapatera El Sol Ltda.',
        customer_id: 901234567,
        created_at: '2025-06-03',
        start_date: '2025-06-05',
        completion_date: '',
        state: 'En progreso',
      },
      {
        orderId: 3,
        nameClient: 'Confecciones y Calzado Orion S.A.S.',
        customer_id: 902345678,
        created_at: '2025-06-05',
        start_date: '2025-06-06',
        completion_date: '2025-06-10',
        state: 'Finalizado',
      },
      {
        orderId: 4,
        nameClient: 'Distribuciones El Paso S.A.S.',
        customer_id: 903456789,
        created_at: '2025-06-07',
        start_date: '2025-06-08',
        completion_date: '',
        state: 'En progreso',
      },
      {
        orderId: 5,
        nameClient: 'Calzado Urbano Ltda.',
        customer_id: 904567890,
        created_at: '2025-06-09',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        orderId: 6,
        nameClient: 'Zapatería Moderna S.A.S.',
        customer_id: 905678901,
        created_at: '2025-06-11',
        start_date: '2025-06-12',
        completion_date: '2025-06-17',
        state: 'Finalizado',
      },
      {
        orderId: 7,
        nameClient: 'Exportadora de Calzado Andar S.A.S.',
        customer_id: 906789012,
        created_at: '2025-06-13',
        start_date: '2025-06-14',
        completion_date: '',
        state: 'En progreso',
      },
      {
        orderId: 8,
        nameClient: 'Comercializadora Global Shoes Ltda.',
        customer_id: 907890123,
        created_at: '2025-06-15',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        orderId: 9,
        nameClient: 'Calzado Andino S.A.S.',
        customer_id: 900123456,
        created_at: '2025-06-17',
        start_date: '2025-06-18',
        completion_date: '2025-06-24',
        state: 'Finalizado',
      },
      {
        orderId: 10,
        nameClient: 'Industria Zapatera El Sol Ltda.',
        customer_id: 901234567,
        created_at: '2025-06-19',
        start_date: '2025-06-20',
        completion_date: '',
        state: 'En progreso',
      },
      {
        orderId: 11,
        nameClient: 'Confecciones y Calzado Orion S.A.S.',
        customer_id: 902345678,
        created_at: '2025-06-21',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        orderId: 12,
        nameClient: 'Distribuciones El Paso S.A.S.',
        customer_id: 903456789,
        created_at: '2025-06-23',
        start_date: '2025-06-25',
        completion_date: '2025-06-30',
        state: 'Finalizado',
      },
      {
        orderId: 13,
        nameClient: 'Calzado Urbano Ltda.',
        customer_id: 904567890,
        created_at: '2025-06-25',
        start_date: '2025-06-26',
        completion_date: '',
        state: 'En progreso',
      },
      {
        orderId: 14,
        nameClient: 'Zapatería Moderna S.A.S.',
        customer_id: 905678901,
        created_at: '2025-06-27',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        orderId: 15,
        nameClient: 'Exportadora de Calzado Andar S.A.S.',
        customer_id: 906789012,
        created_at: '2025-06-29',
        start_date: '2025-06-30',
        completion_date: '2025-07-05',
        state: 'Finalizado',
      },
      {
        orderId: 16,
        nameClient: 'Comercializadora Global Shoes Ltda.',
        customer_id: 907890123,
        created_at: '2025-07-01',
        start_date: '2025-07-02',
        completion_date: '',
        state: 'En progreso',
      },
      {
        orderId: 17,
        nameClient: 'Calzado Andino S.A.S.',
        customer_id: 900123456,
        created_at: '2025-07-04',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        orderId: 18,
        nameClient: 'Industria Zapatera El Sol Ltda.',
        customer_id: 901234567,
        created_at: '2025-07-07',
        start_date: '2025-07-09',
        completion_date: '2025-07-14',
        state: 'Finalizado',
      },
      {
        orderId: 19,
        nameClient: 'Confecciones y Calzado Orion S.A.S.',
        customer_id: 902345678,
        created_at: '2025-07-10',
        start_date: '2025-07-11',
        completion_date: '',
        state: 'En progreso',
      },
      {
        orderId: 20,
        nameClient: 'Distribuciones El Paso S.A.S.',
        customer_id: 903456789,
        created_at: '2025-07-13',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        orderId: 21,
        nameClient: 'Calzado Urbano Ltda.',
        customer_id: 904567890,
        created_at: '2025-07-16',
        start_date: '2025-07-17',
        completion_date: '2025-07-23',
        state: 'Finalizado',
      },
      {
        orderId: 22,
        nameClient: 'Zapatería Moderna S.A.S.',
        customer_id: 905678901,
        created_at: '2025-07-19',
        start_date: '',
        completion_date: '',
        state: 'Nuevo',
      },
      {
        orderId: 23,
        nameClient: 'Exportadora de Calzado Andar S.A.S.',
        customer_id: 906789012,
        created_at: '2025-07-22',
        start_date: '2025-07-23',
        completion_date: '',
        state: 'En progreso',
      },
      {
        orderId: 24,
        nameClient: 'Comercializadora Global Shoes Ltda.',
        customer_id: 907890123,
        created_at: '2025-07-25',
        start_date: '2025-07-26',
        completion_date: '2025-07-31',
        state: 'Finalizado',
      },
      {
        orderId: 25,
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

  private setMockOrderDetailOptions(): OrderDetail[] {
    const dataOrderDetail: OrderDetail[] = [
      {
        orderId: 1,
        articles: [
          {
            articleId: 1,
            ref_design: 'REF00004',
            amount: 24,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 28,
          },
          {
            articleId: 2,
            ref_design: 'REF00002',
            amount: 16,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 24,
          },
          {
            articleId: 3,
            ref_design: 'REF00008',
            amount: 40,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 35,
          },
          {
            articleId: 4,
            ref_design: 'REF00007',
            amount: 35,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 35,
          },
          {
            articleId: 5,
            ref_design: 'REF00003',
            amount: 12,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 28,
          },
          {
            articleId: 6,
            ref_design: 'REF00007',
            amount: 18,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 24,
          },
          {
            articleId: 7,
            ref_design: 'REF00006',
            amount: 33,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 43,
          },
          {
            articleId: 8,
            ref_design: 'REF00002',
            amount: 42,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 34,
          },
          {
            articleId: 9,
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
        orderId: 2,
        articles: [
          {
            articleId: 10,
            ref_design: 'REF00009',
            amount: 18,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 42,
          },
          {
            articleId: 11,
            ref_design: 'REF00009',
            amount: 42,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 24,
          },
          {
            articleId: 12,
            ref_design: 'REF00011',
            amount: 9,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 43,
          },
          {
            articleId: 13,
            ref_design: 'REF00009',
            amount: 39,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 42,
          },
          {
            articleId: 14,
            ref_design: 'REF00001',
            amount: 10,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 43,
          },
          {
            articleId: 15,
            ref_design: 'REF00004',
            amount: 32,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 40,
          },
          {
            articleId: 16,
            ref_design: 'REF00001',
            amount: 41,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 43,
          },
          {
            articleId: 17,
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
        orderId: 3,
        articles: [
          {
            articleId: 18,
            ref_design: 'REF00004',
            amount: 48,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 28,
          },
          {
            articleId: 19,
            ref_design: 'REF00003',
            amount: 17,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 24,
          },
          {
            articleId: 20,
            ref_design: 'REF00009',
            amount: 26,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 35,
          },
          {
            articleId: 21,
            ref_design: 'REF00008',
            amount: 22,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 28,
          },
          {
            articleId: 22,
            ref_design: 'REF00011',
            amount: 13,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 43,
          },
          {
            articleId: 23,
            ref_design: 'REF00001',
            amount: 8,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 38,
          },
          {
            articleId: 24,
            ref_design: 'REF00006',
            amount: 18,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 40,
          },
          {
            articleId: 25,
            ref_design: 'REF00010',
            amount: 45,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 42,
          },
          {
            articleId: 26,
            ref_design: 'REF00006',
            amount: 25,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 38,
          },
          {
            articleId: 27,
            ref_design: 'REF00007',
            amount: 15,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 43,
          },
          {
            articleId: 28,
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
        orderId: 4,
        articles: [
          {
            articleId: 29,
            ref_design: 'REF00007',
            amount: 48,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 28,
          },
          {
            articleId: 30,
            ref_design: 'REF00001',
            amount: 32,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 32,
          },
          {
            articleId: 31,
            ref_design: 'REF00004',
            amount: 19,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 40,
          },
          {
            articleId: 32,
            ref_design: 'REF00001',
            amount: 37,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 40,
          },
          {
            articleId: 33,
            ref_design: 'REF00004',
            amount: 24,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 24,
          },
          {
            articleId: 34,
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
        orderId: 5,
        articles: [
          {
            articleId: 35,
            ref_design: 'REF00003',
            amount: 47,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 24,
          },
          {
            articleId: 36,
            ref_design: 'REF00003',
            amount: 20,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 28,
          },
          {
            articleId: 37,
            ref_design: 'REF00004',
            amount: 16,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 35,
          },
          {
            articleId: 38,
            ref_design: 'REF00005',
            amount: 43,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 28,
          },
          {
            articleId: 39,
            ref_design: 'REF00006',
            amount: 20,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 32,
          },
          {
            articleId: 40,
            ref_design: 'REF00001',
            amount: 33,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 42,
          },
          {
            articleId: 41,
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
        orderId: 6,
        articles: [
          {
            articleId: 42,
            ref_design: 'REF00005',
            amount: 9,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 24,
          },
          {
            articleId: 43,
            ref_design: 'REF00003',
            amount: 38,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 24,
          },
          {
            articleId: 44,
            ref_design: 'REF00008',
            amount: 47,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 35,
          },
          {
            articleId: 45,
            ref_design: 'REF00002',
            amount: 36,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 42,
          },
          {
            articleId: 46,
            ref_design: 'REF00006',
            amount: 42,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 40,
          },
          {
            articleId: 47,
            ref_design: 'REF00005',
            amount: 31,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 40,
          },
          {
            articleId: 48,
            ref_design: 'REF00003',
            amount: 38,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 43,
          },
          {
            articleId: 49,
            ref_design: 'REF00007',
            amount: 15,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 35,
          },
          {
            articleId: 50,
            ref_design: 'REF00010',
            amount: 41,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 32,
          },
          {
            articleId: 51,
            ref_design: 'REF00004',
            amount: 25,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 35,
          },
          {
            articleId: 52,
            ref_design: 'REF00008',
            amount: 5,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 43,
          },
          {
            articleId: 53,
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
        orderId: 7,
        articles: [
          {
            articleId: 54,
            ref_design: 'REF00008',
            amount: 17,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 24,
          },
          {
            articleId: 55,
            ref_design: 'REF00005',
            amount: 43,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 24,
          },
          {
            articleId: 56,
            ref_design: 'REF00005',
            amount: 19,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 34,
          },
          {
            articleId: 57,
            ref_design: 'REF00004',
            amount: 18,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 34,
          },
          {
            articleId: 58,
            ref_design: 'REF00005',
            amount: 49,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 43,
          },
          {
            articleId: 59,
            ref_design: 'REF00002',
            amount: 9,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 43,
          },
          {
            articleId: 60,
            ref_design: 'REF00006',
            amount: 24,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 28,
          },
          {
            articleId: 61,
            ref_design: 'REF00005',
            amount: 50,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 35,
          },
          {
            articleId: 62,
            ref_design: 'REF00001',
            amount: 41,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 43,
          },
          {
            articleId: 63,
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
        orderId: 8,
        articles: [
          {
            articleId: 64,
            ref_design: 'REF00001',
            amount: 12,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 35,
          },
          {
            articleId: 65,
            ref_design: 'REF00004',
            amount: 41,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 42,
          },
          {
            articleId: 66,
            ref_design: 'REF00002',
            amount: 14,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 35,
          },
          {
            articleId: 67,
            ref_design: 'REF00005',
            amount: 29,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 32,
          },
          {
            articleId: 68,
            ref_design: 'REF00010',
            amount: 31,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 28,
          },
          {
            articleId: 69,
            ref_design: 'REF00008',
            amount: 50,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 43,
          },
          {
            articleId: 70,
            ref_design: 'REF00003',
            amount: 25,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 24,
          },
          {
            articleId: 71,
            ref_design: 'REF00002',
            amount: 31,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 38,
          },
          {
            articleId: 72,
            ref_design: 'REF00010',
            amount: 20,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 38,
          },
          {
            articleId: 73,
            ref_design: 'REF00008',
            amount: 10,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 34,
          },
          {
            articleId: 74,
            ref_design: 'REF00005',
            amount: 16,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 32,
          },
          {
            articleId: 75,
            ref_design: 'REF00002',
            amount: 32,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 28,
          },
          {
            articleId: 76,
            ref_design: 'REF00006',
            amount: 13,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 42,
          },
          {
            articleId: 77,
            ref_design: 'REF00006',
            amount: 22,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 39,
          },
          {
            articleId: 78,
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
        orderId: 9,
        articles: [
          {
            articleId: 79,
            ref_design: 'REF00004',
            amount: 31,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 42,
          },
          {
            articleId: 80,
            ref_design: 'REF00008',
            amount: 41,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 35,
          },
          {
            articleId: 81,
            ref_design: 'REF00011',
            amount: 46,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 38,
          },
          {
            articleId: 82,
            ref_design: 'REF00008',
            amount: 16,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 34,
          },
          {
            articleId: 83,
            ref_design: 'REF00001',
            amount: 47,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 28,
          },
          {
            articleId: 84,
            ref_design: 'REF00003',
            amount: 25,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 38,
          },
          {
            articleId: 85,
            ref_design: 'REF00004',
            amount: 34,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 32,
          },
          {
            articleId: 86,
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
        orderId: 10,
        articles: [
          {
            articleId: 87,
            ref_design: 'REF00005',
            amount: 25,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 24,
          },
          {
            articleId: 88,
            ref_design: 'REF00001',
            amount: 24,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 35,
          },
          {
            articleId: 89,
            ref_design: 'REF00005',
            amount: 22,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 40,
          },
          {
            articleId: 90,
            ref_design: 'REF00004',
            amount: 39,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 28,
          },
          {
            articleId: 91,
            ref_design: 'REF00005',
            amount: 38,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 24,
          },
          {
            articleId: 92,
            ref_design: 'REF00002',
            amount: 45,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 28,
          },
          {
            articleId: 93,
            ref_design: 'REF00002',
            amount: 33,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 28,
          },
          {
            articleId: 94,
            ref_design: 'REF00003',
            amount: 13,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 24,
          },
          {
            articleId: 95,
            ref_design: 'REF00002',
            amount: 13,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 38,
          },
          {
            articleId: 96,
            ref_design: 'REF00002',
            amount: 8,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 34,
          },
          {
            articleId: 97,
            ref_design: 'REF00006',
            amount: 37,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 24,
          },
          {
            articleId: 98,
            ref_design: 'REF00007',
            amount: 29,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 38,
          },
          {
            articleId: 99,
            ref_design: 'REF00006',
            amount: 32,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 28,
          },
          {
            articleId: 100,
            ref_design: 'REF00005',
            amount: 36,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 39,
          },
          {
            articleId: 101,
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
        orderId: 11,
        articles: [
          {
            articleId: 102,
            ref_design: 'REF00002',
            amount: 20,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 39,
          },
          {
            articleId: 103,
            ref_design: 'REF00006',
            amount: 34,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 40,
          },
          {
            articleId: 104,
            ref_design: 'REF00002',
            amount: 5,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 43,
          },
          {
            articleId: 105,
            ref_design: 'REF00005',
            amount: 28,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 28,
          },
          {
            articleId: 106,
            ref_design: 'REF00005',
            amount: 31,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 32,
          },
          {
            articleId: 107,
            ref_design: 'REF00010',
            amount: 15,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 28,
          },
          {
            articleId: 108,
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
        orderId: 12,
        articles: [
          {
            articleId: 109,
            ref_design: 'REF00009',
            amount: 10,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 39,
          },
          {
            articleId: 110,
            ref_design: 'REF00006',
            amount: 44,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 43,
          },
          {
            articleId: 111,
            ref_design: 'REF00010',
            amount: 29,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 39,
          },
          {
            articleId: 112,
            ref_design: 'REF00006',
            amount: 19,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 40,
          },
          {
            articleId: 113,
            ref_design: 'REF00001',
            amount: 31,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 40,
          },
          {
            articleId: 114,
            ref_design: 'REF00006',
            amount: 42,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 39,
          },
          {
            articleId: 115,
            ref_design: 'REF00006',
            amount: 6,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 38,
          },
          {
            articleId: 116,
            ref_design: 'REF00009',
            amount: 12,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 35,
          },
          {
            articleId: 117,
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
        orderId: 13,
        articles: [
          {
            articleId: 118,
            ref_design: 'REF00009',
            amount: 8,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 24,
          },
          {
            articleId: 119,
            ref_design: 'REF00008',
            amount: 46,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 34,
          },
          {
            articleId: 120,
            ref_design: 'REF00003',
            amount: 33,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 32,
          },
          {
            articleId: 121,
            ref_design: 'REF00004',
            amount: 23,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 40,
          },
          {
            articleId: 122,
            ref_design: 'REF00002',
            amount: 50,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 24,
          },
          {
            articleId: 123,
            ref_design: 'REF00007',
            amount: 37,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 43,
          },
          {
            articleId: 124,
            ref_design: 'REF00009',
            amount: 48,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 32,
          },
          {
            articleId: 125,
            ref_design: 'REF00003',
            amount: 6,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 40,
          },
          {
            articleId: 126,
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
        orderId: 14,
        articles: [
          {
            articleId: 127,
            ref_design: 'REF00009',
            amount: 30,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 39,
          },
          {
            articleId: 128,
            ref_design: 'REF00010',
            amount: 29,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 34,
          },
          {
            articleId: 129,
            ref_design: 'REF00002',
            amount: 35,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 28,
          },
          {
            articleId: 130,
            ref_design: 'REF00009',
            amount: 11,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 43,
          },
          {
            articleId: 131,
            ref_design: 'REF00006',
            amount: 41,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 43,
          },
          {
            articleId: 132,
            ref_design: 'REF00002',
            amount: 6,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 40,
          },
          {
            articleId: 133,
            ref_design: 'REF00001',
            amount: 16,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 38,
          },
          {
            articleId: 134,
            ref_design: 'REF00004',
            amount: 15,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 32,
          },
          {
            articleId: 135,
            ref_design: 'REF00009',
            amount: 28,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 40,
          },
          {
            articleId: 136,
            ref_design: 'REF00009',
            amount: 46,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 40,
          },
          {
            articleId: 137,
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
        orderId: 15,
        articles: [
          {
            articleId: 138,
            ref_design: 'REF00001',
            amount: 20,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 39,
          },
          {
            articleId: 139,
            ref_design: 'REF00001',
            amount: 23,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 42,
          },
          {
            articleId: 140,
            ref_design: 'REF00006',
            amount: 39,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 38,
          },
          {
            articleId: 141,
            ref_design: 'REF00006',
            amount: 26,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 28,
          },
          {
            articleId: 142,
            ref_design: 'REF00011',
            amount: 10,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 39,
          },
          {
            articleId: 143,
            ref_design: 'REF00010',
            amount: 11,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 39,
          },
          {
            articleId: 144,
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
        orderId: 16,
        articles: [
          {
            articleId: 145,
            ref_design: 'REF00008',
            amount: 44,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 32,
          },
          {
            articleId: 146,
            ref_design: 'REF00008',
            amount: 15,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 40,
          },
          {
            articleId: 147,
            ref_design: 'REF00001',
            amount: 49,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 39,
          },
          {
            articleId: 148,
            ref_design: 'REF00007',
            amount: 12,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 35,
          },
          {
            articleId: 149,
            ref_design: 'REF00002',
            amount: 11,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 24,
          },
          {
            articleId: 150,
            ref_design: 'REF00010',
            amount: 17,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 38,
          },
          {
            articleId: 151,
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
        orderId: 17,
        articles: [
          {
            articleId: 152,
            ref_design: 'REF00002',
            amount: 41,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 24,
          },
          {
            articleId: 153,
            ref_design: 'REF00002',
            amount: 36,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 40,
          },
          {
            articleId: 154,
            ref_design: 'REF00007',
            amount: 27,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 32,
          },
          {
            articleId: 155,
            ref_design: 'REF00003',
            amount: 43,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 35,
          },
          {
            articleId: 156,
            ref_design: 'REF00003',
            amount: 8,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 24,
          },
          {
            articleId: 157,
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
        orderId: 18,
        articles: [
          {
            articleId: 158,
            ref_design: 'REF00005',
            amount: 40,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 28,
          },
          {
            articleId: 159,
            ref_design: 'REF00001',
            amount: 37,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 32,
          },
          {
            articleId: 160,
            ref_design: 'REF00011',
            amount: 50,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 28,
          },
          {
            articleId: 161,
            ref_design: 'REF00009',
            amount: 44,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 38,
          },
          {
            articleId: 162,
            ref_design: 'REF00003',
            amount: 21,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 34,
          },
          {
            articleId: 163,
            ref_design: 'REF00003',
            amount: 7,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 40,
          },
          {
            articleId: 164,
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
        orderId: 19,
        articles: [
          {
            articleId: 165,
            ref_design: 'REF00001',
            amount: 45,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 32,
          },
          {
            articleId: 166,
            ref_design: 'REF00008',
            amount: 18,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 35,
          },
          {
            articleId: 167,
            ref_design: 'REF00006',
            amount: 46,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 34,
          },
          {
            articleId: 168,
            ref_design: 'REF00010',
            amount: 46,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 39,
          },
          {
            articleId: 169,
            ref_design: 'REF00004',
            amount: 41,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 38,
          },
          {
            articleId: 170,
            ref_design: 'REF00001',
            amount: 46,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 35,
          },
          {
            articleId: 171,
            ref_design: 'REF00006',
            amount: 34,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 35,
          },
          {
            articleId: 172,
            ref_design: 'REF00001',
            amount: 31,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 34,
          },
          {
            articleId: 173,
            ref_design: 'REF00003',
            amount: 7,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 35,
          },
          {
            articleId: 174,
            ref_design: 'REF00003',
            amount: 34,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 35,
          },
          {
            articleId: 175,
            ref_design: 'REF00007',
            amount: 50,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 39,
          },
          {
            articleId: 176,
            ref_design: 'REF00004',
            amount: 38,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 40,
          },
          {
            articleId: 177,
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
        orderId: 20,
        articles: [
          {
            articleId: 178,
            ref_design: 'REF00004',
            amount: 6,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 34,
          },
          {
            articleId: 179,
            ref_design: 'REF00008',
            amount: 11,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 28,
          },
          {
            articleId: 180,
            ref_design: 'REF00006',
            amount: 36,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 40,
          },
          {
            articleId: 181,
            ref_design: 'REF00005',
            amount: 27,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 35,
          },
          {
            articleId: 182,
            ref_design: 'REF00004',
            amount: 33,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 35,
          },
          {
            articleId: 183,
            ref_design: 'REF00003',
            amount: 13,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 42,
          },
          {
            articleId: 184,
            ref_design: 'REF00004',
            amount: 12,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 34,
          },
          {
            articleId: 185,
            ref_design: 'REF00001',
            amount: 44,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 43,
          },
          {
            articleId: 186,
            ref_design: 'REF00007',
            amount: 7,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 42,
          },
          {
            articleId: 187,
            ref_design: 'REF00003',
            amount: 45,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 28,
          },
          {
            articleId: 188,
            ref_design: 'REF00008',
            amount: 37,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 38,
          },
          {
            articleId: 189,
            ref_design: 'REF00005',
            amount: 10,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 28,
          },
          {
            articleId: 190,
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
        orderId: 21,
        articles: [
          {
            articleId: 191,
            ref_design: 'REF00002',
            amount: 21,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 35,
          },
          {
            articleId: 192,
            ref_design: 'REF00005',
            amount: 30,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 40,
          },
          {
            articleId: 193,
            ref_design: 'REF00006',
            amount: 27,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 43,
          },
          {
            articleId: 194,
            ref_design: 'REF00011',
            amount: 9,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 38,
          },
          {
            articleId: 195,
            ref_design: 'REF00002',
            amount: 20,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 35,
          },
          {
            articleId: 196,
            ref_design: 'REF00004',
            amount: 16,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 39,
          },
          {
            articleId: 197,
            ref_design: 'REF00003',
            amount: 48,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 38,
          },
          {
            articleId: 198,
            ref_design: 'REF00009',
            amount: 7,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 43,
          },
          {
            articleId: 199,
            ref_design: 'REF00009',
            amount: 5,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 32,
          },
          {
            articleId: 200,
            ref_design: 'REF00010',
            amount: 8,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 43,
          },
          {
            articleId: 201,
            ref_design: 'REF00011',
            amount: 14,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 42,
          },
          {
            articleId: 202,
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
        orderId: 22,
        articles: [
          {
            articleId: 203,
            ref_design: 'REF00006',
            amount: 6,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 35,
          },
          {
            articleId: 204,
            ref_design: 'REF00008',
            amount: 34,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 42,
          },
          {
            articleId: 205,
            ref_design: 'REF00003',
            amount: 36,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 28,
          },
          {
            articleId: 206,
            ref_design: 'REF00008',
            amount: 27,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 38,
          },
          {
            articleId: 207,
            ref_design: 'REF00004',
            amount: 19,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 34,
          },
          {
            articleId: 208,
            ref_design: 'REF00007',
            amount: 46,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 32,
          },
          {
            articleId: 209,
            ref_design: 'REF00007',
            amount: 11,
            color: {
              id: 4,
              name: 'Azul',
            },
            cod_size: 43,
          },
          {
            articleId: 210,
            ref_design: 'REF00003',
            amount: 12,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 42,
          },
          {
            articleId: 211,
            ref_design: 'REF00009',
            amount: 25,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 42,
          },
          {
            articleId: 212,
            ref_design: 'REF00005',
            amount: 36,
            color: {
              id: 3,
              name: 'Rojo',
            },
            cod_size: 43,
          },
          {
            articleId: 213,
            ref_design: 'REF00011',
            amount: 46,
            color: {
              id: 8,
              name: 'Café',
            },
            cod_size: 39,
          },
          {
            articleId: 214,
            ref_design: 'REF00004',
            amount: 49,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 32,
          },
          {
            articleId: 215,
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
        orderId: 23,
        articles: [
          {
            articleId: 216,
            ref_design: 'REF00010',
            amount: 41,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 24,
          },
          {
            articleId: 217,
            ref_design: 'REF00006',
            amount: 20,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 28,
          },
          {
            articleId: 218,
            ref_design: 'REF00008',
            amount: 28,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 24,
          },
          {
            articleId: 219,
            ref_design: 'REF00009',
            amount: 49,
            color: {
              id: 2,
              name: 'Blanco',
            },
            cod_size: 39,
          },
          {
            articleId: 220,
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
        orderId: 24,
        articles: [
          {
            articleId: 221,
            ref_design: 'REF00010',
            amount: 37,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 39,
          },
          {
            articleId: 222,
            ref_design: 'REF00010',
            amount: 26,
            color: {
              id: 1,
              name: 'Negro',
            },
            cod_size: 40,
          },
          {
            articleId: 223,
            ref_design: 'REF00004',
            amount: 5,
            color: {
              id: 7,
              name: 'Gris',
            },
            cod_size: 40,
          },
          {
            articleId: 224,
            ref_design: 'REF00009',
            amount: 16,
            color: {
              id: 5,
              name: 'Verde',
            },
            cod_size: 43,
          },
          {
            articleId: 225,
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
        orderId: 25,
        articles: [
          {
            articleId: 226,
            ref_design: 'REF00002',
            amount: 21,
            color: {
              id: 6,
              name: 'Amarillo',
            },
            cod_size: 32,
          },
          {
            articleId: 227,
            ref_design: 'REF00004',
            amount: 50,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 24,
          },
          {
            articleId: 228,
            ref_design: 'REF00002',
            amount: 6,
            color: {
              id: 10,
              name: 'Rosado',
            },
            cod_size: 28,
          },
          {
            articleId: 229,
            ref_design: 'REF00004',
            amount: 19,
            color: {
              id: 9,
              name: 'Beige',
            },
            cod_size: 42,
          },
        ],
      },
    ];
    return dataOrderDetail;
  }
}

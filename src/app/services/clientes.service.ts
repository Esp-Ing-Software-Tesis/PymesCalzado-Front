import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Clients } from '../models/clientes.model';

@Injectable({ providedIn: 'root' })
export class ClientsService {
  constructor() {}

  // Mock de Clientes
  getClients(): Observable<Clients[]> {
    const clientsMock: Clients[] = [
      { customer_id: 900123456, name: 'Calzado Andino S.A.S.' },
      { customer_id: 901234567, name: 'Industria Zapatera El Sol Ltda.' },
      { customer_id: 902345678, name: 'Confecciones y Calzado Orion S.A.S.' },
      { customer_id: 903456789, name: 'Distribuciones El Paso S.A.S.' },
      { customer_id: 904567890, name: 'Calzado Urbano Ltda.' },
      { customer_id: 905678901, name: 'Zapatería Moderna S.A.S.' },
      { customer_id: 906789012, name: 'Exportadora de Calzado Andar S.A.S.' },
      { customer_id: 907890123, name: 'Comercializadora Global Shoes Ltda.' },
    ];
    return of(clientsMock);
  }
}

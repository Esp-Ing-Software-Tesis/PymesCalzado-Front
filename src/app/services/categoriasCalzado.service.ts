import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShoeCategorys } from '../models/categoriasCalzado.model';

@Injectable({ providedIn: 'root' })
export class ShoeCategorysService {
  constructor() {}

  // Mock de get categorias de zapatos
  getShoesCategory(): Observable<ShoeCategorys[]> {
    const shoeCategorysMock: ShoeCategorys[] = [
      { id: 1, nombre: 'Deportivo', description: 'Zapatos diseñados para actividades deportivas y ejercicio físico.' },
      { id: 2, nombre: 'Formal', description: 'Zapatos adecuados para ocasiones formales y eventos especiales.' },
      { id: 3, nombre: 'Casual', description: 'Zapatos cómodos y versátiles para el uso diario.' },
      { id: 4, nombre: 'Infantil', description: 'Zapatos diseñados específicamente para niños y niñas.' },
    ];
    return of(shoeCategorysMock);
  }
}

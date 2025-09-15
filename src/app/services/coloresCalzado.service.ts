import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShoeColors } from '../models/coloresCalzado.model';

@Injectable({ providedIn: 'root' })
export class ShoeColorsService {
  constructor() {}

  // Mock de get colores de zapatos
  getShoeColors(): Observable<ShoeColors[]> {
    const shoeColorsMock: ShoeColors[] = [
      { id: 1, nombre: 'Negro', description: 'negro' },
      { id: 2, nombre: 'Blanco', description: 'Blanco' },
      { id: 3, nombre: 'Rojo', description: 'Rojo' },
      { id: 4, nombre: 'Azul', description: 'Azul' },
      { id: 5, nombre: 'Verde', description: 'Verde' },
      { id: 6, nombre: 'Amarillo', description: 'Amarillo' },
      { id: 7, nombre: 'Gris', description: 'Gris' },
      { id: 8, nombre: 'Café', description: 'Café' },
      { id: 9, nombre: 'Beige', description: 'Beige' },
      { id: 10, nombre: 'Rosado', description: 'Rosado' },
    ];
    return of(shoeColorsMock);
  }
}

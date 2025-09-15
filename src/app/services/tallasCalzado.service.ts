import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShoeSizes } from '../models/tallasCalzado.model';

@Injectable({ providedIn: 'root' })
export class ShoeSizesService {
  constructor() {}

  // Mock de get tallas de zapatos
  getShoeSizes(): Observable<ShoeSizes[]> {
    const shoeSizesMock: ShoeSizes[] = [
      { id: 24, description:'' },
      { id: 28, description:'' },
      { id: 32, description:'' },
      { id: 34, description:'' },
      { id: 35, description:'' },
      { id: 38, description:'' },
      { id: 39, description:'' },
      { id: 40, description:'' },
      { id: 42, description:'' },
      { id: 43, description:'' },
    ];
    return of(shoeSizesMock);
  }
}
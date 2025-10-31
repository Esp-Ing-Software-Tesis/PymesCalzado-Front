import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InputShowDetailGeneral } from '../shared/showDetailGeneral/showDetailGeneral.interface';

@Injectable({ providedIn: 'root' })
export class DetailConfigService {
  private readonly configSubject = new BehaviorSubject<InputShowDetailGeneral | null>(null);
  config$ = this.configSubject.asObservable();

  // Actualizar la data que consultara el hijo 
  setConfig(config: InputShowDetailGeneral) {
    this.configSubject.next(config);
  }

  // Limpiar la data que utilizara el hijo
  clearConfig() {
    this.configSubject.next(null);
  }
}

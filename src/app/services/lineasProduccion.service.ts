import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ProductionLines } from "../models/lineasProduccion.model";

@Injectable ({ providedIn: 'root' })
export class ProductionLinesService {

    constructor() {}

    // Mock de get productionLines
    getProductionLines(): Observable<ProductionLines[]> {
        const productionsLineMock: ProductionLines[] = [
            { id: 1, nombre: 'Bordado', isObligatory: true },
            { id: 2, nombre: 'Corte', isObligatory: true },
            { id: 3, nombre: 'Emplantillado', isObligatory: false },
            { id: 4, nombre: 'Estampado', isObligatory: false },
            { id: 5, nombre: 'Guarnición', isObligatory: true },
            { id: 6, nombre: 'Solador', isObligatory: true },
            { id: 7, nombre: 'Termofijado', isObligatory: false }
        ]
        return of (productionsLineMock);
    }
}
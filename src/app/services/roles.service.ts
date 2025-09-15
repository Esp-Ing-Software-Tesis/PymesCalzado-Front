import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Rols } from "../models/roles.model";

@Injectable ({ providedIn: 'root' })
export class RolsService {

    constructor() {}

    // Mock de get Rols
    getRols(): Observable<Rols[]> {
        const rolsMock: Rols[] = [
            { id: 1, nombre: 'Administrador' },
            { id: 2, nombre: 'Operario' }
        ]
        return of (rolsMock);
    }
}
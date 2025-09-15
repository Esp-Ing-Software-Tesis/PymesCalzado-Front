import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DocumentsType } from "../models/tiposDocumento.model";

@Injectable ({ providedIn: 'root' })
export class DocumentTypeService {

    constructor() {}

    // Mock de get documents type
    getDocumentsType(): Observable<DocumentsType[]> {
        const documentTypeMock: DocumentsType[] = [
            { id: 1, codigo: 'CC', nombre: 'Cedula de Ciudadanía' },
            { id: 2, codigo: 'CE', nombre: 'Cedula de Extranjería' },
            { id: 3, codigo: 'TI', nombre: 'Tarjeta de Identidad' }
        ]
        return of (documentTypeMock);
    }
}
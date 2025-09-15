export interface UsersEventDTO {
    name: string;
    documentType: string;
    document: number;
    email: string;
    phone: number;
    rol: string;
    productionLine?: string;
    state: boolean;
}
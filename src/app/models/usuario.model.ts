export interface Users {
    name: string;
    lastname: string;
    documentType: string;
    document: number;
    email: string;
    phone: number;
    rol: string;
    productionLine?: string;
    state: boolean;
}

export interface UserUpdateDTO {
    document: number;
    state?: boolean;
}

export interface UserCreateDTO {
    name: string;
    lastname: string;
    documentType: string;
    document: number;
    email: string;
    phone: number;
    rol: string;
    productionLine?: string;
    password: string;
}

// Consultar usuarios por linea de produccion
export interface UsersByProductionLine {
    name: string;
    lastname: string;
    document: number;
}
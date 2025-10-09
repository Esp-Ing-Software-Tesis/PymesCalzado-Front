export interface Order {
    id: number,
    nameClient: string,
    customer_id: number,
    created_at: string,
    start_date: string,
    completion_date: string,
    state: string
}

export interface OrderDetail {
    id: number,
    articles: OrderDetailArticles[]
}

export interface OrderDetailArticles {
    ref_design: string,
    amount: number,
    color: ShoeColors,
    cod_size: number
}

interface ShoeColors{
    id: number,
    name: string
}

export interface OrderCreateDTO {
    customer_id: number,
    articles: CreateArticles[]
}

export interface CreateArticles {
    ref_design: string,
    amount: number,
    cod_color: number
    cod_size: number
}
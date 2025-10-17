export interface Order {
    orderId: number,
    nameClient: string,
    customer_id: number,
    created_at: string,
    start_date: string,
    completion_date: string,
    state: string, // Nuevo, En Progreso, Finalizado
}

export interface OrderDetail {
    orderId: number,
    articles: OrderDetailArticles[]
}

export interface OrderDetailArticles {
    articleId: number,
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
    // Json con el color_id y color_name
    cod_color: number,
    cod_size: number,
}
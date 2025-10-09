export interface ClientsDTO {
    customer_id: number;
    name: string;
}

export interface CreateOrderDTO {
    customer_id: number;
    client: string;
    articles: ArticlesDTO[];
}

export interface ArticlesDTO {
    ref_design: string;
    amount: number;
    cod_color: number;
    name_color: string;
    cod_size: number;
}

export interface ConfigTable<T> {
  name: string;
  key: keyof T | 'delete';
  width: string;
  position?: 'up' | 'center' | 'down';
  align?: 'left' | 'center' | 'right';
  isObligatory?: boolean;
  isAction?: boolean;
}
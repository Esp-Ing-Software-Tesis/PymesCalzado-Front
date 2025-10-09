export interface InputTableGeneral {
    itemsPerPage: number;
    context: 'USER' | 'SHOEDESIGN' | 'ORDERGERENT' | 'ORDERGERENT-ADDARTICLE';
    colums: ColumnConfig[];
}

interface ColumnConfig {
  name: string;
  key: string;
  width: string;
  isUser?: boolean;
  isImage?: boolean;
  isState?: boolean;
  isShowDetail?: boolean;
  isShowAddArticle?: boolean;
  position?: 'up' | 'center' | 'dowm';
  align?: 'left' | 'center' | 'right';
}

export interface ValueChangedEvent<T> {
  item: T;
  key: string;
  value?: boolean;
  context: string;
}


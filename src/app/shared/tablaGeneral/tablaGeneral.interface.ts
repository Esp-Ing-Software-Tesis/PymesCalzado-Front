export interface InputTableGeneral {
    itemsPerPage: number;
    context: 'USER' | 'SHOEDESIGN';
    colums: ColumnConfig[];
}

interface ColumnConfig {
  name: string;
  key: string;
  width: string;
  isUser?: boolean;
  isImage?: boolean;
  isShowDetail?: boolean;
  position?: 'up' | 'center' | 'dowm';
  align?: 'left' | 'center' | 'right';
}

export interface ValueChangedEvent<T> {
  item: T;
  key: string;
  value?: boolean;
  context: string;
}


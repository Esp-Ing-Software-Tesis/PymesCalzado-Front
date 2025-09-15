export interface ConfigTable {
  name: string;
  key: keyof DataTable;
  width: string;
  position?: 'up' | 'center' | 'dowm';
  align?: 'left' | 'center' | 'right';
  isObligatory?: boolean;
}

export interface DataTable {
    id: number;
    productionLine: string;
    apply: boolean;
    costPerPair: string;
    isObligatory: boolean;
}

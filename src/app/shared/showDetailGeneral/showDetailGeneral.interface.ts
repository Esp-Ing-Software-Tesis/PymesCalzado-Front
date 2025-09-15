export interface InputShowDetailGeneral {
  title: string;
  context: 'USER' | 'SHOEDESIGN';
  reference?: string;
  showtable?: boolean;
  titletable?: string;
  configTable?: ConfigTable[];
  datatable?: DataTableDetail[];
  showFootTable?: boolean;
  footTable?: FootTable;
  showColors?: boolean;
  titleColors?: string;
  dataColors?: string[];
  showSizes?: boolean;
  titleSizes?: string;
  dataSizes?: string[];
}

interface ConfigTable {
  name: string;
  key: string;
  width: string;
  position?: 'up' | 'center' | 'dowm';
  align?: 'left' | 'center' | 'right';
}

interface FootTable {
  text: string;
  amount?: number;
  amountFormatted?: string;
}

export interface DataTableDetail {
    productionLine: string;
    costPerPair: number;
    costPerPairFormatted?: string;
}

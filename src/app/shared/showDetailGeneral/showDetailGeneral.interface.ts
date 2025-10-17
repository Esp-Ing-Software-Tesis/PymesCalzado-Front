export interface InputShowDetailGeneral {
  title: string;
  context: '' | 'USER' | 'SHOEDESIGN' | 'ORDERGERENT' | 'ORDERGERENTADMIN';
  itemsPerPage: number;
  isCreate?: boolean;
  isView?: boolean;
  reference?: string;
  showtable?: boolean;
  titletable?: string;
  configTable: ConfigTable[];
  datatable: DataTableDetail[];
  orderId?: number;
  stateOrder?: string;
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
  isState?: boolean;
  isShowDetail?: boolean;
}

interface FootTable {
  text: string;
  amount?: number;
  amountFormatted?: string;
  isPaginate?: boolean;
}

export interface DataTableDetail {
  dataTableDetailShoeDesign?: DataTableDetailShoeDesign[];
  dataTableDetailOrder?: DataTableDetailOrder[];
  dataTableDetailOrderAdmin?: DataTableDetailOrderAdmin[];
}

export interface DataTableDetailShoeDesign {
  productionLine: string;
  costPerPair: number;
  costPerPairFormatted?: string;
}

export interface DataTableDetailOrder {
  ref_design: string;
  amount: number;
  name_color: string;
  cod_size: number;
}

export interface DataTableDetailOrderAdmin {
  id: number;
  ref_design: string;
  amount: number;
  name_color: string;
  cod_size: number;
  state?: string;
}

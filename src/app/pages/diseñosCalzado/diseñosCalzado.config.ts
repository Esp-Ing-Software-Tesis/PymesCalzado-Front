import { InputTableGeneral } from '../../shared/tablaGeneral/tablaGeneral.interface';
import { InputShowDetailGeneral } from '../../shared/showDetailGeneral/showDetailGeneral.interface';

export const TABLA_GENERAL: InputTableGeneral = {
  itemsPerPage: 10,
  context: 'SHOEDESIGN',
  // la tabla tiene un total de 1420px
  colums: [
    { name: 'Referencia', key: 'reference', width: '140px', align: 'center' },
    { name: 'Nombre', key: 'name', width: '220px', align: 'center' },
    { name: 'Imagen', key: 'image', width: '180px', align: 'center', isImage: true },
    { name: 'Categoría', key: 'category', width: '150px', align: 'center' },
    { name: 'Descripción', key: 'description', width: '600px', align: 'left', position: 'up' },
    { name: 'Detalles', key: 'showDetails', width: '130px', align: 'center', isShowDetail: true },
  ],
};

export const SHOW_DETAIL_GENERAL: InputShowDetailGeneral = {
  title: 'Detalle del Diseño de Calzado',
  context: 'SHOEDESIGN',
  reference: '',
  showtable: true,
  itemsPerPage: 1,
  titletable: 'Líneas de Producción y Costos',
  // la tabla tiene un total de 800px
  configTable: [
    { name: 'Línea de Producción', key: 'productionLine', width: '400px', align: 'center' },
    { name: 'Costo por Par (COP) ', key: 'costPerPairFormatted', width: '400px', align: 'center' },
  ],
  datatable: [],
  showFootTable: true,
  footTable: { text: 'Total:', amountFormatted: '' },
  showColors: true,
  titleColors: 'Colores',
  dataColors:[],
  showSizes: true,
  titleSizes: 'Tallas',
  dataSizes:[]
};

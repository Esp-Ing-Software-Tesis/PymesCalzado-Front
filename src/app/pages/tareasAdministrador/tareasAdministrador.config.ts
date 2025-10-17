import { InputTableGeneral } from '../../shared/tablaGeneral/tablaGeneral.interface';
import { InputShowDetailGeneral } from '../../shared/showDetailGeneral/showDetailGeneral.interface';

export const TABLA_GENERAL: InputTableGeneral = {
  itemsPerPage: 20,
  context: 'ORDERGERENTADMIN',
  // la tabla tiene un total de 1420px
  colums: [
    { name: 'Nombre Cliente', key: 'name_client', width: '320px', align: 'left' },
    { name: 'Nit Cliente', key: 'customer_id', width: '155px', align: 'center' },
    { name: 'Fecha de creación', key: 'created_at', width: '220px', align: 'center' },
    { name: 'Fecha de Inicio', key: 'start_date', width: '220px', align: 'center' },
    { name: 'Fecha de Finalización', key: 'completion_date', width: '220px', align: 'center'},
    { name: 'Estado', key: 'state', width: '155px', align: 'center', isState: true },
    { name: 'Detalles', key: 'showDetails', width: '130px', align: 'center', isShowDetail: true },
  ],
};

export const SHOW_DETAIL_VIEW: InputShowDetailGeneral = {
  title: 'Artículos',
  context: 'ORDERGERENTADMIN',
  reference: '',
  showtable: true,
  itemsPerPage: 10,
  isCreate: false,
  isView: true,
  // la tabla tiene un total de 800px
  configTable: [
    { name: 'Referencia', key: 'ref_design', width: '200px', align: 'center' },
    { name: 'Cantidad Pares', key: 'amount', width: '130px', align: 'center' },
    { name: 'Color', key: 'name_color', width: '200px', align: 'center' },
    { name: 'Talla', key: 'cod_size', width: '130px', align: 'center' },
    { name: 'Acción', key: 'showDetails', width: '140px', align: 'center', isShowDetail: true },
  ],
  datatable: [],
  showFootTable: true,
};

export const SHOW_DETAIL_CREATE: InputShowDetailGeneral = {
  title: 'Artículos',
  context: 'ORDERGERENTADMIN',
  reference: '',
  showtable: true,
  itemsPerPage: 10,
  isCreate: true,
  isView: false,
  // la tabla tiene un total de 800px
  configTable: [
    { name: 'Referencia', key: 'ref_design', width: '150px', align: 'center' },
    { name: 'Cantidad Pares', key: 'amount', width: '110px', align: 'center' },
    { name: 'Color', key: 'name_color', width: '150px', align: 'center' },
    { name: 'Talla', key: 'cod_size', width: '110px', align: 'center' },
    { name: 'Estado', key: 'state', width: '150px', align: 'center', isState: true },
    { name: 'Acción', key: 'showDetails', width: '130px', align: 'center', isShowDetail: true },
  ],
  datatable: [],
  showFootTable: true,
};
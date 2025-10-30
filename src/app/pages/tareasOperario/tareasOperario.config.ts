import { InputTableGeneral } from "../../shared/tablaGeneral/tablaGeneral.interface";
import { ManageTaskOperatorDTO } from "./gestionarTareasOperario/gestionarTareasOperario.interface";

export const TABLA_GENERAL: InputTableGeneral = {
  itemsPerPage: 10,
  context: 'TASKOPERATOR',
  // la tabla tiene un total de 1420px
  colums: [
    { name: 'Referencia', key: 'ref_design', width: '200px', align: 'center' },
    { name: 'Cantidad Pares', key: 'amount', width: '130px', align: 'center' },
    { name: 'Color', key: 'color_name', width: '170px', align: 'center' },
    { name: 'Talla', key: 'size_id', width: '130px', align: 'center' },
    { name: 'Fecha de Asignación', key: 'asigned_at', width: '160px', align: 'center'},
    { name: 'Fecha de Inicio', key: 'started_at', width: '160px', align: 'center'},
    { name: 'Fecha de Finalización', key: 'finished_at', width: '160px', align: 'center'},
    { name: 'Estado', key: 'state', width: '180px', align: 'center', isProductionLine: true },
    { name: 'Acción', key: 'showDetails', width: '130px', align: 'center', isShowDetail: true },
  ],
};

export const INFO_MANAGE_TASKS: ManageTaskOperatorDTO = {
  context: 'TASKOPERATOR',
  articleTaskDTO: {ref_design: '', amount: 0, name_color: '', cod_size: 0, state: '' },
  taskId: 0,
};
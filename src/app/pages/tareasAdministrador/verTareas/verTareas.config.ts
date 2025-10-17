import { InputTableGeneral } from '../../../shared/tablaGeneral/tablaGeneral.interface';
import { ManageTaskDTO } from './gestionarTareasAdmin/gestionarTareasAdmin.interface';

export const TABLA_GENERAL: InputTableGeneral = {
  itemsPerPage: 20,
  context: 'ORDERGERENTADMIN-SHOW-TASKS',
  // la tabla tiene un total de 1420px
  colums: [
    { name: '', key: 'taskId', width: '130px', align: 'center' },
    { name: 'Cantidad de Pares', key: 'amount', width: '130px', align: 'center' },
    { name: 'Etapa de Producción', key: 'stateProductionLine', width: '230px', align: 'center', isProductionLine: true },
    { name: 'Fecha de Creación', key: 'created_at', width: '200px', align: 'center' },
    { name: 'Fecha de Inicio', key: 'started_at', width: '200px', align: 'center' },
    { name: 'Fecha de Actualización', key: 'updated_at', width: '200px', align: 'center' },
    { name: 'Fecha de Finalización', key: 'finished_at', width: '200px', align: 'center' },
    { name: 'Acción', key: 'showDetails', width: '130px', align: 'center', isShowDetail: true },
  ],
};

export const INFO_MANAGE_TASKS: ManageTaskDTO = {
  context: 'ORDERGERENTADMIN-TASK',
  articleTaskDTO: { articleId: 0, ref_design: '', amount: 0, name_color: '', cod_size: 0 },
  taskId: 0,
};
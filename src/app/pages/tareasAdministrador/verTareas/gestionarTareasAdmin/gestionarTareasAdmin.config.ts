import { TaskDetailInfoDTO, ConfigTable } from "./gestionarTareasAdmin.interface";
import { InputsFormModal } from "../../../../shared/formModal/formModal.interface";
import { InputAlertModal } from "../../../../shared/alertModal/alertModal.interface";

export const TABLA_DETALLE_TAREAS: ConfigTable<TaskDetailInfoDTO>[] = [
  { name: 'Línea de Producción', key: 'productionLine', width: '230px', align: 'center' },
  { name: 'Responsable', key: 'responsable', width: '350px', align: 'center'},
  { name: 'Fecha de Asignacíon', key: 'asigned_at', width: '220px', align: 'center'},
  { name: 'Fecha de Inicio', key: 'started_at', width: '220px', align: 'center'},
  { name: 'Fecha de Finalización', key: 'finished_at', width: '220px', align: 'center'},
  { name: 'Estado', key: 'state', width: '180px', align: 'center', isState: true},
];

export const FORMULARIO_CREACION_MODAL: InputsFormModal = {
  title: 'Asignar Tarea y Avanzar',
  inputsConfig: [
    { name: 'Operario', key: 'operator', obligatory: true, inputType: 'list', article: 'el', options: [] },
  ],
  textButtonConfirm: 'Aceptar',
  context: 'ORDERGERENTADMIN'
};

export const ALERTA_MODAL: InputAlertModal = {
  title: '',
  text: '',
};
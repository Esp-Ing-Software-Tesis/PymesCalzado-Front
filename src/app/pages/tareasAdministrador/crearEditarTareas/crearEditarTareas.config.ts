import { InputsFormModal } from '../../../shared/formModal/formModal.interface';
import { TasksArticlesDTO, ConfigTable } from '../crearEditarTareas/crearEditarTareas.interface';
import { InputAlertModal } from '../../../shared/alertModal/alertModal.interface';

export const FORMULARIO_CREACION_MODAL: InputsFormModal = {
  title: 'Añadir Tarea',
  text: '',
  inputsConfig: [
    { name: 'Cantidad', key: 'amount', obligatory: true, inputType: 'number', article: 'la' },
  ],
  textButtonConfirm: 'Añadir',
  context: 'ORDERGERENTADMIN-CREATE-EDIT'
};

export const TABLA_TAREAS: ConfigTable<TasksArticlesDTO>[] = [
  { name: '', key: 'taskId', width: '150px', align: 'center' },
  { name: 'Cantidad Pares', key: 'amount', width: '150px', align: 'center', isObligatory: true },
  { name: 'Eliminar', key: 'delete', width: '150px', align: 'center', isAction: true },
];

export const ALERTA_MODAL: InputAlertModal = {
  title: '',
  text: '',
};
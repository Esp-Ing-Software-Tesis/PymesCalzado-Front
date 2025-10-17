import { TaskDTO } from '../../pages/tareasAdministrador/crearEditarTareas/crearEditarTareas.interface';
import { TaskShowDatilDTO } from '../../pages/tareasAdministrador/verTareas/verTareas.interface'; 

export const INFO_TASKS: TaskDTO = {
  context: 'ORDERGERENTADMIN-CREATE-EDIT',
  action: '',
  articleTaskDTO: { articleId: 0, ref_design: '', amount: 0, name_color: '', cod_size: 0 },
  tasksDetailDTO: [],
};

export const INFO_TASKS_DETAIL: TaskShowDatilDTO = {
  context: 'ORDERGERENTADMIN-SHOW-TASKS',
  articleTaskDTO: { articleId: 0, ref_design: '', amount: 0, name_color: '', cod_size: 0 },
};
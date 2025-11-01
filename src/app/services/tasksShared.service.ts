import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskDTO, TasksDetailDTO } from '../pages/tareasAdministrador/crearEditarTareas/crearEditarTareas.interface';
import { TaskShowDatilDTO } from '../pages/tareasAdministrador/verTareas/verTareas.interface';
import { ManageTaskDTO } from '../pages/tareasAdministrador/verTareas/gestionarTareasAdmin/gestionarTareasAdmin.interface';
import { ManageTaskOperatorDTO } from '../pages/tareasOperario/gestionarTareasOperario/gestionarTareasOperario.interface';

@Injectable({ providedIn: 'root' })
export class TasksSharedService {
  // Estado inicial de la información de tareas (enviado desde el padre) para creacion o edicion
  private readonly taskInfoSubject = new BehaviorSubject<TaskDTO | null>(null);
  taskInfo$ = this.taskInfoSubject.asObservable();

  // Estado inicial de la información de tareas (enviado desde el padre) para ver detalle
  private readonly taskInfoSubjectShowDetail = new BehaviorSubject<TaskShowDatilDTO | null>(null);
  taskInfoShowDetail$ = this.taskInfoSubjectShowDetail.asObservable();

  // Estado inicial de la información de tareas (enviado desde el padre) para gestionar la tarea
  private readonly taskInfoSubjectManage = new BehaviorSubject<ManageTaskDTO | null>(null);
  taskInfoManage$ = this.taskInfoSubjectManage.asObservable();

  // Respuesta de detalle de tareas (enviada desde el hijo)
  private readonly taskResponseSubject = new BehaviorSubject<TasksDetailDTO | null>(null);
  taskResponse$ = this.taskResponseSubject.asObservable();

  // Estado inicial de la información de tareas (enviado desde el padre) para gestionar la tarea del operario
  private readonly taskInfoSubjectManageOperator = new BehaviorSubject<ManageTaskOperatorDTO | null>(null);
  taskInfoManageOperator$ = this.taskInfoSubjectManageOperator.asObservable();

  // Logica para creacion o edicion de tareas
  // Enviar información de tareas desde el padre
  setTaskInfo(taskInfo: TaskDTO) {
    this.taskInfoSubject.next(taskInfo);
  }

  // Obtener la última información enviada
  getTaskInfo(): TaskDTO | null {
    return this.taskInfoSubject.value;
  }

  // Enviar resultado del hijo al padre
  sendTaskResponse(taskDetail: TasksDetailDTO) {
    this.taskResponseSubject.next(taskDetail);
  }

  // Obtener respuesta actual
  getTaskResponse(): TasksDetailDTO | null {
    return this.taskResponseSubject.value;
  }

  // Logica para ver detalle
  // Enviar información de tareas desde el padre
  setTaskInfoShowDetail(taskInfoShowDetail: TaskShowDatilDTO) {
    this.taskInfoSubjectShowDetail.next(taskInfoShowDetail);
  }

  // Obtener la última información enviada
  getTaskInfoShowDetail(): TaskShowDatilDTO | null {
    return this.taskInfoSubjectShowDetail.value;
  }

  // Logica para gestionar tarea
  // Enviar información de tareas desde el padre
  setTaskInfoManage(taskInfoManage: ManageTaskDTO) {
    this.taskInfoSubjectManage.next(taskInfoManage);
  }

  // Obtener la última información enviada
  getTaskManage(): ManageTaskDTO | null {
    return this.taskInfoSubjectManage.value;
  }

  // Logica para gestionar tarea operario
  // Enviar información de tareas desde el padre
  setTaskInfoManageOperator(taskInfoManageOperator: ManageTaskOperatorDTO) {
    this.taskInfoSubjectManageOperator.next(taskInfoManageOperator);
  }

  // Obtener la última información enviada
  getTaskManageOperator(): ManageTaskOperatorDTO | null {
    return this.taskInfoSubjectManageOperator.value;
  }

  // Limpiar datos (por ejemplo, al cerrar el flujo)
  clear() {
    this.taskInfoSubject.next(null);
    this.taskResponseSubject.next(null);
    this.taskInfoSubjectManageOperator.next(null);
  }
}

import { FormModalComponent } from './../../../../shared/formModal/formModal.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageTaskDTO } from './gestionarTareasAdmin.interface';
import { TasksService } from '../../../../services/tareas.service';
import { TasksSharedService } from '../../../../services/tasksShared.service';
import { TaskDetailInfoDTO, LastState, UsersByProductionLineDTO, AsignedTaskDTO } from './gestionarTareasAdmin.interface';
import { TABLA_DETALLE_TAREAS, FORMULARIO_CREACION_MODAL, ALERTA_MODAL } from './gestionarTareasAdmin.config';
import { AlertModalComponent } from '../../../../shared/alertModal/alertModal.component';
import { AsignedTask, RejectTask, NextStateTask } from '../../../../models/tareas.model';
import { UsersService } from '../../../../services/usuario.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-gestionar-tareas-admin-page',
  standalone: true,
  imports: [CommonModule, FormModalComponent, AlertModalComponent],
  templateUrl: './gestionarTareasAdmin.component.html',
  styleUrls: ['./gestionarTareasAdmin.component.scss'],
})
export class GestionarTareasAdminPageComponent implements OnInit {
  // Variable para manejar los datos enviados desde el padre
  configManageTask: ManageTaskDTO | null = null;
  // Variable para almacenar los datos de la respuesta del EP
  detailTasksByTask: TaskDetailInfoDTO[] = [];
  // manejo de configuraciones iniciales para la tabla de tareas
  tableConfig = structuredClone(TABLA_DETALLE_TAREAS);
  // variable para manejar el ultimo estado de la ultima linea de produccion
  lastState: LastState = {
    productionLine: '',
    lastState: '',
  };
  //Manejo de configuraciones de entrada para el modal del formulario
  formModalConfig = structuredClone(FORMULARIO_CREACION_MODAL);
  showFormModal: boolean = false;
  // manejo de configuraciones de entrada para el modal de alerta
  alertModalConfig = structuredClone(ALERTA_MODAL);
  showAlertModal: boolean = false;
  // Variable para manejar los usuarios por linea de produccion
  dataUserByProductionLine: UsersByProductionLineDTO[] = [];
  //Datos ingresados desde el formulario
  setDataForm: { [key: string]: string } = {};
  // contador de errores
  numErrors: number = 0;
  // Logica para manejar el orden de las lineas de produccion
  private readonly ORDER = ['Corte', 'Bordado', 'Termofijado', 'Estampado', 'Guarnicion', 'Solador', 'Emplantillado'];
  //Variable para manejar la asignacion o reasignacion de tarea
  dataAssignedTask: AsignedTaskDTO = {
    task_detail_id: 0,
    responsable_document: 0,
  };
  // Variable para almacenar la accion que desea realizar aprobar o rechazar
  currentAction: string = '';

  constructor(
    private tasksSharedService: TasksSharedService,
    private router: Router,
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    //Carga inicial de EP's
    this.configManageTask = this.tasksSharedService.getTaskManage();
    if (this.configManageTask?.taskId) {
      this.loadDetailTasksByTask(this.configManageTask?.taskId);
    }
    this.updateLastState();
    const context = localStorage.getItem('lastContext');
    const fromParent = localStorage.getItem('fromParentCreate');

    if (fromParent) {
      // Llegó desde el componente padre (crear pedido)
      localStorage.removeItem('fromParentCreate');
      return;
    }
    // Si recarga directamente o entra por URL manual
    if (localStorage.getItem('lastContext')) {
      const fallback = this.getFallbackRoute(context);
    } else {
      this.router.navigate(['/pedidos-tareas']);
    }
  }

  //Devuelve la ruta a donde debe ir si se recarga o entra manualmente
  getFallbackRoute(context: string | null): string[] {
    switch (context) {
      case '':
        localStorage.removeItem('lastContext');
        return ['/pedidos-tareas'];
      default:
        localStorage.removeItem('lastContext');
        return ['/'];
    }
  }

  //Acción de volver manualmente
  onBackAction(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // Traer el estado de la ultima linea de produccion activa
  updateLastState(): void {
    if (this.detailTasksByTask && this.detailTasksByTask.length > 0) {
      const lastValid = [...this.detailTasksByTask]
        .reverse()
        .find((item) => item.productionLine && (item.state !== null || item.started_at !== null || item.responsable !== null));

      if (lastValid) {
        this.lastState = {
          productionLine: lastValid.productionLine,
          lastState: lastValid.state ?? null,
        };
        return;
      }
    }

    // Si no hay ninguna línea con datos válidos
    this.lastState = {
      productionLine: null,
      lastState: null,
    };
  }

  // Logica para organizar los estados en clases validad para CSS
  getStateClass(state: string | number | null | undefined): string {
    if (state === null || state === undefined) return '';
    return state
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_')
      .toLowerCase();
  }

  // Logica para resaltar la fila de la etapa de produccion activa
  shouldHighlightRow(item: any): boolean {
    const normalize = (str: any): string =>
      (str ?? '')
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // elimina tildes
        .replace(/\s+/g, '_') // reemplaza espacios por guion bajo
        .toLowerCase(); // pasa todo a minúsculas

    const lastProdLine = normalize(this.lastState?.productionLine);
    const lastState = normalize(this.lastState?.lastState);
    const itemProdLine = normalize(item.productionLine);

    // Si ambos son null
    if (!lastProdLine && !lastState) return false;

    // Solo aplica a la fila que coincide con la línea del lastState
    const isSameLine = itemProdLine === lastProdLine;

    // No resalta si toda la tarea fue finalizada
    const isForbiddenCombo = (lastProdLine === 'emplantillado' && lastState === 'finalizado') || (!lastProdLine && !lastState);

    return isSameLine && !isForbiddenCombo;
  }

  // Lofica para manejar las acciones necesarias en base al estado de la linea de producccion actual
  logicActionsProductionLine(): string {
    const normalize = (str: any): string =>
      (str ?? '')
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // elimina tildes
        .replace(/\s+/g, '_') // reemplaza espacios por guion bajo
        .toLowerCase(); // pasa todo a minúsculas

    const lastProdLine = normalize(this.lastState?.productionLine);
    const lastState = normalize(this.lastState?.lastState);

    if ((!lastProdLine && !lastState) || (lastProdLine != 'emplantillado' && lastState === 'finalizado')) {
      return 'asignar';
    }
    if (lastProdLine && lastState === 'nuevo') {
      return 'reasignar';
    }
    if (lastProdLine && lastState === 'en_revision') {
      return 'revisar';
    }
    return 'sin_acciones';
  }

  // Logica de formulario
  // abrir modal de creacion y poblar selects
  onFormModal(option: string) {
    // Determinar línea de producción a usar
    let targetLine: string | null = null;

    // Obtener solo las líneas válidas (que existen en detailTasksByTask)
    const validLines = this.detailTasksByTask.map((t) => t.productionLine).filter((line) => !!line && this.ORDER.includes(line));

    if (option === 'reasignar') {
      // Si es reasignar, usar la misma línea actual
      targetLine = this.lastState?.productionLine ?? null;
    } else if (option === 'asignar') {
      const currentLine = this.lastState?.productionLine ?? null;

      if (!currentLine) {
        // Si no hay línea previa, empezar en la primera válida (usualmente Corte)
        targetLine = validLines[0] ?? 'Corte';
      } else {
        // Buscar índice actual dentro de ORDER
        const currentIndex = this.ORDER.indexOf(currentLine);
        if (currentIndex !== -1) {
          // Buscar la siguiente línea válida que aparezca después de la actual
          const nextValidLine = validLines.find((line) => this.ORDER.indexOf(line) > currentIndex);
          targetLine = nextValidLine ?? currentLine;
        } else {
          targetLine = validLines[0] ?? 'Corte';
        }
      }
    }

    // Normalizar nombre para evitar tildes/espacios
    const normalizedLine = targetLine
      ? targetLine
          .toString()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\s+/g, '_')
          .toLowerCase()
      : null;

    // Ejecutar EP's de consulta
    if (normalizedLine) {
      this.loadOperatorsByProductionLine(this.getStateClass(normalizedLine));
    }

    // Lógica para usuarios
    const optionsUser = this.dataUserByProductionLine.map((c) => c.name);

    // Asignar opciones en el modal
    this.formModalConfig.inputsConfig.find((i) => i.key === 'operator')!.options = optionsUser;

    // Configurar título del modal
    this.formModalConfig.title = option === 'asignar' ? 'Asignar Tarea y Avanzar' : 'Reasignar Tarea';

    // Mostrar modal
    this.showFormModal = true;
  }

  //Validar errores de los campos con el boton
  validateErrors(values: { [key: string]: string }) {
    //eliminar error general si existe
    if (this.formModalConfig.error) {
      this.formModalConfig.error = undefined;
    }

    // Almacenar data de forma dinamica
    this.setDataForm = {
      ...this.setDataForm,
      ...values,
    };

    // Limpiar errores
    this.cleanErrors();

    // Validar obligarotio
    this.formModalConfig.inputsConfig.forEach((i) => {
      if (i.obligatory) {
        const value = this.setDataForm[i.key];
        if (!value) {
          i.error = 'Este campo es obligatorio';
        }
      }
    });

    // Validar si hay errores internos
    this.formModalConfig.inputsConfig.forEach((i) => {
      if (i.error) {
        this.numErrors++;
      }
    });

    //validar si hay error global
    if (this.formModalConfig.error) {
      this.numErrors++;
    }

    // Ejecutar EP de asignacion
    if (this.numErrors === 0) {
      const selectedUser = this.dataUserByProductionLine.find((i) => i.name === values['operator']);

      this.dataAssignedTask.responsable_document = selectedUser?.document ?? 0;
      this.dataAssignedTask.task_detail_id = this.configManageTask?.taskId ?? 0;
      this.assignedTask();
    }
  }

  // Limpiar los errores
  cleanErrors() {
    this.numErrors = 0;
    this.formModalConfig.inputsConfig.forEach((i) => {
      i.error = '';
    });
  }

  // Logica para cambios en selects
  onOptionSelected(change: { key: string; value: string }) {
    // Eliminacion de errores globales si hay cambios
    if (this.formModalConfig.error) {
      this.formModalConfig.error = undefined;
    }

    this.setDataForm[change.key] = change.value;
    this.cleanErrors();
  }

  // Cerrar el modal del formulario
  closeFormModal() {
    this.showFormModal = false;
    this.cleanErrors();
    this.setDataForm = {};
    this.formModalConfig.error = undefined;
  }
  // Fin de logica dd formulario de creacion

  // Inicio Logica del modal de alerta
  onAlertModal(action: string) {
    this.showAlertModal = true;
    this.alertModalConfig.error = '';
    this.currentAction = action;
    if (action === 'Aprobar') {
      this.alertModalConfig.title = '¿Desea aprobar está tarea?';
      this.alertModalConfig.text = 'Si se aprueba la tarea, esta se finalizará y podrá avanzar a la siguiente línea de producción.';
    } else if (action === 'Rechazar') {
      this.alertModalConfig.title = '¿Desea rechazar está tarea?';
      this.alertModalConfig.text = 'Si se rechaza la tarea, pasará a En corrección y deberá ser ajustada antes de volver a En revisión.';
    }
  }

  reviewAction() {
    if (this.currentAction === 'Aprobar') {
      this.nextStateTask();
    } else if (this.currentAction === 'Rechazar') {
      this.rejectTask();
    }
  }

  // cerrar el modal de alerta
  closeAlertModal() {
    this.showAlertModal = false;
    this.currentAction = '';
  }

  // Fin Logica del modal de alerta

  // Consulta de EP's
  // Get Orders
  loadDetailTasksByTask(task_id: number) {
    this.tasksService.getTaskDetail(task_id).subscribe({
      next: (res) => {
        this.detailTasksByTask = res;
      },
      error: (err) => {
        this.detailTasksByTask = [];
      },
    });
  }

  // Get Operators
  loadOperatorsByProductionLine(productionLine: string) {
    this.usersService
      .getUsersByProductionLine(productionLine)
      .pipe(
        map((response) =>
          response.map((u) => ({
            name: `${u.name} ${u.lastname}`,
            document: u.document,
          })),
        ),
      )
      .subscribe({
        next: (res) => {
          this.dataUserByProductionLine = res;
        },
        error: (err) => {
          this.dataUserByProductionLine = [];
        },
      });
  }

  // Asignar Tarea
  assignedTask() {
    const dataAssignedTask: AsignedTask = {
      task_detail_id: this.dataAssignedTask.task_detail_id,
      responsable_document: this.dataAssignedTask.responsable_document,
    };

    this.tasksService.postAsignedTask(dataAssignedTask).subscribe({
      next: (res) => {
        this.closeFormModal();
        if (this.configManageTask?.taskId) {
          this.loadDetailTasksByTask(this.configManageTask?.taskId);
        }
      },
      error: (err) => {
        this.formModalConfig.error = 'No se pudo realizar la asignación, intentelo nuevamente.';
      },
    });
  }

  // Asignar Tarea
  rejectTask() {
    const dataRejectTask: RejectTask = {
      task_detail_id: this.configManageTask?.taskId ?? 0,
    };

    this.tasksService.postRejectTask(dataRejectTask).subscribe({
      next: (res) => {
        this.closeAlertModal();
        if (this.configManageTask?.taskId) {
          this.loadDetailTasksByTask(this.configManageTask?.taskId);
        }
      },
      error: (err) => {
        this.alertModalConfig.error = 'No se pudo realizar el rechazo, intentelo nuevamente.';
      },
    });
  }

  // Asignar Tarea
  nextStateTask() {
    const dataNextStateTask: NextStateTask = {
      task_detail_id: this.configManageTask?.taskId ?? 0,
    };

    this.tasksService.postNextStateTask(dataNextStateTask).subscribe({
      next: (res) => {
        this.closeAlertModal();
        if (this.configManageTask?.taskId) {
          this.loadDetailTasksByTask(this.configManageTask?.taskId);
        }
      },
      error: (err) => {
        this.alertModalConfig.error = 'No se pudo realizar la aprobacíon, intentelo nuevamente.';
      },
    });
  }
}
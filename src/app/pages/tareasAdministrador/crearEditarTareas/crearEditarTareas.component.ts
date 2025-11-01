import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksSharedService } from '../../../services/tasksShared.service';
import { TaskDTO, TasksArticlesDTO, TasksDetailDTO } from '../crearEditarTareas/crearEditarTareas.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { FormModalComponent } from '../../../shared/formModal/formModal.component';
import { FORMULARIO_CREACION_MODAL, TABLA_TAREAS, ALERTA_MODAL } from './crearEditarTareas.config';
import { AlertModalComponent } from '../../../shared/alertModal/alertModal.component';

@Component({
  selector: 'app-crear-editar-tareas-page',
  standalone: true,
  imports: [CommonModule, FormModalComponent, FormsModule, AlertModalComponent],
  templateUrl: './crearEditarTareas.component.html',
  styleUrls: ['./crearEditarTareas.component.scss'],
})
export class CrearEditarTareasComponent implements OnInit, AfterViewChecked {
  // Variable para manejar las tareas a crear o editar
  configTask: TaskDTO | null = null;
  tasks: TasksArticlesDTO[] = [];

  //Manejo de configuraciones de entrada para el modal del formulario
  formModalConfig = structuredClone(FORMULARIO_CREACION_MODAL);
  showFormModal: boolean = false;

  // manejo de configuraciones iniciales para la tabla de tareas
  tableConfig = structuredClone(TABLA_TAREAS);

  // contador de errores
  numErrors: number = 0;

  // contar ids de tareas
  taskIdCounter: number = 1;

  totalAmount: number = 0;

  //Variable para manejar los errores de validacion
  taskErrors = {
    amount_error: '',
  };

  // Variable para almacenar el articulo que se quiere eliminar
  taskToDelete: number | null = null;

  // manejo de configuraciones de entrada para el modal de alerta
  alertModalConfig = structuredClone(ALERTA_MODAL);
  showAlertModal: boolean = false;

  //variable para manejar error general
  generalError = '';
  //Variables para scroll automatico al error
  private hasScrolled = false;

  // contador de errores
  numErrorsTable: number = 0;

  constructor(
    private readonly tasksSharedService: TasksSharedService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.showFormModal = false;
    this.configTask = this.tasksSharedService.getTaskInfo();

    if (this.configTask) {
      const foundDetail = this.configTask?.tasksDetailDTO?.find((detail) => detail.articleId === this.configTask?.articleTaskDTO?.articleId);
      this.tasks = foundDetail ? foundDetail.tasksArticlesDTO.slice() : [];
      this.totalAmount = this.tasks.reduce((sum, task) => sum + (task.amount || 0), 0);
    }

    const context = localStorage.getItem('lastContext');
    const fromParent = localStorage.getItem('fromParentCreate');

    if (fromParent) {
      // Llegó desde el componente padre (crear pedido)
      localStorage.removeItem('fromParentCreate');
      return;
    }
    // Si recarga directamente o entra por URL manual
    if (context) {
      this.router.navigateByUrl(this.getFallbackRoute(context));
    } else {
      this.router.navigateByUrl('/');
    }
  }

  //Devuelve la ruta a donde debe ir si se recarga o entra manualmente
  getFallbackRoute(context: string | null): string {
    if (context === 'ORDERGERENTADMIN') {
      localStorage.removeItem('lastContext');
      return '/pedidos-tareas';
    }
    localStorage.removeItem('lastContext');
    return '/';
  }

  //Acción de volver manualmente
  onBackAction(): void {
    // Volvemos un nivel arriba (crear pedido)
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // Logica para cuando se genere un error global lo lleve al mensaje
  @ViewChild('errorDiv') errorDiv!: ElementRef;
  ngAfterViewChecked() {
    if (this.generalError && this.errorDiv && !this.hasScrolled) {
      this.errorDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.hasScrolled = true;
    }
    // Resetear cuando desaparece el error
    if (!this.generalError) {
      this.hasScrolled = false;
    }
  }

  // Logica de formulario
  // abrir modal de creacion y poblar selects
  onFormModal() {
    this.clearErrorsTask();
    this.totalAmount = this.tasks.reduce((sum, task) => sum + (task.amount || 0), 0);
    if (!this.configTask?.articleTaskDTO) return;
    const maxValue = this.configTask.articleTaskDTO.amount;

    // Validar si se excede el total permitido
    if (this.totalAmount >= maxValue) {
      this.generalError =
        'No es posible agregar más tareas, ya que la cantidad total ya alcanza el máximo permitido para el artículo. Para añadir nuevas tareas, modifique o elimine las existentes.';
    } else {
      // Poner la referencia
      this.formModalConfig.text = `Referencia: ${this.configTask?.articleTaskDTO.ref_design}`;
      //ejecutar el modal
      this.showFormModal = true;
    }
  }

  // Validar errores de los campos con el botón
  validateErrors(values: { [key: string]: string }) {
    // Reiniciar contador de errores
    this.numErrors = 0;

    // Limpiar errores
    this.cleanErrors();

    // Validar campos obligatorios
    for (const i of this.formModalConfig.inputsConfig) {
      const value = values[i.key];
      if (i.obligatory && !value) {
        i.error = 'Este campo es obligatorio';
        this.numErrors++;
      }
    }

    // Validar reglas de negocio
    this.validateErrorBusinessLogic(values);

    // Contar errores internos
    for (const i of this.formModalConfig.inputsConfig) {
      if (i.error) this.numErrors++;
    }

    // Validar error global
    if (this.formModalConfig.error) this.numErrors++;

    // Si no hay errores, crear la nueva tarea
    if (this.numErrors === 0) {
      const amountValue = Number(values['amount']);

      if (!Number.isNaN(amountValue) && amountValue > 0) {
        // Crear nueva tarea
        const newTask: TasksArticlesDTO = {
          taskId: this.taskIdCounter,
          amount: amountValue,
        };

        // Agregar al arreglo
        this.tasks.push(newTask);

        this.totalAmount = this.tasks.reduce((sum, task) => sum + (task.amount || 0), 0);
        // Incrementar contador para la siguiente tarea
        this.taskIdCounter++;

        this.closeFormModal();
      }
    }
  }

  // Limpiar los errores
  cleanErrors() {
    this.numErrors = 0;
    for (const i of this.formModalConfig.inputsConfig) {
      i.error = '';
    }
  }

  // Validar dinámicamente los errores de lógica de negocio
  validateField({ key, value }: { key: string; value: string }) {
    // Limpia errores previos
    this.cleanErrors();
    // Sumar totalAmount para el articulo
    this.totalAmount = this.tasks.reduce((sum, task) => sum + (task.amount || 0), 0);
    // Valida la lógica de negocio usando solo el campo modificado
    this.validateErrorBusinessLogic({ [key]: value });
  }

  // Errores de Logica de negocio
  validateErrorBusinessLogic(values: { [key: string]: string }) {
    for (const [key, value] of Object.entries(values)) {
      const input = this.formModalConfig.inputsConfig.find((i) => i.key === key);

      if (!input) {
        return;
      }

      if (key === 'amount') {
        if (!this.configTask?.articleTaskDTO) return;
        const maxValue = this.configTask.articleTaskDTO.amount - this.totalAmount;
        const inputValue = Number(value);

        if (inputValue > maxValue || inputValue < 1) {
          input.error = `Debe ingresar una cantidad entre 1 y ${maxValue}.`;
        }
      }
    }
  }

  // Cerrar el modal del formulario
  closeFormModal() {
    this.showFormModal = false;
    this.cleanErrors();
  }
  // Fin de logica dd formulario de creacion

  // Logica para cambios en inputs de cantidad
  // Manejar el cambio en el input de cantidad
  onAmountChange(value: string, item: TasksArticlesDTO) {
    this.clearErrorsTask();
    const newValue = Number(value);

    if (Number.isNaN(newValue) || newValue < 1) {
      this.taskErrors.amount_error = 'Debe ingresar una cantidad válida.';
      return;
    }

    item.amount = newValue;
    this.totalAmount = this.tasks.reduce((sum, task) => sum + (task.amount || 0), 0);

    if (!this.configTask?.articleTaskDTO) return;

    const maxValue = this.configTask.articleTaskDTO.amount;

    // Validar si se excede el total permitido
    if (this.totalAmount > maxValue) {
      this.taskErrors.amount_error = `La suma total (${this.totalAmount}) supera el máximo permitido (${maxValue}).`;
    } else {
      this.taskErrors.amount_error = '';
    }
  }

  // Permite solo números y teclas de control como Backspace, Delete, Arrow Keys
  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedKeys = ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace', 'Tab'];

    const isCtrlV = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v';
    if (isCtrlV) return;

    if (!/\d/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onAlertModal(item: TasksArticlesDTO) {
    // Guardar la tarea que se quiere eliminar
    this.taskToDelete = item.taskId;
    this.showAlertModal = true;
    this.alertModalConfig.title = '¿Desea eliminar está tarea?';
    this.alertModalConfig.text =
      'Si elimina esta tarea, podrá crear una nueva o ajustar las cantidades de las tareas existentes para completar el total de pares del artículo.';
  }

  // Eliminar articulo
  deleteTask() {
    this.clearErrorsTask();
    if (this.taskToDelete !== null) {
      const index = this.tasks.findIndex((task) => task.taskId === this.taskToDelete);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        // Recalcular total después de eliminar
        this.totalAmount = this.tasks.reduce((sum, t) => sum + (t.amount || 0), 0);
      }
      this.taskToDelete = null;
      this.closeAlertModal();
    }
  }

  // cerrar el modal de alerta
  closeAlertModal() {
    this.showAlertModal = false;
  }

  // Limpiar errores de las tareas
  clearErrorsTask() {
    this.generalError = '';
    this.numErrorsTable = 0;
  }

  //Logica para enviar tareas al padre
  onSendTasks() {
    this.clearErrorsTask();
    this.totalAmount = this.tasks.reduce((sum, task) => sum + (task.amount || 0), 0);
    if (!this.configTask?.articleTaskDTO) return;
    const maxValue = this.configTask.articleTaskDTO.amount;

    // Validar si es menor a la cantidad total necesaria
    if (this.totalAmount < maxValue) {
      this.generalError =
        'No es posible continuar, ya que la cantidad total de pares asignados en las tareas no coincide con la cantidad requerida para el artículo.';
    }

    // Validar si hay errores
    if (this.generalError || this.taskErrors.amount_error) {
      this.numErrorsTable++;
    }

    // Devolver tareas al padre
    if (this.numErrorsTable === 0) {
      const dataTask: TasksDetailDTO = {
        articleId: this.configTask.articleTaskDTO.articleId,
        tasksArticlesDTO: this.tasks,
      };
      this.tasksSharedService.sendTaskResponse(dataTask);
      this.onBackAction();
    }
  }
}

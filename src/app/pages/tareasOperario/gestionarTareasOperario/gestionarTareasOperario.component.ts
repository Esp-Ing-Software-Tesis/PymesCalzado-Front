import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ManageTaskOperatorDTO } from './gestionarTareasOperario.interface';
import { TasksSharedService } from '../../../services/tasksShared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from '../../../services/tareas.service';
import { ALERTA_MODAL } from './gestionarTareasOperario.config';
import { AlertModalComponent } from '../../../shared/alertModal/alertModal.component';
import { NextStateTask } from '../../../models/tareas.model';

@Component({
  selector: 'app-gestionar-tareas-operario-page',
  standalone: true,
  imports: [CommonModule, AlertModalComponent],
  templateUrl: './gestionarTareasOperario.component.html',
  styleUrls: ['./gestionarTareasOperario.component.scss'],
})
export class GestionarTareasOperarioPageComponent {
  // Variable para manejar los datos enviados desde el padre
  configManageTask: ManageTaskOperatorDTO | null = null;
  // manejo de configuraciones de entrada para el modal de alerta
  alertModalConfig = structuredClone(ALERTA_MODAL);
  showAlertModal: boolean = false;

  constructor(
    private tasksSharedService: TasksSharedService,
    private router: Router,
    private route: ActivatedRoute,
    private tasksService: TasksService,
  ) {}

  ngOnInit(): void {
    //Carga inicial de EP's
    this.configManageTask = this.tasksSharedService.getTaskManageOperator();
    const context = localStorage.getItem('lastContext');
    const fromParent = localStorage.getItem('fromParentCreate');

    if (fromParent) {
      // Llegó desde el componente padre (crear pedido)
      localStorage.removeItem('fromParentCreate');
      return;
    }
    // Si recarga directamente o entra por URL manual
    if (context) {
      const fallback = this.getFallbackRoute(context);
      this.router.navigate(fallback);
    } else {
      this.router.navigate(['/']);
    }
  }

  //Devuelve la ruta a donde debe ir si se recarga o entra manualmente
  getFallbackRoute(context: string | null): string[] {
    switch (context) {
      case 'TASKOPERATOR':
        localStorage.removeItem('lastContext');
        return ['/tareas'];
      default:
        localStorage.removeItem('lastContext');
        return ['/'];
    }
  }

  //Acción de volver manualmente
  onBackAction(): void {
    // Volvemos un nivel arriba (crear pedido)
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // Logica para manejar los textos de los estados
  getTextState(state?: string | null): string {
    if (!state) return '';
    // Limpiar tildes, reemplazar espacios y volver todo en minuscula
    return state
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_')
      .toLowerCase();
  }

  // Inicio Logica del modal de alerta
  onAlertModal() {
    this.showAlertModal = true;
    this.alertModalConfig.error = '';
    this.alertModalConfig.title = '¿Desea avanzar esta tarea al siguiente estado?';
    this.alertModalConfig.text =
      'Al confirmar esta acción, la tarea cambiará al siguiente estado del flujo. Tenga en cuenta que no será posible volver al estado anterior una vez se realiza esta acción.';
  }

  // traer el siguiente estado
  nextState(state: string) {
    switch (state) {
      case 'nuevo':
        return 'En progreso';
      case 'en_progreso':
        return 'En revisión';
      case 'en_correccion':
        return 'En revisión';
      case 'en_revision':
        return 'Finalizado';
      default:
        return null;
    }
  }

  // cerrar el modal de alerta
  closeAlertModal() {
    this.showAlertModal = false;
  }

  // avanzar al siguiente estado
  nextStateTask() {
    const dataNextStateTask: NextStateTask = {
      task_detail_id: this.configManageTask?.taskId ?? 0,
    };

    this.tasksService.postNextStateTask(dataNextStateTask).subscribe({
      next: (res) => {
        this.closeAlertModal();
        this.onBackAction();
      },
      error: (err) => {
        this.alertModalConfig.error = 'No se pudo realizar el cambio de estado, intentelo nuevamente.';
      },
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { TablaGeneralComponent } from '../../shared/tablaGeneral/tablaGeneral.component';
import { SinInformacionComponent } from '../../shared/sinInformacion/sinInformacion.component';
import { TABLA_GENERAL, INFO_MANAGE_TASKS } from './tareasOperario.config';
import { OperatorTasksDTO } from './tareasOperario.interface';
import { ValueChangedEvent } from '../../shared/tablaGeneral/tablaGeneral.interface';
import { ManageTaskOperatorDTO } from './gestionarTareasOperario/gestionarTareasOperario.interface';
import { TasksSharedService } from '../../services/tasksShared.service';
import { TasksService } from '../../services/tareas.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-tareas-operario-page',
  standalone: true,
  imports: [CommonModule, TablaGeneralComponent, SinInformacionComponent, RouterOutlet],
  templateUrl: './tareasOperario.component.html',
  styleUrls: ['./tareasOperario.component.scss'],
})
export class TareasOperarioPageComponent implements OnInit {
  // Variable para manejar las tareas del operario
  taskByOperator: OperatorTasksDTO[] = [];
  // manejo de configuraciones iniciales para la tabla general
  tableGeneralConfig = structuredClone(TABLA_GENERAL);
  // manejo de configuraciones iniciales para el hijo de gestionar tareas
  manageTaskConfig = structuredClone(INFO_MANAGE_TASKS);
  //Varible para manejar visualizacion de hijos
  viewPageChildren = false;
  // Variable para manejar los datos enviados desde el padre
  configShowTask: ManageTaskOperatorDTO | null = null;
  // Variables para el manejo de select personalizado
  openState = false;
  // Variable para almacenar las opciones de datos que se puedan filtrar
  optionsState = ['Nuevo', 'En Progreso', 'En Revisión', 'En Corrección', 'Finalizado'];
  optionSelect = '';
  isSearch: boolean = false;
  // Variable para manejar los datos filtrados
  taskByOperatorFilters: OperatorTasksDTO[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
    private readonly tasksSharedService: TasksSharedService,
    private readonly tasksService: TasksService,
  ) {}

  //Poblar data inicial en la tabla
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const url = this.router.url;

      // Oculta la tabla principal si esta en cualquier hijo
      this.viewPageChildren = /(gestionar-tareas-operario)/.test(url);
      this.cdr.detectChanges();
    });

    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.loadTasksByOperator(Number(userId));
      this.taskByOperatorFilters = this.taskByOperator;
    }
  }

  // Recibe el item del que se quiere consultar el detalle
  getTaskByOperator(event: ValueChangedEvent<OperatorTasksDTO>) {
    if (event.context === 'TASKOPERATOR') {
      if (event.key === 'showDetails') {
        const getTaskItem = this.taskByOperator.find((u) => u.task_id === event.item.task_id);
        if (getTaskItem) {
          this.openManagePageOperator(getTaskItem);
        }
      }
    }
  }
  // abrir pantalla de detalle
  openManagePageOperator(item: OperatorTasksDTO) {
    // guardar datos del articulo y tarea
    this.manageTaskConfig.taskId = item.task_id;

    this.manageTaskConfig.articleTaskDTO = {
      ref_design: item.ref_design,
      amount: item.amount,
      name_color: item.color_name,
      cod_size: item.size_id,
      state: item.state,
    };

    //Guardar en el local storage la pantalla actual
    localStorage.setItem('lastContext', this.manageTaskConfig.context);
    localStorage.setItem('fromParentCreate', '1');
    // Enviar la configuración al servicio
    this.tasksSharedService.setTaskInfoManageOperator(this.manageTaskConfig);
    this.router.navigate(['gestionar-tareas-operario'], {
      relativeTo: this.route,
      state: { fromParent: true },
    });
  }

  // Logica filter
  toggleState() {
    this.openState = !this.openState;
  }

  // Seleccionar opción y guardar valor
  onSelectOption(option: string) {
    this.optionSelect = option;
    this.openState = false; // cerrar menú al seleccionar
  }

  // Cerrar si se hace clic fuera del select
  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select-container')) {
      this.openState = false;
    }
  }

  // Logica para manejar los textos de los estados
  getTextState(state?: string): string {
    if (!state) return '';
    // Limpiar tildes, reemplazar espacios y volver todo en minuscula
    return state
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_')
      .toLowerCase();
  }

  // Buscar las tareas con el estado seleccionado
  searchByFilters() {
    if (!this.optionSelect) {
      this.taskByOperatorFilters = [...this.taskByOperator];
      return;
    }

    this.taskByOperatorFilters = this.taskByOperator.filter((task) => this.getTextState(task.state) === this.getTextState(this.optionSelect));
    this.isSearch = true;
  }

  // Limpiar filtros
  clearFilters() {
    this.optionSelect = '';
    this.taskByOperatorFilters = [...this.taskByOperator];
    this.isSearch = false;
  }
  // Consulta de EP's
  // Get Orders
  loadTasksByOperator(userId: number) {
    this.tasksService
      .getTasksByOperator(userId)
      .pipe(
        map((response) =>
          response
            .map((u) => ({
              task_id: u.id,
              ref_design: u.referencia_zapato,
              amount: u.cantidad,
              color_name: u.color.nombre,
              size_id: u.talla_id,
              asigned_at: u.asigned_at,
              started_at: u.started_at,
              finished_at: u.finished_at,
              state: u.estado,
            }))
            .sort((a, b) => new Date(b.asigned_at).getTime() - new Date(a.asigned_at).getTime()),
        ),
      )
      .subscribe({
        next: (res) => {
          this.taskByOperator = res;
        },
        error: (err) => {
          this.taskByOperator = [];
        },
      });
  }
}

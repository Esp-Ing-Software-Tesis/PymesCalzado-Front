import { TablaGeneralComponent } from './../../../shared/tablaGeneral/tablaGeneral.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskShowDatilDTO, TasksDetailByArticleDTO } from './verTareas.interface';
import { TasksSharedService } from '../../../services/tasksShared.service';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { TasksService } from '../../../services/tareas.service';
import { TABLA_GENERAL, INFO_MANAGE_TASKS } from './verTareas.config';
import { ValueChangedEvent } from '../../../shared/tablaGeneral/tablaGeneral.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-ver-tareas-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TablaGeneralComponent],
  templateUrl: './verTareas.component.html',
  styleUrls: ['./verTareas.component.scss'],
})
export class VerTareasPageComponent implements OnInit {
  // Variable para manejar los datos enviados desde el padre
  configShowTask: TaskShowDatilDTO | null = null;
  //Varible para manejar visualizacion de hijos
  viewPageChildren = false;
  // Variable para almacenar las tareas para el articulo
  tasksByArticle: TasksDetailByArticleDTO[] = [];
  // manejo de configuraciones iniciales para la tabla general
  tableGeneralConfig = structuredClone(TABLA_GENERAL);
  // manejo de configuraciones iniciales para el hijo de gestionar tareas
  manageTaskConfig = structuredClone(INFO_MANAGE_TASKS);

  constructor(
    private readonly tasksSharedService: TasksSharedService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly tasksService: TasksService,
  ) {}

  ngOnInit(): void {
    this.configShowTask = this.tasksSharedService.getTaskInfoShowDetail();

    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.viewPageChildren = url.includes('/gestionar-tareas');
    });

    if (this.configShowTask?.articleTaskDTO.articleId) {
      // Ejecutar el EP para cargar las tareas
      this.loadTasksByArticle(this.configShowTask?.articleTaskDTO.articleId);
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
      const fallback = this.getFallbackRoute(context);
      this.router.navigate(fallback);
    } else {
      this.router.navigate(['/']);
    }
  }

  //Devuelve la ruta a donde debe ir si se recarga o entra manualmente
  getFallbackRoute(context: string | null): string[] {
    switch (context) {
      case 'ORDERGERENTADMIN':
        localStorage.removeItem('lastContext');
        return ['/pedidos-tareas'];
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

  // Recibe el item del que se quiere consultar el detalle
  getArticleOrder(event: ValueChangedEvent<TasksDetailByArticleDTO>) {
    if (event.context === 'ORDERGERENTADMIN-SHOW-TASKS') {
      if (event.key === 'showDetails') {
        const getShoeItem = this.tasksByArticle.find((u) => u.taskId === event.item.taskId);
        if (getShoeItem) {
          this.openManagePage(getShoeItem.taskId);
        }
      }
    }
  }

  // abrir pantalla de detalle
  openManagePage(id: number) {
    // guardar datos del articulo y tarea
    this.manageTaskConfig.taskId = id;
    //guardar datos del articulo
    const article = this.configShowTask?.articleTaskDTO;
    if (!article) return;

    this.manageTaskConfig.articleTaskDTO = {
      articleId: article.articleId,
      ref_design: article.ref_design,
      amount: article.amount,
      name_color: article.name_color,
      cod_size: article.cod_size,
    };

    //Guardar en el local storage la pantalla actual
    localStorage.setItem('lastContext', this.manageTaskConfig.context);
    localStorage.setItem('fromParentCreate', '1');
    // Enviar la configuración al servicio
    this.tasksSharedService.setTaskInfoManage(this.manageTaskConfig);
    this.router.navigate(['gestionar-tareas'], {
      relativeTo: this.route,
      state: { fromParent: true },
    });
  }

  // Consulta de EP's
  // Get Orders
  loadTasksByArticle(articleId: number) {
    this.tasksService
      .getTaskDetailArticles(articleId)
      .pipe(
        map((response) =>
          response
            .map((u) => ({
              taskId: u.taskId,
              amount: u.amount,
              stateProductionLine: u.stateProductionLine,
              created_at: u.created_at,
              updated_at: u.updated_at,
              started_at: u.started_at,
              finished_at: u.finished_at,
            }))
            .sort((a, b) => a.taskId - b.taskId),
        ),
      )
      .subscribe({
        next: (res) => {
          this.tasksByArticle = res;
        },
        error: (err) => {
          this.tasksByArticle = [];
        },
      });
  }
}

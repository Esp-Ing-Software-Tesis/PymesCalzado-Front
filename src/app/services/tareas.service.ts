import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  TaskDetailArticlesMock,
  TaskDetailArticles,
  TaskDetailsMock,
  CreateTasks,
  AsignedTask,
  RejectTask,
  NextStateTask,
  TasksByOperator,
  OperatorTasks,
  TaskProductionLine,
} from '../models/tareas.model';
import { TaskDetailInfoDTO, TaskProductionLineDTO } from '../pages/tareasAdministrador/verTareas/gestionarTareasAdmin/gestionarTareasAdmin.interface';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor() {}

  private readonly ORDER = ['Corte', 'Bordado', 'Termofijado', 'Estampado', 'Guarnicion', 'Solador', 'Emplantillado'];

  // Servicio Tareas por artículo en un pedido
  getTaskDetailArticles(articleId: number): Observable<TaskDetailArticles[]> {
    const taskDetailArticlesMock: TaskDetailArticlesMock[] = this.setMockTaskDetailArticlesOptions();
    const articleTasks = taskDetailArticlesMock.find((task) => task.articleId === articleId);
    if (!articleTasks) {
      // Simular error
      // return throwError(() => new Error('No se pudieron cargar las tareas del artículo.'));
      return of([]);
    }
    return of(articleTasks.taskDetailArticles);
  }

  // Servicio Detalle de tareas (versión adaptada)
  getTaskDetail(taskId: number): Observable<TaskDetailInfoDTO[]> {
    const taskDetailMock = this.setMockTaskDetailOptions();
    const taskFound = taskDetailMock.find((task) => task.task_id === taskId);
    if (!taskFound) return of([]);

    // Extraemos la primera capa (LineasProduccion)
    const lineas = taskFound.LineasProduccion[0];

    // Array donde iremos guardando todos los registros planos
    const flatDetails: TaskDetailInfoDTO[] = [];

    // Recorremos en orden fijo
    this.ORDER.forEach((key) => {
      if (lineas[key]) {
        lineas[key].forEach((detail: any) => {
          flatDetails.push(this.mapToTableDTO(detail, key));
        });
      }
    });

    // Agregamos cualquier línea adicional que no esté en ORDER
    Object.keys(lineas).forEach((key) => {
      if (!this.ORDER.includes(key)) {
        lineas[key].forEach((detail: any) => {
          flatDetails.push(this.mapToTableDTO(detail, key));
        });
      }
    });

    return of(flatDetails);
  }

  // Mapeo normalizado con el nombre de la línea incluido
  private mapToTableDTO(detail: any, productionLine: string): TaskDetailInfoDTO {
    return {
      taskDetailId: detail.taskDetailId,
      productionLine: productionLine,
      responsable: detail.responsable,
      asigned_at: detail.asigned_at,
      started_at: detail.started_at,
      finished_at: detail.finished_at,
      state: detail.estado,
    };
  }

  // Servicio Creacion de tareas
  postCreateTasks(createTasks: CreateTasks): Observable<CreateTasks> {
    const nuevoTask: CreateTasks = { ...createTasks };
    /*return throwError(() => ({
    }));*/
    return of(nuevoTask);
  }

  // Servicio Asignacion de tareas
  postAsignedTask(asignedTask: AsignedTask): Observable<AsignedTask> {
    const nuevoAsignedTask: AsignedTask = { ...asignedTask };
    /*return throwError(() => ({
    }));*/
    return of(nuevoAsignedTask);
  }

  // Servicio Rechazo de tareas
  postRejectTask(rejectTask: RejectTask): Observable<RejectTask> {
    const nuevoRejectTask: RejectTask = { ...rejectTask };
    /*return throwError(() => ({
        }));*/
    return of(nuevoRejectTask);
  }

  // Servicio Pasar a siguiente estado de tarea
  postNextStateTask(nextStateTask: NextStateTask): Observable<NextStateTask> {
    const nuevoNextStateTask: NextStateTask = { ...nextStateTask };
    /*return throwError(() => ({
        }));*/
    return of(nuevoNextStateTask);
  }

  // Servicio Consultar tareas por operario
  getTasksByOperator(operatorDocument: number): Observable<OperatorTasks[]> {
    const tasksByOperatorMock: TasksByOperator[] = this.setMockTasksByOperator();

    // Busca el registro que coincide con el operador
    const operatorData = tasksByOperatorMock.find((task) => task.operator_document === operatorDocument);

    // Si existe, devuelve su listado de tareas; si no, un arreglo vacío
    const tasks = operatorData ? operatorData.tasks : [];

    return of(tasks);
  }

  // Mock de Tareas por articulo en un pedido
  private setMockTaskDetailArticlesOptions(): TaskDetailArticlesMock[] {
    const taskDetailArticles: TaskDetailArticlesMock[] = [
      {
        articleId: 221,
        taskDetailArticles: [
          {
            taskId: 1,
            amount: 10,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-01',
            updated_at: null,
            started_at: null,
            finished_at: null,
          },
          {
            taskId: 2,
            amount: 10,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-01',
            updated_at: '2025-10-03',
            started_at: '2025-10-02',
            finished_at: null,
          },
          {
            taskId: 3,
            amount: 17,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-01',
            updated_at: '2025-10-05',
            started_at: '2025-10-02',
            finished_at: '2025-10-05',
          },
        ],
      },
      {
        articleId: 222,
        taskDetailArticles: [
          {
            taskId: 4,
            amount: 12,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-03',
            updated_at: '2025-10-04',
            started_at: '2025-10-03',
            finished_at: null,
          },
          {
            taskId: 5,
            amount: 14,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-03',
            updated_at: '2025-10-06',
            started_at: '2025-10-05',
            finished_at: null,
          },
        ],
      },
      {
        articleId: 225,
        taskDetailArticles: [
          {
            taskId: 6,
            amount: 30,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-02',
            updated_at: null,
            started_at: null,
            finished_at: null,
          },
          {
            taskId: 7,
            amount: 14,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-02',
            updated_at: null,
            started_at: null,
            finished_at: null,
          },
          {
            taskId: 8,
            amount: 9,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-02',
            updated_at: null,
            started_at: null,
            finished_at: null,
          },
          {
            taskId: 9,
            amount: 20,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-02',
            updated_at: null,
            started_at: null,
            finished_at: null,
          },
        ],
      },
      {
        articleId: 219,
        taskDetailArticles: [
          {
            taskId: 10,
            amount: 6,
            stateProductionLine: 'Emplantillado',
            created_at: '2025-10-01',
            updated_at: '2025-10-03',
            started_at: '2025-10-02',
            finished_at: null,
          },
          {
            taskId: 11,
            amount: 5,
            stateProductionLine: 'Guarnicion',
            created_at: '2025-10-01',
            updated_at: '2025-10-04',
            started_at: '2025-10-03',
            finished_at: null,
          },
          {
            taskId: 12,
            amount: 9,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-01',
            updated_at: '2025-10-06',
            started_at: '2025-10-04',
            finished_at: '2025-10-06',
          },
          { taskId: 13, amount: 12, stateProductionLine: 'Nuevo', created_at: '2025-10-01', updated_at: null, started_at: null, finished_at: null },
          {
            taskId: 40,
            amount: 8,
            stateProductionLine: 'Termofijado',
            created_at: '2025-10-01',
            updated_at: '2025-10-06',
            started_at: '2025-10-05',
            finished_at: null,
          },
          {
            taskId: 41,
            amount: 7,
            stateProductionLine: 'Corte',
            created_at: '2025-10-01',
            updated_at: '2025-10-05',
            started_at: '2025-10-04',
            finished_at: null,
          },
          {
            taskId: 42,
            amount: 7,
            stateProductionLine: 'Solador',
            created_at: '2025-10-01',
            updated_at: '2025-10-04',
            started_at: '2025-10-03',
            finished_at: null,
          },
          {
            taskId: 43,
            amount: 6,
            stateProductionLine: 'Bordado',
            created_at: '2025-10-01',
            updated_at: '2025-10-04',
            started_at: '2025-10-03',
            finished_at: null,
          },
          {
            taskId: 44,
            amount: 8,
            stateProductionLine: 'Estampado',
            created_at: '2025-10-01',
            updated_at: '2025-10-04',
            started_at: '2025-10-03',
            finished_at: null,
          },
        ],
      },
      {
        articleId: 223,
        taskDetailArticles: [
          {
            taskId: 14,
            amount: 2,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-04',
            updated_at: '2025-10-07',
            started_at: '2025-10-06',
            finished_at: '2025-10-07',
          },
          {
            taskId: 15,
            amount: 3,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-04',
            updated_at: '2025-10-08',
            started_at: '2025-10-05',
            finished_at: '2025-10-08',
          },
        ],
      },
      {
        articleId: 224,
        taskDetailArticles: [
          {
            taskId: 16,
            amount: 6,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-03',
            updated_at: '2025-10-03',
            started_at: '2025-10-02',
            finished_at: null,
          },
          {
            taskId: 17,
            amount: 5,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-03',
            updated_at: '2025-10-05',
            started_at: '2025-10-04',
            finished_at: null,
          },
          {
            taskId: 18,
            amount: 5,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-03',
            updated_at: '2025-10-06',
            started_at: '2025-10-04',
            finished_at: '2025-10-06',
          },
        ],
      },
      {
        articleId: 216,
        taskDetailArticles: [
          { taskId: 19, amount: 18, stateProductionLine: 'Nuevo', created_at: '2025-10-02', updated_at: null, started_at: null, finished_at: null },
          {
            taskId: 20,
            amount: 23,
            stateProductionLine: 'Guarnicion',
            created_at: '2025-10-02',
            updated_at: '2025-10-04',
            started_at: '2025-10-03',
            finished_at: null,
          },
        ],
      },
      {
        articleId: 217,
        taskDetailArticles: [
          {
            taskId: 21,
            amount: 8,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-04',
            updated_at: '2025-10-07',
            started_at: '2025-10-06',
            finished_at: '2025-10-07',
          },
          {
            taskId: 22,
            amount: 5,
            stateProductionLine: 'Termofijado',
            created_at: '2025-10-04',
            updated_at: '2025-10-06',
            started_at: '2025-10-05',
            finished_at: null,
          },
          {
            taskId: 23,
            amount: 7,
            stateProductionLine: 'Corte',
            created_at: '2025-10-04',
            updated_at: '2025-10-05',
            started_at: '2025-10-04',
            finished_at: null,
          },
        ],
      },
      {
        articleId: 218,
        taskDetailArticles: [
          { taskId: 24, amount: 14, stateProductionLine: 'Nuevo', created_at: '2025-10-02', updated_at: null, started_at: null, finished_at: null },
          {
            taskId: 25,
            amount: 14,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-02',
            updated_at: '2025-10-05',
            started_at: '2025-10-04',
            finished_at: '2025-10-05',
          },
        ],
      },
      {
        articleId: 220,
        taskDetailArticles: [
          {
            taskId: 26,
            amount: 10,
            stateProductionLine: 'Solador',
            created_at: '2025-10-03',
            updated_at: '2025-10-04',
            started_at: '2025-10-03',
            finished_at: null,
          },
          {
            taskId: 27,
            amount: 8,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-04',
            updated_at: '2025-10-07',
            started_at: '2025-10-05',
            finished_at: '2025-10-07',
          },
          {
            taskId: 28,
            amount: 15,
            stateProductionLine: 'Emplantillado',
            created_at: '2025-10-02',
            updated_at: '2025-10-03',
            started_at: '2025-10-02',
            finished_at: null,
          },
        ],
      },
      {
        articleId: 11,
        taskDetailArticles: [
          {
            taskId: 29,
            amount: 16,
            stateProductionLine: 'Termofijado',
            created_at: '2025-10-05',
            updated_at: '2025-10-06',
            started_at: '2025-10-05',
            finished_at: null,
          },
          {
            taskId: 30,
            amount: 10,
            stateProductionLine: 'Corte',
            created_at: '2025-10-04',
            updated_at: '2025-10-05',
            started_at: '2025-10-04',
            finished_at: null,
          },
          {
            taskId: 31,
            amount: 27,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-03',
            updated_at: '2025-10-06',
            started_at: '2025-10-04',
            finished_at: '2025-10-06',
          },
        ],
      },
      {
        articleId: 12,
        taskDetailArticles: [
          { taskId: 32, amount: 13, stateProductionLine: 'Nuevo', created_at: '2025-10-03', updated_at: null, started_at: null, finished_at: null },
          {
            taskId: 33,
            amount: 24,
            stateProductionLine: 'Guarnicion',
            created_at: '2025-10-04',
            updated_at: '2025-10-05',
            started_at: '2025-10-04',
            finished_at: null,
          },
          {
            taskId: 34,
            amount: 19,
            stateProductionLine: 'Finalizado',
            created_at: '2025-10-05',
            updated_at: '2025-10-08',
            started_at: '2025-10-06',
            finished_at: '2025-10-08',
          },
          {
            taskId: 35,
            amount: 11,
            stateProductionLine: 'Solador',
            created_at: '2025-10-06',
            updated_at: '2025-10-07',
            started_at: '2025-10-06',
            finished_at: null,
          },
        ],
      },
    ];
    return taskDetailArticles;
  }

  // Mock de detalle de tareas
  private setMockTaskDetailOptions(): TaskDetailsMock[] {
    const taskDetail: TaskDetailsMock[] = [
      // --- 1: Todos en null excepto taskDetailId ---
      {
        task_id: 13,
        LineasProduccion: [
          {
            Corte: [{ taskDetailId: 1, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Guarnicion: [{ taskDetailId: 2, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Solador: [{ taskDetailId: 3, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Emplantillado: [{ taskDetailId: 4, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
          },
        ],
      },

      // --- 2: Todo en Finalizado ---
      {
        task_id: 12,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 5,
                responsable: 'Juan Pérez',
                asigned_at: '2025-10-01',
                started_at: '2025-10-02',
                finished_at: '2025-10-03',
                estado: 'Finalizado',
              },
            ],
            Guarnicion: [
              {
                taskDetailId: 6,
                responsable: 'Carlos Ruiz',
                asigned_at: '2025-10-03',
                started_at: '2025-10-04',
                finished_at: '2025-10-05',
                estado: 'Finalizado',
              },
            ],
            Solador: [
              {
                taskDetailId: 7,
                responsable: 'Luis Torres',
                asigned_at: '2025-10-05',
                started_at: '2025-10-06',
                finished_at: '2025-10-07',
                estado: 'Finalizado',
              },
            ],
            Emplantillado: [
              {
                taskDetailId: 8,
                responsable: 'Ana Gómez',
                asigned_at: '2025-10-07',
                started_at: '2025-10-08',
                finished_at: '2025-10-09',
                estado: 'Finalizado',
              },
            ],
            Termofijado: [
              {
                taskDetailId: 9,
                responsable: 'Pedro López',
                asigned_at: '2025-10-02',
                started_at: '2025-10-03',
                finished_at: '2025-10-04',
                estado: 'Finalizado',
              },
            ],
            Bordado: [
              {
                taskDetailId: 10,
                responsable: 'Laura Díaz',
                asigned_at: '2025-10-03',
                started_at: '2025-10-04',
                finished_at: '2025-10-05',
                estado: 'Finalizado',
              },
            ],
            Estampado: [
              {
                taskDetailId: 11,
                responsable: 'Miguel Rojas',
                asigned_at: '2025-10-04',
                started_at: '2025-10-05',
                finished_at: '2025-10-06',
                estado: 'Finalizado',
              },
            ],
          },
        ],
      },

      // --- 3: En progreso ---
      {
        task_id: 41,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 12,
                responsable: 'Jorge Pérez',
                asigned_at: '2025-10-02',
                started_at: '2025-10-03',
                finished_at: null,
                estado: 'Finalizado',
              },
            ],
            Guarnicion: [{ taskDetailId: 13, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Solador: [{ taskDetailId: 14, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Emplantillado: [{ taskDetailId: 15, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
          },
        ],
      },

      // --- 4: Nuevo (algunas finalizadas, una nueva) ---
      {
        task_id: 11,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 16,
                responsable: 'Sofía León',
                asigned_at: '2025-10-10',
                started_at: '2025-10-10',
                finished_at: '2025-10-11',
                estado: 'Finalizado',
              },
            ],
            Termofijado: [
              {
                taskDetailId: 17,
                responsable: 'Carlos Gómez',
                asigned_at: '2025-10-11',
                started_at: '2025-10-11',
                finished_at: '2025-10-12',
                estado: 'Finalizado',
              },
            ],
            Bordado: [
              {
                taskDetailId: 18,
                responsable: 'Laura Torres',
                asigned_at: '2025-10-12',
                started_at: '2025-10-12',
                finished_at: '2025-10-13',
                estado: 'Finalizado',
              },
            ],
            Estampado: [
              {
                taskDetailId: 19,
                responsable: 'David Rojas',
                asigned_at: '2025-10-13',
                started_at: '2025-10-13',
                finished_at: '2025-10-14',
                estado: 'Finalizado',
              },
            ],
            Guarnicion: [
              { taskDetailId: 20, responsable: 'Mariana Pérez', asigned_at: '2025-10-14', started_at: null, finished_at: null, estado: 'Nuevo' },
            ],
            Solador: [{ taskDetailId: 21, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Emplantillado: [{ taskDetailId: 22, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
          },
        ],
      },

      // --- 5: En revisión ---
      {
        task_id: 6,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 20,
                responsable: 'Andrés Mora',
                asigned_at: '2025-10-02',
                started_at: '2025-10-03',
                finished_at: null,
                estado: 'En revisión',
              },
            ],
            Guarnicion: [{ taskDetailId: 21, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Solador: [{ taskDetailId: 22, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Emplantillado: [{ taskDetailId: 23, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
          },
        ],
      },

      // --- 6: En corrección ---
      {
        task_id: 23,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 24,
                responsable: 'Felipe Castro',
                asigned_at: '2025-10-03',
                started_at: '2025-10-04',
                finished_at: null,
                estado: 'En corrección',
              },
            ],
            Guarnicion: [{ taskDetailId: 25, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Solador: [{ taskDetailId: 26, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Emplantillado: [{ taskDetailId: 27, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
          },
        ],
      },

      // --- 7: Ya en Guarnicion ---
      {
        task_id: 7,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 28,
                responsable: 'Pedro López',
                asigned_at: '2025-10-02',
                started_at: '2025-10-02',
                finished_at: '2025-10-03',
                estado: 'Finalizado',
              },
            ],
            Guarnicion: [
              {
                taskDetailId: 29,
                responsable: 'Laura Gómez',
                asigned_at: '2025-10-03',
                started_at: '2025-10-04',
                finished_at: null,
                estado: 'En progreso',
              },
            ],
            Solador: [{ taskDetailId: 30, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Emplantillado: [{ taskDetailId: 31, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
          },
        ],
      },

      // --- 8: Ya en Solador ---
      {
        task_id: 42,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 32,
                responsable: 'Andrés Ruiz',
                asigned_at: '2025-10-01',
                started_at: '2025-10-01',
                finished_at: '2025-10-02',
                estado: 'Finalizado',
              },
            ],
            Guarnicion: [
              {
                taskDetailId: 33,
                responsable: 'Carolina Díaz',
                asigned_at: '2025-10-02',
                started_at: '2025-10-03',
                finished_at: '2025-10-04',
                estado: 'Finalizado',
              },
            ],
            Solador: [
              {
                taskDetailId: 34,
                responsable: 'Miguel Torres',
                asigned_at: '2025-10-04',
                started_at: '2025-10-05',
                finished_at: null,
                estado: 'En revisión',
              },
            ],
            Emplantillado: [{ taskDetailId: 35, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
          },
        ],
      },

      // --- 9: Ya en Emplantillado ---
      {
        task_id: 10,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 36,
                responsable: 'María Castillo',
                asigned_at: '2025-10-01',
                started_at: '2025-10-01',
                finished_at: '2025-10-02',
                estado: 'Finalizado',
              },
            ],
            Guarnicion: [
              {
                taskDetailId: 37,
                responsable: 'Pablo Fernández',
                asigned_at: '2025-10-02',
                started_at: '2025-10-03',
                finished_at: '2025-10-04',
                estado: 'Finalizado',
              },
            ],
            Solador: [
              {
                taskDetailId: 38,
                responsable: 'Juliana Rincón',
                asigned_at: '2025-10-04',
                started_at: '2025-10-05',
                finished_at: '2025-10-06',
                estado: 'Finalizado',
              },
            ],
            Emplantillado: [
              {
                taskDetailId: 39,
                responsable: 'Daniel Pérez',
                asigned_at: '2025-10-06',
                started_at: '2025-10-07',
                finished_at: null,
                estado: 'En progreso',
              },
            ],
          },
        ],
      },

      // --- 10: En Termofijado ---
      {
        task_id: 40,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 40,
                responsable: 'Santiago López',
                asigned_at: '2025-10-01',
                started_at: '2025-10-02',
                finished_at: '2025-10-03',
                estado: 'Finalizado',
              },
            ],
            Termofijado: [
              {
                taskDetailId: 41,
                responsable: 'Rosa Jiménez',
                asigned_at: '2025-10-03',
                started_at: '2025-10-04',
                finished_at: null,
                estado: 'En progreso',
              },
            ],
            Guarnicion: [{ taskDetailId: 42, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Solador: [{ taskDetailId: 43, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Emplantillado: [{ taskDetailId: 44, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
          },
        ],
      },

      // --- 11: En Bordado ---
      {
        task_id: 43,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 45,
                responsable: 'Felipe Ortiz',
                asigned_at: '2025-10-01',
                started_at: '2025-10-02',
                finished_at: '2025-10-03',
                estado: 'Finalizado',
              },
            ],
            Bordado: [
              {
                taskDetailId: 46,
                responsable: 'Gloria Martínez',
                asigned_at: '2025-10-03',
                started_at: '2025-10-04',
                finished_at: null,
                estado: 'En corrección',
              },
            ],
            Guarnicion: [{ taskDetailId: 47, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Solador: [{ taskDetailId: 48, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Emplantillado: [{ taskDetailId: 49, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
          },
        ],
      },

      // --- 12: En Estampado ---
      {
        task_id: 44,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 50,
                responsable: 'Natalia Herrera',
                asigned_at: '2025-10-02',
                started_at: '2025-10-02',
                finished_at: '2025-10-03',
                estado: 'Finalizado',
              },
            ],
            Estampado: [
              {
                taskDetailId: 51,
                responsable: 'Camila Duarte',
                asigned_at: '2025-10-03',
                started_at: '2025-10-04',
                finished_at: null,
                estado: 'En revisión',
              },
            ],
            Guarnicion: [{ taskDetailId: 52, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Solador: [{ taskDetailId: 53, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Emplantillado: [{ taskDetailId: 54, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
          },
        ],
      },

      // --- 13: En Solador ---
      {
        task_id: 13,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 55,
                responsable: 'Valentina Gil',
                asigned_at: '2025-10-01',
                started_at: '2025-10-02',
                finished_at: '2025-10-02',
                estado: 'Finalizado',
              },
            ],
            Guarnicion: [
              {
                taskDetailId: 56,
                responsable: 'Andrés Páez',
                asigned_at: '2025-10-02',
                started_at: '2025-10-03',
                finished_at: '2025-10-04',
                estado: 'Finalizado',
              },
            ],
            Solador: [
              {
                taskDetailId: 57,
                responsable: 'Diego Correa',
                asigned_at: '2025-10-04',
                started_at: '2025-10-05',
                finished_at: null,
                estado: 'En progreso',
              },
            ],
            Emplantillado: [{ taskDetailId: 58, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
          },
        ],
      },

      // --- 14: En Guarnicion ---
      {
        task_id: 14,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 59,
                responsable: 'Sebastián Mejía',
                asigned_at: '2025-10-01',
                started_at: '2025-10-02',
                finished_at: '2025-10-03',
                estado: 'Finalizado',
              },
            ],
            Guarnicion: [
              {
                taskDetailId: 60,
                responsable: 'Tatiana Silva',
                asigned_at: '2025-10-03',
                started_at: '2025-10-04',
                finished_at: null,
                estado: 'En corrección',
              },
            ],
            Solador: [{ taskDetailId: 61, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
            Emplantillado: [{ taskDetailId: 62, responsable: null, asigned_at: null, started_at: null, finished_at: null, estado: null }],
          },
        ],
      },

      // --- 15: En Emplantillado ---
      {
        task_id: 15,
        LineasProduccion: [
          {
            Corte: [
              {
                taskDetailId: 63,
                responsable: 'Julián Bernal',
                asigned_at: '2025-10-01',
                started_at: '2025-10-01',
                finished_at: '2025-10-02',
                estado: 'Finalizado',
              },
            ],
            Guarnicion: [
              {
                taskDetailId: 64,
                responsable: 'Mónica Rojas',
                asigned_at: '2025-10-02',
                started_at: '2025-10-03',
                finished_at: '2025-10-04',
                estado: 'Finalizado',
              },
            ],
            Solador: [
              {
                taskDetailId: 65,
                responsable: 'Oscar Díaz',
                asigned_at: '2025-10-04',
                started_at: '2025-10-05',
                finished_at: '2025-10-06',
                estado: 'Finalizado',
              },
            ],
            Emplantillado: [
              {
                taskDetailId: 66,
                responsable: 'Sara Morales',
                asigned_at: '2025-10-06',
                started_at: '2025-10-07',
                finished_at: null,
                estado: 'En progreso',
              },
            ],
          },
        ],
      },
    ];
    return taskDetail;
  }

  // Mock de tareas por operario
  private setMockTasksByOperator(): TasksByOperator[] {
    const tasksByOperator: TasksByOperator[] = [
      // CORTE
      {
        operator_document: 1024575050,
        tasks: [
          {
            id: 16,
            referencia_zapato: 'REF00001',
            cantidad: 24,
            color: { id: 1, nombre: 'Negro' },
            talla_id: 42,
            asigned_at: '2025-10-10',
            started_at: '2025-10-10',
            finished_at: '2025-10-11',
            estado: 'Finalizado',
          },
          {
            id: 23,
            referencia_zapato: 'REF00002',
            cantidad: 18,
            color: { id: 2, nombre: 'Blanco' },
            talla_id: 40,
            asigned_at: '2025-10-12',
            started_at: '2025-10-12',
            finished_at: null,
            estado: 'En progreso',
          },
          {
            id: 24,
            referencia_zapato: 'REF00003',
            cantidad: 12,
            color: { id: 3, nombre: 'Café' },
            talla_id: 41,
            asigned_at: '2025-10-13',
            started_at: null,
            finished_at: null,
            estado: 'Nuevo',
          },
          {
            id: 25,
            referencia_zapato: 'REF00004',
            cantidad: 20,
            color: { id: 4, nombre: 'Rojo' },
            talla_id: 39,
            asigned_at: '2025-10-14',
            started_at: '2025-10-14',
            finished_at: '2025-10-15',
            estado: 'Finalizado',
          },
          {
            id: 26,
            referencia_zapato: 'REF00005',
            cantidad: 15,
            color: { id: 5, nombre: 'Azul' },
            talla_id: 43,
            asigned_at: '2025-10-15',
            started_at: '2025-10-15',
            finished_at: null,
            estado: 'En revisión',
          },
          {
            id: 27,
            referencia_zapato: 'REF00006',
            cantidad: 10,
            color: { id: 6, nombre: 'Beige' },
            talla_id: 38,
            asigned_at: '2025-10-16',
            started_at: '2025-10-16',
            finished_at: null,
            estado: 'En corrección',
          },
          {
            id: 28,
            referencia_zapato: 'REF00007',
            cantidad: 22,
            color: { id: 7, nombre: 'Gris' },
            talla_id: 41,
            asigned_at: '2025-10-17',
            started_at: null,
            finished_at: null,
            estado: 'Nuevo',
          },
          {
            id: 29,
            referencia_zapato: 'REF00003',
            cantidad: 30,
            color: { id: 8, nombre: 'Verde' },
            talla_id: 42,
            asigned_at: '2025-10-18',
            started_at: '2025-10-18',
            finished_at: null,
            estado: 'En progreso',
          },
          {
            id: 30,
            referencia_zapato: 'REF00009',
            cantidad: 25,
            color: { id: 9, nombre: 'Marrón' },
            talla_id: 40,
            asigned_at: '2025-10-19',
            started_at: '2025-10-19',
            finished_at: '2025-10-20',
            estado: 'Finalizado',
          },
          {
            id: 31,
            referencia_zapato: 'REF00002',
            cantidad: 18,
            color: { id: 10, nombre: 'Vino tinto' },
            talla_id: 39,
            asigned_at: '2025-10-20',
            started_at: '2025-10-20',
            finished_at: null,
            estado: 'En revisión',
          },
          {
            id: 32,
            referencia_zapato: 'REF00010',
            cantidad: 14,
            color: { id: 11, nombre: 'Mostaza' },
            talla_id: 44,
            asigned_at: '2025-10-21',
            started_at: '2025-10-21',
            finished_at: null,
            estado: 'En corrección',
          },
          {
            id: 33,
            referencia_zapato: 'REF00001',
            cantidad: 16,
            color: { id: 12, nombre: 'Arena' },
            talla_id: 40,
            asigned_at: '2025-10-22',
            started_at: null,
            finished_at: null,
            estado: 'Nuevo',
          },
          {
            id: 34,
            referencia_zapato: 'REF00011',
            cantidad: 28,
            color: { id: 13, nombre: 'Azul oscuro' },
            talla_id: 41,
            asigned_at: '2025-10-23',
            started_at: '2025-10-23',
            finished_at: null,
            estado: 'En progreso',
          },
          {
            id: 35,
            referencia_zapato: 'REF00008',
            cantidad: 12,
            color: { id: 14, nombre: 'Rosa' },
            talla_id: 39,
            asigned_at: '2025-10-24',
            started_at: '2025-10-24',
            finished_at: '2025-10-25',
            estado: 'Finalizado',
          },
          {
            id: 36,
            referencia_zapato: 'REF00005',
            cantidad: 20,
            color: { id: 15, nombre: 'Oliva' },
            talla_id: 42,
            asigned_at: '2025-10-25',
            started_at: null,
            finished_at: null,
            estado: 'Nuevo',
          },
        ],
      },
      // TERMOFIJADO
      {
        operator_document: 1024575052,
        tasks: [
          {
            id: 17,
            referencia_zapato: 'REF-001',
            cantidad: 20,
            color: { id: 1, nombre: 'Negro' },
            talla_id: 42,
            asigned_at: '2025-10-11',
            started_at: '2025-10-11',
            finished_at: '2025-10-12',
            estado: 'Finalizado',
          },
          {
            id: 25,
            referencia_zapato: 'REF-004',
            cantidad: 22,
            color: { id: 4, nombre: 'Rojo' },
            talla_id: 39,
            asigned_at: '2025-10-13',
            started_at: '2025-10-13',
            finished_at: null,
            estado: 'En revisión',
          },
          {
            id: 26,
            referencia_zapato: 'REF-005',
            cantidad: 28,
            color: { id: 5, nombre: 'Azul' },
            talla_id: 40,
            asigned_at: '2025-10-14',
            started_at: null,
            finished_at: null,
            estado: 'Nuevo',
          },
        ],
      },
      // Bordado
      {
        operator_document: 1034698521,
        tasks: [
          {
            id: 18,
            referencia_zapato: 'REF-001',
            cantidad: 20,
            color: { id: 1, nombre: 'Negro' },
            talla_id: 42,
            asigned_at: '2025-10-12',
            started_at: '2025-10-12',
            finished_at: '2025-10-13',
            estado: 'Finalizado',
          },
          {
            id: 27,
            referencia_zapato: 'REF-002',
            cantidad: 25,
            color: { id: 2, nombre: 'Blanco' },
            talla_id: 41,
            asigned_at: '2025-10-13',
            started_at: '2025-10-13',
            finished_at: null,
            estado: 'En corrección',
          },
          {
            id: 28,
            referencia_zapato: 'REF-006',
            cantidad: 30,
            color: { id: 6, nombre: 'Gris' },
            talla_id: 43,
            asigned_at: '2025-10-15',
            started_at: null,
            finished_at: null,
            estado: 'Nuevo',
          },
        ],
      },
      // ESTAMPADO
      {
        operator_document: 1045682397,
        tasks: [
          {
            id: 19,
            referencia_zapato: 'REF-001',
            cantidad: 20,
            color: { id: 1, nombre: 'Negro' },
            talla_id: 42,
            asigned_at: '2025-10-13',
            started_at: '2025-10-13',
            finished_at: '2025-10-14',
            estado: 'Finalizado',
          },
          {
            id: 29,
            referencia_zapato: 'REF-003',
            cantidad: 26,
            color: { id: 3, nombre: 'Café' },
            talla_id: 41,
            asigned_at: '2025-10-14',
            started_at: '2025-10-14',
            finished_at: null,
            estado: 'En progreso',
          },
          {
            id: 30,
            referencia_zapato: 'REF-007',
            cantidad: 18,
            color: { id: 7, nombre: 'Verde oliva' },
            talla_id: 40,
            asigned_at: '2025-10-15',
            started_at: null,
            finished_at: null,
            estado: 'Nuevo',
          },
        ],
      },
      // GUARNICIÓN
      {
        operator_document: 1056893214,
        tasks: [
          {
            id: 20,
            referencia_zapato: 'REF-001',
            cantidad: 20,
            color: { id: 1, nombre: 'Negro' },
            talla_id: 42,
            asigned_at: '2025-10-14',
            started_at: '2025-10-14',
            finished_at: null,
            estado: 'En progreso',
          },
          {
            id: 31,
            referencia_zapato: 'REF-004',
            cantidad: 19,
            color: { id: 4, nombre: 'Rojo' },
            talla_id: 39,
            asigned_at: '2025-10-15',
            started_at: '2025-10-15',
            finished_at: null,
            estado: 'En revisión',
          },
          {
            id: 32,
            referencia_zapato: 'REF-008',
            cantidad: 14,
            color: { id: 8, nombre: 'Beige' },
            talla_id: 40,
            asigned_at: '2025-10-16',
            started_at: null,
            finished_at: null,
            estado: 'Nuevo',
          },
        ],
      },
      // SOLADOR
      {
        operator_document: 1067425839,
        tasks: [
          {
            id: 33,
            referencia_zapato: 'REF-002',
            cantidad: 16,
            color: { id: 2, nombre: 'Blanco' },
            talla_id: 41,
            asigned_at: '2025-10-13',
            started_at: '2025-10-13',
            finished_at: null,
            estado: 'En corrección',
          },
          {
            id: 34,
            referencia_zapato: 'REF-009',
            cantidad: 28,
            color: { id: 9, nombre: 'Azul marino' },
            talla_id: 43,
            asigned_at: '2025-10-14',
            started_at: null,
            finished_at: null,
            estado: 'Nuevo',
          },
          {
            id: 35,
            referencia_zapato: 'REF-010',
            cantidad: 25,
            color: { id: 10, nombre: 'Gris oscuro' },
            talla_id: 44,
            asigned_at: '2025-10-12',
            started_at: '2025-10-12',
            finished_at: '2025-10-13',
            estado: 'Finalizado',
          },
        ],
      },
      // EMPLANTILLADO
      {
        operator_document: 1078956142,
        tasks: [
          {
            id: 36,
            referencia_zapato: 'REF-005',
            cantidad: 23,
            color: { id: 5, nombre: 'Azul' },
            talla_id: 42,
            asigned_at: '2025-10-13',
            started_at: '2025-10-13',
            finished_at: null,
            estado: 'En progreso',
          },
          {
            id: 37,
            referencia_zapato: 'REF-006',
            cantidad: 15,
            color: { id: 6, nombre: 'Gris' },
            talla_id: 40,
            asigned_at: '2025-10-15',
            started_at: '2025-10-15',
            finished_at: null,
            estado: 'En revisión',
          },
          {
            id: 38,
            referencia_zapato: 'REF-011',
            cantidad: 12,
            color: { id: 11, nombre: 'Marrón' },
            talla_id: 39,
            asigned_at: '2025-10-16',
            started_at: null,
            finished_at: null,
            estado: 'Nuevo',
          },
        ],
      },
    ];
    return tasksByOperator;
  }
}

// Tareas por articulo en un pedido
// Este se borará cuando se integre con el backend
export interface TaskDetailArticlesMock {
  articleId: number;
  taskDetailArticles: TaskDetailArticles[];
}

export interface TaskDetailArticles {
  taskId: number;
  amount: number;
  stateProductionLine: string;
  created_at: string;
  updated_at: string | null;
  started_at: string | null;
  finished_at: string | null;
}

// Detalle de tareas

// Este se borará cuando se integre con el backend
export interface TaskDetailsMock {
  task_id: number;
  LineasProduccion: TaskDetail[];
}
export interface TaskDetail {
  LineasProduccion: TaskProductionLine[];
}

export interface TaskProductionLine {
  [nombreLinea: string]: TaskDetailInfo[];
}

export interface TaskDetailInfo {
  taskDetailId: number;
  responsable: string | null;
  asigned_at: string | null;
  started_at: string | null;
  finished_at: string | null;
  estado: string | null;
}

// Creacion de tareas
export interface CreateTasks {
  order_id: number;
  articles: CreateTasksArticles[];
}

export interface CreateTasksArticles {
  article_id: number;
  tasks: CreateTasksArticlesListTask[];
}

export interface CreateTasksArticlesListTask {
  amount: number;
}

// Asignacion de tareas
export interface AsignedTask {
  task_detail_id: number;
  responsable_document: number;
}

// Rechazo de tarea
export interface RejectTask {
  task_detail_id: number;
}

// Pasar a siguiente estado
export interface NextStateTask {
  task_detail_id: number;
}

// Consulta de tareas para el operario
// Este se borará cuando se integre con el backend
export interface TasksByOperator {
  operator_document: number;
  tasks: OperatorTasks[];
}

export interface OperatorTasks {
  id: number;
  referencia_zapato: string;
  cantidad: number;
  color: Color;
  talla_id: number;
  asigned_at: string;
  started_at: string | null;
  finished_at: string | null;
  estado: string;
}

export interface Color {
  id: number;
  nombre: string;
}

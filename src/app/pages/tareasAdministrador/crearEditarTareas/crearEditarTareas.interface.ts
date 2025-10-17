export interface TaskDTO {
  action: '' | 'create' | 'edit';
  context: 'ORDERGERENTADMIN-CREATE-EDIT';
  articleTaskDTO: ArticleTaskDTO;
  tasksDetailDTO: TasksDetailDTO[];
}

export interface TasksDetailDTO {
  articleId: number;
  tasksArticlesDTO: TasksArticlesDTO[];
}

export interface TasksArticlesDTO {
  taskId: number;
  amount: number;
}

export interface ArticleTaskDTO {
  articleId: number;
  ref_design: string;
  amount: number;
  name_color: string;
  cod_size: number;
}

export interface ConfigTable<T> {
  name: string;
  key: keyof T | 'delete';
  width: string;
  position?: 'up' | 'center' | 'down';
  align?: 'left' | 'center' | 'right';
  isObligatory?: boolean;
  isAction?: boolean;
}

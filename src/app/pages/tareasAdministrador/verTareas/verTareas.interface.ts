export interface TaskShowDatilDTO {
  context: 'ORDERGERENTADMIN-SHOW-TASKS';
  articleTaskDTO: ArticleTaskDTO;
}

export interface ArticleTaskDTO {
  articleId: number;
  ref_design: string;
  amount: number;
  name_color: string;
  cod_size: number;
}

export interface TasksDetailByArticleDTO {
  taskId: number;
  amount: number;
  stateProductionLine: string;
  created_at: string;
  updated_at: string | null;
  started_at: string | null;
  finished_at: string | null;
}
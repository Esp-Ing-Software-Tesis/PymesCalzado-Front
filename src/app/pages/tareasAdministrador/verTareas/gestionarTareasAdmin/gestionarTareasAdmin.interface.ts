export interface ManageTaskDTO {
  context: 'ORDERGERENTADMIN-TASK';
  articleTaskDTO: ArticleTaskDTO;
  taskId: number;
}

export interface ArticleTaskDTO {
  articleId: number;
  ref_design: string;
  amount: number;
  name_color: string;
  cod_size: number;
}

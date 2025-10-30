export interface ManageTaskOperatorDTO {
  context: 'TASKOPERATOR';
  articleTaskDTO: ArticleTaskDTO;
  taskId: number;
}

export interface ArticleTaskDTO {
  ref_design: string;
  amount: number;
  name_color: string;
  cod_size: number;
  state: string;
}
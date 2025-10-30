export interface ManageTaskDTO {
  context: 'ORDERGERENTADMIN';
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

export interface ConfigTable<T> {
  name: string;
  key: keyof T;
  width: string;
  position?: 'up' | 'center' | 'down';
  align?: 'left' | 'center' | 'right';
  isState?: boolean;
}

export interface TaskProductionLineDTO {
  [nombreLinea: string]: TaskDetailInfoDTO[];
}

export interface TaskDetailInfoDTO {
  taskDetailId: number;
  productionLine: string;
  responsable: string | null;
  asigned_at: string | null;
  started_at: string | null;
  finished_at: string | null;
  state: string | null;
}

export interface LastState {
  productionLine: string | null;
  lastState: string | null;
}

export interface UsersByProductionLineDTO {
    name: string;
    document: number;
}

export interface AsignedTaskDTO {
  task_detail_id: number;
  responsable_document: number;
}
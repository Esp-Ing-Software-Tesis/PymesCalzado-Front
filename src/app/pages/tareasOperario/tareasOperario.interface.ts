export interface OperatorTasksDTO {
  task_id: number;
  ref_design: string;
  amount: number;
  color_name: string;
  size_id: number;
  asigned_at: string;
  started_at: string | null;
  finished_at: string | null;
  state: string;
}
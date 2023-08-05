export type Status = "pending" | "completed";
export type Filter = Status | "all";
export type Todo = {
  description: string;
  status: Status;
  id: number;
};

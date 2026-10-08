import type { TaskPriority, TaskStatus } from "../lib/api/tasks";

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export const DEFAULT_TASK_FORM: TaskFormData = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};
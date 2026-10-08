export type TaskStatus = "pending" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface TasksResponse {
  data: Task[];
}

interface TaskResponse {
  data: Task;
}

interface ApiErrorResponse {
  error?: {
    message?: string;
    fields?: Record<string, string>;
  };
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function parseResponse<T extends object>(
  response: Response,
): Promise<T> {
  const body = (await response.json()) as T | ApiErrorResponse;

  if (!response.ok) {
    const errorBody = body as ApiErrorResponse;

    const message =
      errorBody.error?.message || "Something went wrong.";

    throw new Error(message);
  }

  return body as T;
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/tasks`);
  const result = await parseResponse<TasksResponse>(response);

  return result.data;
}

export async function getTask(id: string): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}`);
  const result = await parseResponse<TaskResponse>(response);

  return result.data;
}

export async function createTask(
  task: Omit<Task, "id" | "createdAt" | "updatedAt">,
): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const result = await parseResponse<TaskResponse>(response);

  return result.data;
}

export async function updateTask(
  id: string,
  task: Omit<Task, "id" | "createdAt" | "updatedAt">,
): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const result = await parseResponse<TaskResponse>(response);

  return result.data;
}

export async function deleteTask(id: string): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  const result = await parseResponse<TaskResponse>(response);

  return result.data;
}
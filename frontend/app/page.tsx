"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  type Task,
} from "../lib/api/tasks";
import TaskDetails from "../components/tasks/TaskDetails";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import {
  DEFAULT_TASK_FORM,
  type TaskFormData,
} from "../types/task";

type ModalState =
  | { type: "create" }
  | { type: "edit"; task: Task }
  | { type: "details"; task: Task }
  | null;

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modal, setModal] = useState<ModalState>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setError("");
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load tasks.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreate(data: TaskFormData) {
    try {
      setError("");

      const task = await createTask({
        ...data,
        dueDate: data.dueDate || null,
      });

      setTasks((currentTasks) => [task, ...currentTasks]);
      setModal(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create task.",
      );
    }
  }

  async function handleUpdate(data: TaskFormData) {
    if (modal?.type !== "edit") {
      return;
    }

    try {
      setError("");

      const updatedTask = await updateTask(modal.task.id, {
        ...data,
        dueDate: data.dueDate || null,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        ),
      );

      setModal(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update task.",
      );
    }
  }

  async function handleDelete(task: Task) {
    const confirmed = window.confirm(
      `Delete "${task.title}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      await deleteTask(task.id);

      setTasks((currentTasks) =>
        currentTasks.filter((item) => item.id !== task.id),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete task.",
      );
    }
  }

  function getFormData(task: Task): TaskFormData {
    return {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ?? "",
    };
  }

      const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );
      }

      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return (
          new Date(`${a.dueDate}T00:00:00`).getTime() -
          new Date(`${b.dueDate}T00:00:00`).getTime()
        );
      }

      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    });
  }, [tasks, search, statusFilter, priorityFilter, sortBy]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Task Management
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
              Your tasks
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Create, organize, and keep track of your work.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModal({ type: "create" })}
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Create task
          </button>
        </header>

                        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Total tasks</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">In progress</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {tasks.filter((task) => task.status === "in_progress").length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {tasks.filter((task) => task.status === "completed").length}
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tasks..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500"
            >
              <option value="all">All priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        

        {error && (
          <div
            role="alert"
            className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <span>{error}</span>

            <button
              type="button"
              onClick={loadTasks}
              className="shrink-0 font-medium underline underline-offset-2"
            >
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
            <p className="text-sm text-slate-500">Loading tasks...</p>
          </div>
                ) : (
          <TaskList
            tasks={filteredTasks}
            onView={(task) => setModal({ type: "details", task })}
            onEdit={(task) => setModal({ type: "edit", task })}
            onDelete={handleDelete}
          />
        )}
      </div>

      {modal?.type === "create" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Create task
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Add a new task to your list.
              </p>
            </div>

            <TaskForm
              initialData={DEFAULT_TASK_FORM}
              submitLabel="Create task"
              onSubmit={handleCreate}
              onCancel={() => setModal(null)}
            />
          </div>
        </div>
      )}

      {modal?.type === "edit" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Edit task
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Update the task details.
              </p>
            </div>

            <TaskForm
              initialData={getFormData(modal.task)}
              submitLabel="Save changes"
              onSubmit={handleUpdate}
              onCancel={() => setModal(null)}
            />
          </div>
        </div>
      )}

      {modal?.type === "details" && (
        <TaskDetails
          task={modal.task}
          onClose={() => setModal(null)}
          onEdit={() =>
            setModal({
              type: "edit",
              task: modal.task,
            })
          }
        />
      )}
    </main>
  );
}
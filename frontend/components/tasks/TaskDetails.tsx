"use client";

import type { Task } from "../../lib/api/tasks";

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
  onEdit: () => void;
}

const statusLabels = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};

const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

function formatDate(date: string | null) {
  if (!date) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatDateTime(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function TaskDetails({
  task,
  onClose,
  onEdit,
}: TaskDetailsProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-details-title"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-200 p-6">
          <div className="pr-6">
            <p className="text-sm font-medium text-slate-500">
              Task details
            </p>
            <h2
              id="task-details-title"
              className="mt-1 text-xl font-semibold text-slate-900"
            >
              {task.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close task details"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Description
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              {task.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Status
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {statusLabels[task.status]}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Priority
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {priorityLabels[task.priority]}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Due date
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {formatDate(task.dueDate)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Created
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {formatDateTime(task.createdAt)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Last updated
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {formatDateTime(task.updatedAt)}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Edit task
          </button>
        </div>
      </div>
    </div>
  );
}
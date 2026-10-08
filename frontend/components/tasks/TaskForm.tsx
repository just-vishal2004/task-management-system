"use client";

import { FormEvent, useState } from "react";
import {
  DEFAULT_TASK_FORM,
  TaskFormData,
} from "../../types/task";

interface TaskFormProps {
  initialData?: TaskFormData;
  submitLabel: string;
  onSubmit: (data: TaskFormData) => Promise<void>;
  onCancel: () => void;
}

interface FormErrors {
  title?: string;
  description?: string;
}

export default function TaskForm({
  initialData = DEFAULT_TASK_FORM,
  submitLabel,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const nextErrors: FormErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = "Title is required.";
    }

    if (!formData.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(event) =>
            setFormData({ ...formData, title: event.target.value })
          }
          placeholder="Enter task title"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500"
        />
        {errors.title && (
          <p className="mt-1.5 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(event) =>
            setFormData({ ...formData, description: event.target.value })
          }
          placeholder="Add a short description"
          className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500"
        />
        {errors.description && (
          <p className="mt-1.5 text-sm text-red-600">
            {errors.description}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(event) =>
              setFormData({
                ...formData,
                status: event.target.value as TaskFormData["status"],
              })
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="priority"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Priority
          </label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(event) =>
              setFormData({
                ...formData,
                priority: event.target.value as TaskFormData["priority"],
              })
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="dueDate"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Due date
        </label>
        <input
          id="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={(event) =>
            setFormData({ ...formData, dueDate: event.target.value })
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
        />
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
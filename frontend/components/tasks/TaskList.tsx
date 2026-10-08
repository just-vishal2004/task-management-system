import type { Task } from "../../lib/api/tasks";

interface TaskListProps {
  tasks: Task[];
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
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

function formatCreatedDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function TaskList({
  tasks,
  onView,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <h3 className="text-base font-semibold text-slate-900">
          No tasks yet
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Create your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="divide-y divide-slate-200">
        {tasks.map((task) => (
          <article
            key={task.id}
            className="p-5 transition hover:bg-slate-50"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-base font-semibold text-slate-900">
                    {task.title}
                  </h3>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {statusLabels[task.status]}
                  </span>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {priorityLabels[task.priority]}
                  </span>
                </div>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                  {task.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span>Due {formatDate(task.dueDate)}</span>
                  <span>Created {formatCreatedDate(task.createdAt)}</span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => onView(task)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
                >
                  View
                </button>

                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(task)}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
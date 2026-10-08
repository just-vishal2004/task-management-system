const { randomUUID } = require("crypto");

const tasks = [
  {
    id: randomUUID(),
    title: "Review project requirements",
    description: "Go through the assessment requirements before starting implementation.",
    status: "completed",
    priority: "high",
    dueDate: "2026-10-08",
    createdAt: "2026-10-07T10:00:00.000Z",
    updatedAt: "2026-10-07T15:30:00.000Z",
  },
  {
    id: randomUUID(),
    title: "Build task management API",
    description: "Implement the REST API for creating, reading, updating, and deleting tasks.",
    status: "in_progress",
    priority: "high",
    dueDate: "2026-10-08",
    createdAt: "2026-10-08T06:00:00.000Z",
    updatedAt: "2026-10-08T08:30:00.000Z",
  },
  {
    id: randomUUID(),
    title: "Prepare submission",
    description: "Test the application and prepare the final documentation and screenshots.",
    status: "pending",
    priority: "medium",
    dueDate: "2026-10-08",
    createdAt: "2026-10-08T08:00:00.000Z",
    updatedAt: "2026-10-08T08:00:00.000Z",
  },
];

function getAllTasks() {
  return [...tasks];
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function createTask(data) {
  const now = new Date().toISOString();

  const task = {
    id: randomUUID(),
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    dueDate: data.dueDate || null,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(task);

  return task;
}

function updateTask(id, data) {
  const task = getTaskById(id);

  if (!task) {
    return null;
  }

  task.title = data.title;
  task.description = data.description;
  task.status = data.status;
  task.priority = data.priority;
  task.dueDate = data.dueDate || null;
  task.updatedAt = new Date().toISOString();

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedTask] = tasks.splice(index, 1);

  return deletedTask;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
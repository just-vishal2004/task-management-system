const taskService = require("../services/task.service");
const { validateTaskInput } = require("../validators/task.validator");

function getTasks(req, res) {
  const tasks = taskService.getAllTasks();

  res.status(200).json({
    data: tasks,
  });
}

function getTask(req, res) {
  const task = taskService.getTaskById(req.params.id);

  if (!task) {
    return res.status(404).json({
      error: {
        message: "Task not found.",
      },
    });
  }

  return res.status(200).json({
    data: task,
  });
}

function createTask(req, res) {
  const validation = validateTaskInput(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      error: {
        message: "Invalid task data.",
        fields: validation.errors,
      },
    });
  }

  const task = taskService.createTask(req.body);

  return res.status(201).json({
    data: task,
  });
}

function updateTask(req, res) {
  const validation = validateTaskInput(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      error: {
        message: "Invalid task data.",
        fields: validation.errors,
      },
    });
  }

  const task = taskService.updateTask(req.params.id, req.body);

  if (!task) {
    return res.status(404).json({
      error: {
        message: "Task not found.",
      },
    });
  }

  return res.status(200).json({
    data: task,
  });
}

function deleteTask(req, res) {
  const task = taskService.deleteTask(req.params.id);

  if (!task) {
    return res.status(404).json({
      error: {
        message: "Task not found.",
      },
    });
  }

  return res.status(200).json({
    data: task,
  });
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
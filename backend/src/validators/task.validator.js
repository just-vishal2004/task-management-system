const VALID_STATUSES = ["pending", "in_progress", "completed"];
const VALID_PRIORITIES = ["low", "medium", "high"];

function validateTaskInput(data) {
  const errors = {};

  if (!data || typeof data !== "object") {
    return {
      valid: false,
      errors: {
        body: "Request body must be an object.",
      },
    };
  }

  if (
    typeof data.title !== "string" ||
    data.title.trim().length === 0
  ) {
    errors.title = "Title is required.";
  }

  if (
    typeof data.description !== "string" ||
    data.description.trim().length === 0
  ) {
    errors.description = "Description is required.";
  }

  if (!VALID_STATUSES.includes(data.status)) {
    errors.status = `Status must be one of: ${VALID_STATUSES.join(", ")}.`;
  }

  if (!VALID_PRIORITIES.includes(data.priority)) {
    errors.priority = `Priority must be one of: ${VALID_PRIORITIES.join(", ")}.`;
  }

  if (data.dueDate !== undefined && data.dueDate !== null) {
    if (
      typeof data.dueDate !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(data.dueDate)
    ) {
      errors.dueDate = "Due date must use YYYY-MM-DD format.";
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = {
  validateTaskInput,
};
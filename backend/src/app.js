const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  }),
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Task Management API is running",
  });
});

app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

module.exports = app;
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const usersRoutes = require("./app/routes/usersRoutes");
const departmentsRoutes = require("./app/routes/departmentsRoutes");
const projectsRoutes = require("./app/routes/projectsRoutes");
const tasksRoutes = require("./app/routes/tasksRoutes");
const errorHandler = require("./utils/errorHandler");

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to set security headers
app.use(helmet()); // helps protect your application and its users from various security threats and vulnerabilities.

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/tasks", tasksRoutes);

// Primary route
app.get("/", (request, response, next) => {
  response.send({ success: true, message: "This is primary route" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res
    .status(responseCode?.["RESPONSE_FAILURE"]?.statusCode)
    .json(errorHandler.makeErrorResponse);
});

module.exports = app;

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasksController");
const authHandler = require("../middlewares/authHandler");

router
  .route("/")
  .post(authHandler.verifyToken, taskController.createTask)
  .get(authHandler.verifyToken, taskController.getTasks);

router
  .route("/:taskId")
  .put(authHandler.verifyToken, taskController.updateTask)
  .delete(authHandler.verifyToken, taskController.deleteTask)
  .get(authHandler.verifyToken, taskController.getTaskById);

module.exports = router;

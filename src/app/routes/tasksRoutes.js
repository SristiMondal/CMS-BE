const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasksController");

router.route("/").post(taskController.createTask).get(taskController.getTasks);

router
  .route("/:taskId")
  .put(taskController.updateTask)
  .delete(taskController.deleteTask)
  .get(taskController.getTaskById);

module.exports = router;

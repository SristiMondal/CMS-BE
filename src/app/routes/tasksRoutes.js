const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getTaskById,
} = require("../controllers/tasksController");

router.route("/").post(createTask).get(getTasks);

router.route("/:taskId").put(updateTask).delete(deleteTask).get(getTaskById);

module.exports = router;

const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectsController");

router
  .route("/")
  .post(projectController.createProject)
  .get(projectController.getProjects);

router
  .route("/:projectId")
  .put(projectController.updateProject)
  .delete(projectController.deleteProject)
  .get(projectController.getProjectById);

module.exports = router;

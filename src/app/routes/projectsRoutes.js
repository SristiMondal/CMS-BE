const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectsController");
const authHandler = require("../middlewares/authHandler");

router
  .route("/")
  .post(authHandler.verifyToken, projectController.createProject)
  .get(authHandler.verifyToken, projectController.getProjects);

router
  .route("/:projectId")
  .put(authHandler.verifyToken, projectController.updateProject)
  .delete(authHandler.verifyToken, projectController.deleteProject)
  .get(authHandler.verifyToken, projectController.getProjectById);

module.exports = router;

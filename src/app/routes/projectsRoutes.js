const express = require("express");
const router = express.Router();
const {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
  getProjectById,
} = require("../controllers/departmentsController");

router.route("/").post(createProject).get(getProjects);

router
  .route("/:projectId")
  .put(updateProject)
  .delete(deleteProject)
  .get(getProjectById);

module.exports = router;

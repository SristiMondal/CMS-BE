const express = require("express");
const router = express.Router();
const {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartments,
  getDepartmentById,
} = require("../controllers/departmentsController");

router.route("/").post(createDepartment).get(getDepartments);

router
  .route("/:departmentId")
  .put(updateDepartment)
  .delete(deleteDepartment)
  .get(getDepartmentById);

module.exports = router;

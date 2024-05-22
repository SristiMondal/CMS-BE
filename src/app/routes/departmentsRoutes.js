const express = require("express");
const router = express.Router();
const departmentColtroller = require("../controllers/departmentsController");

router
  .route("/")
  .post(departmentColtroller.createDepartment)
  .get(departmentColtroller.getDepartments);

router
  .route("/:departmentId")
  .put(departmentColtroller.updateDepartment)
  .delete(departmentColtroller.deleteDepartment)
  .get(departmentColtroller.getDepartmentById);

module.exports = router;

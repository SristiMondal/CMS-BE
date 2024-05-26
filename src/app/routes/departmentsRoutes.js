const express = require("express");
const router = express.Router();
const departmentColtroller = require("../controllers/departmentsController");
const authHandler = require("../middlewares/authHandler");

router
  .route("/")
  .post(authHandler.verifyToken, departmentColtroller.createDepartment)
  .get(authHandler.verifyToken, departmentColtroller.getDepartments);

router
  .route("/:departmentId")
  .put(authHandler.verifyToken, departmentColtroller.updateDepartment)
  .delete(authHandler.verifyToken, departmentColtroller.deleteDepartment)
  .get(authHandler.verifyToken, departmentColtroller.getDepartmentById);

module.exports = router;

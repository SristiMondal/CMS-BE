const createDepartment = async (request, response, next) => {
  response.send({ success: true, message: "operation failed signup" });
};
const updateDepartment = async (request, response, next) => {
  response.send({ success: true, message: "operation failed login" });
};
const deleteDepartment = async (request, response, next) => {
  response.send({ success: true, message: "operation failed logout" });
};
const getDepartments = async (request, response, next) => {
  response.send({ success: true, message: "operation failed logout" });
};
const getDepartmentById = async (request, response, next) => {
  response.send({ success: true, message: "operation failed logout" });
};

module.exports = {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartments,
  getDepartmentById,
};

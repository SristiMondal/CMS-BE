const createTask = async (request, response, next) => {
  response.send({ success: true, message: "operation failed signup" });
};
const updateTask = async (request, response, next) => {
  response.send({ success: true, message: "operation failed login" });
};
const deleteTask = async (request, response, next) => {
  response.send({ success: true, message: "operation failed logout" });
};
const getTasks = async (request, response, next) => {
  response.send({ success: true, message: "operation failed logout" });
};
const getTaskById = async (request, response, next) => {
  response.send({ success: true, message: "operation failed logout" });
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getTaskById,
};

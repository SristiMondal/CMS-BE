const createProject = async (request, response, next) => {
  response.send({ success: true, message: "operation failed signup" });
};
const updateProject = async (request, response, next) => {
  response.send({ success: true, message: "operation failed login" });
};
const deleteProject = async (request, response, next) => {
  response.send({ success: true, message: "operation failed logout" });
};
const getProjects = async (request, response, next) => {
  response.send({ success: true, message: "operation failed logout" });
};
const getProjectById = async (request, response, next) => {
  response.send({ success: true, message: "operation failed logout" });
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
  getProjectById,
};

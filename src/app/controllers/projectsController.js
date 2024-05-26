const { Op } = require("sequelize");
const Projects = require("../../models/projectsModel");
const responseHandler = require("../../utils/responseHandler");
const { validate } = require("uuid");

const createProject = async (request, response, next) => {
  const name = request.body.name;
  try {
    if (!name) {
      return responseHandler(response, false, "MISSING_PROJECT_NAME");
    }
    const existingProject = await Projects.findOne({
      where: {
        name: {
          [Op.iLike]: name, //This operator is used for case-insensitive string comparison in PostgreSQL
        },
      },
    });
    if (existingProject) {
      return responseHandler(response, false, "DUPLICATE_PROJECT_NAME");
    }
    const newProject = await Projects.create(request.body);
    return responseHandler(
      response,
      true,
      "CREATE_PROJECT_SUCCESS",
      newProject
    );
  } catch (error) {
    next(error);
  }
};

const updateProject = async (request, response, next) => {
  const name = request.body.name;
  const id = request.params.projectId;
  try {
    if (!validate(id)) {
      return responseHandler(response, false, "MISSING_PROJECT_ID");
    }
    const existingProject = await Projects.findOne({
      where: {
        id,
      },
    });
    if (!existingProject) {
      return responseHandler(response, false, "INVALID_PROJECT_ID");
    }
    if (name) {
      const isduplicateName = await Projects.findOne({
        where: {
          name: {
            [Op.iLike]: name, //This operator is used for case-insensitive string comparison in PostgreSQL
          },
        },
      });
      if (isduplicateName && isduplicateName.id !== id) {
        return responseHandler(response, false, "DUPLICATE_PROJECT_NAME");
      }
      const updatedObj = {
        ...existingProject,
        ...request.body,
      };
      const updatedProject = await existingProject.update(updatedObj);
      return responseHandler(
        response,
        true,
        "PROJECT_UPDATED_SUCCESS",
        updatedProject
      );
    }
    const updatedObj = {
      ...existingProject,
      ...request.body,
    };
    const updatedProject = await existingProject.update(updatedObj);
    return responseHandler(
      response,
      true,
      "PROJECT_UPDATED_SUCCESS",
      updatedProject
    );
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (request, response, next) => {
  const id = request.params.projectId;
  try {
    if (!validate(id)) {
      return responseHandler(response, false, "MISSING_PROJECT_ID");
    }
    const existingProject = await Projects.findOne({
      where: {
        id,
      },
    });
    if (!existingProject) {
      return responseHandler(response, false, "INVALID_PROJECT_ID");
    }
    await existingProject.destroy();
    return responseHandler(response, true, "DELETE_PROJECT_SUCCESS");
  } catch (error) {
    next(error);
  }
};

const getProjects = async (request, response, next) => {
  try {
    const existingProject = await Projects.findAll();
    if (!existingProject?.length) {
      return responseHandler(response, false, "NO_PROJECT_EXISTS");
    }
    const data = { ProjectsList: existingProject };
    return responseHandler(response, true, "GET_ALL_PROJECTS_SUCCESS", data);
  } catch (error) {
    next(error);
  }
};
const getProjectById = async (request, response, next) => {
  const id = request.params.projectId;
  try {
    if (!validate(id)) {
      return responseHandler(response, false, "MISSING_PROJECT_ID");
    }
    const existingProject = await Projects.findOne({
      where: {
        id,
      },
    });
    if (!existingProject) {
      return responseHandler(response, false, "INVALID_PROJECT_ID");
    }
    return responseHandler(
      response,
      true,
      "FETCH_PROJECT_BY_ID_SUCCESS",
      existingProject
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
  getProjectById,
};

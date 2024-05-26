const { Op } = require("sequelize");
const Departments = require("../../models/departmentsModel");
const responseHandler = require("../../utils/responseHandler");
const { validate } = require("uuid");

const createDepartment = async (request, response, next) => {
  const name = request.body.name;
  try {
    if (!name) {
      return responseHandler(response, false, "MISSING_DEPARTMENT_NAME");
    }
    const existingDepartment = await Departments.findOne({
      where: {
        name: {
          [Op.iLike]: name, //This operator is used for case-insensitive string comparison in PostgreSQL
        },
      },
    });
    if (existingDepartment) {
      return responseHandler(response, false, "DUPLICATE_DEPARTMENT_NAME");
    }
    const newDepartment = await Departments.create(request.body);
    return responseHandler(
      response,
      true,
      "CREATE_DEPARTMENT_SUCCESS",
      newDepartment
    );
  } catch (error) {
    next(error);
  }
};

const updateDepartment = async (request, response, next) => {
  const name = request.body.name;
  const id = request.params.departmentId;
  try {
    if (!validate(id)) {
      return responseHandler(response, false, "MISSING_DEPARTMENT_ID");
    }
    const existingDepartment = await Departments.findOne({
      where: {
        id,
      },
    });
    if (!existingDepartment) {
      return responseHandler(response, false, "INVALID_DEPARTMENT_ID");
    }
    if (name) {
      const isduplicateName = await Departments.findOne({
        where: {
          name: {
            [Op.iLike]: name, //This operator is used for case-insensitive string comparison in PostgreSQL
          },
        },
      });
      if (isduplicateName && isduplicateName.id !== id) {
        return responseHandler(response, false, "DUPLICATE_DEPARTMENT_NAME");
      }
      const updatedObj = {
        ...existingDepartment,
        ...request.body,
      };
      const updatedDepartment = await existingDepartment.update(updatedObj);
      return responseHandler(
        response,
        true,
        "DEPARTMENT_UPDATED_SUCCESS",
        updatedDepartment
      );
    }
    const updatedObj = {
      ...existingDepartment,
      ...request.body,
    };
    const updatedDepartment = await existingDepartment.update(updatedObj);
    return responseHandler(
      response,
      true,
      "DEPARTMENT_UPDATED_SUCCESS",
      updatedDepartment
    );
  } catch (error) {
    next(error);
  }
};

const deleteDepartment = async (request, response, next) => {
  const id = request.params.departmentId;
  try {
    if (!validate(id)) {
      return responseHandler(response, false, "MISSING_DEPARTMENT_ID");
    }
    const existingDepartment = await Departments.findOne({
      where: {
        id,
      },
    });
    if (!existingDepartment) {
      return responseHandler(response, false, "INVALID_DEPARTMENT_ID");
    }
    await existingDepartment.destroy();
    return responseHandler(response, true, "DELETE_DEPARTMENT_SUCCESS");
  } catch (error) {
    next(error);
  }
};
const getDepartments = async (request, response, next) => {
  try {
    const existingDepartment = await Departments.findAll();
    if (!existingDepartment?.length) {
      return responseHandler(response, false, "NO_DEPARTMENT_EXISTS");
    }
    const data = { DepartmentsList: existingDepartment };
    return responseHandler(response, true, "GET_ALL_DEPARTMENTS_SUCCESS", data);
  } catch (error) {
    next(error);
  }
};
const getDepartmentById = async (request, response, next) => {
  const id = request.params.departmentId;
  try {
    if (!validate(id)) {
      return responseHandler(response, false, "MISSING_DEPARTMENT_ID");
    }
    const existingDepartment = await Departments.findOne({
      where: {
        id,
      },
    });
    if (!existingDepartment) {
      return responseHandler(response, false, "INVALID_DEPARTMENT_ID");
    }
    return responseHandler(
      response,
      true,
      "FETCH_DEPARTMENT_BY_ID_SUCCESS",
      existingDepartment
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartments,
  getDepartmentById,
};

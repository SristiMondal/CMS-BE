const Users = require("../../models/usersModel");
const bcrypt = require("bcryptjs");
const { validate } = require("uuid");
const { generateToken } = require("../middlewares/authHandler");
const responseHandler = require("../../utils/responseHandler");

const register = async (request, response, next) => {
  const { email, password, first_name, last_name, phone, date_of_joining } =
    request.body;
  if (!email || !password) {
    return responseHandler(response, false, "REGISTER_FAILURE");
  }
  try {
    const existingUser = await Users.findOne({
      where: { email: email },
    });
    if (existingUser) {
      return responseHandler(response, false, "USER_ALREADY_EXISTS");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(request.body.password, salt);
      const obj = {
        ...request.body,
        email: email,
        password: hashedPassword,
        first_name,
        last_name,
        phone,
        date_of_joining,
      };
      const newUser = await Users.create(obj);
      return responseHandler(response, true, "REGISTER_SUCCESS", newUser);
    }
  } catch (error) {
    next(error);
  }
};

const login = async (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return responseHandler(response, false, "MISSING_LOGIN_CREDENTIAL");
  }
  try {
    const user = await Users.findOne({
      where: { email: email },
    });
    if (!user) {
      return responseHandler(response, false, "INVALID_LOGIN_EMAIL");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return responseHandler(response, false, "INVALID_LOGIN_PASSWORD");
    }
    const token = await generateToken(user);
    const data = { accesstoken: token };
    return responseHandler(response, true, "LOGIN_SUCCESS", data);
  } catch (error) {
    next(error);
  }
};

const logout = async (request, response, next) => {
  try {
    return responseHandler(response, true, "LOGOUT_SUCCESS");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (request, response, next) => {
  const userId = request.params.userId;
  try {
    if (!validate(userId)) {
      return responseHandler(response, false, "MISSING_USER_ID");
    }
    const existingUser = await Users.findOne({
      where: { id: userId },
    });
    if (!existingUser) {
      return responseHandler(response, false, "USER_NOT_EXIST");
    }
    // Delete the user
    await existingUser.destroy();
    return responseHandler(response, true, "DELETE_USER_SUCCESS");
  } catch (error) {
    next(error);
  }
};

const getUserDetailsById = async (request, response, next) => {
  const userId = request.params.userId;
  try {
    if (!validate(userId)) {
      return responseHandler(response, false, "MISSING_USER_ID");
    }
    const existingUser = await Users.findOne({
      where: { id: userId },
    });
    if (!existingUser) {
      return responseHandler(response, false, "USER_NOT_EXIST");
    }
    return responseHandler(response, true, "FETCH_USER_SUCCESS", existingUser);
  } catch (error) {
    next(error);
  }
};

const getAllUserDetails = async (request, response, next) => {
  try {
    const existingUser = await Users.findAll();
    if (!existingUser?.length) {
      return responseHandler(response, false, "NO_USER_AVAILABLE");
    }
    const data = { usersList: existingUser };
    return responseHandler(response, true, "FETCH_ALL_USERS_SUCCESS", data);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (request, response, next) => {
  const userId = request.params.userId;
  try {
    if (!validate(userId)) {
      return responseHandler(response, false, "MISSING_USER_ID");
    }
    const existingUser = await Users.findOne({
      where: { id: userId },
    });
    if (!existingUser) {
      return responseHandler(response, false, "USER_NOT_EXIST");
    }
    const {
      first_name,
      last_name,
      phone,
      date_of_joining,
      address,
      designation,
      work_location,
      project_id,
      department_id,
      manager_id,
      role,
    } = request.body;
    const newUSerObj = {
      ...existingUser,
      first_name: first_name ?? existingUser?.first_name,
      last_name: last_name ?? existingUser?.first_name,
      phone: phone ?? existingUser?.phone,
      date_of_joining: date_of_joining ?? existingUser?.date_of_joining,
      address: address ?? existingUser?.address,
      designation: designation ?? existingUser?.designation,
      work_location: work_location ?? existingUser?.work_location,
      project_id: project_id ?? existingUser?.project_id,
      department_id: department_id ?? existingUser?.department_id,
      manager_id: manager_id ?? existingUser?.manager_id,
      role: role ?? existingUser?.role,
    };
    const updatedObj = await existingUser.update(newUSerObj);
    return responseHandler(
      response,
      true,
      "UPDATE_USER_DETAIL_SUCCESS",
      updatedObj
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  deleteUser,
  getUserDetailsById,
  getAllUserDetails,
  updateUser,
};

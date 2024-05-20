const Users = require("../../models/usersModel");
const {
  RESPONSE_SUCCESS,
  RESPONSE_FAILURE,
  USER_ALREADY_EXISTS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_SUCCESS,
  INVALID_LOGIN_EMAIL,
  INVALID_LOGIN_PASSWORD,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  MISSING_LOGIN_CREDENTIAL,
  LOGIN_FAILURE,
  DELETE_USER_FAILURE,
  MISSING_USER_ID,
  DELETE_USER_SUCCESS,
  USER_NOT_EXIST,
  FETCH_SINGLE_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_ALL_USERS_FAILURE,
  NO_USER_AVAILABLE,
  FETCH_ALL_USERS_SUCCESS,
  UPDATE_USER_DETAIL_SUCCESS,
  UPDATE_USER_DETAIL_FAILURE,
} = require("../../utils/constant");
const bcrypt = require("bcryptjs");
const { validate } = require("uuid");
const { generateToken } = require("../middlewares/authHandler");

const register = async (request, response, next) => {
  const { email, password, first_name, last_name, phone, date_of_joining } =
    request.body;

  if (!email || !password) {
    return response.status(400).json({
      success: false,
      statusCode: "REGISTER_FAILURE",
      message: "Email and password are required",
    });
  }
  try {
    const existingUser = await Users.findOne({
      where: { email: email.toLowerCase() },
    });
    if (existingUser) {
      return response.status(RESPONSE_FAILURE).json({
        success: false,
        statusCode: USER_ALREADY_EXISTS,
        message: "User already exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(request.body.password, salt);
      const obj = {
        ...request.body,
        email: email.toLowerCase(),
        password: hashedPassword,
        first_name,
        last_name,
        phone,
        date_of_joining,
      };
      const newUser = await Users.create(obj);
      return response.status(RESPONSE_SUCCESS).json({
        success: true,
        statusCode: REGISTER_SUCCESS,
        data: newUser,
        message: "User registered successfully",
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return response.status(RESPONSE_FAILURE).send({
      success: false,
      statusCode: REGISTER_FAILURE,
      message: "An error occurred during registration",
    });
  }
};

const login = async (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(RESPONSE_FAILURE).json({
      success: false,
      statusCode: MISSING_LOGIN_CREDENTIAL,
      message: "Email and password are required",
    });
  }
  try {
    const user = await Users.findOne({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      return response.status(RESPONSE_FAILURE).json({
        success: false,
        statusCode: INVALID_LOGIN_EMAIL,
        message: "Invalid credentials",
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return response.status(RESPONSE_FAILURE).json({
        success: false,
        statusCode: INVALID_LOGIN_PASSWORD,
        message: "Invalid Password",
      });
    }
    const token = await generateToken(user.id);
    return response.status(RESPONSE_SUCCESS).json({
      success: true,
      statusCode: LOGIN_SUCCESS,
      token,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return response.status(RESPONSE_FAILURE).json({
      success: false,
      statusCode: LOGIN_FAILURE,
      message: "An error occurred during login",
    });
  }
};

const logout = async (request, response, next) => {
  try {
    return response.status(RESPONSE_SUCCESS).json({
      success: true,
      statusCode: LOGOUT_SUCCESS,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return response.status(RESPONSE_FAILURE).json({
      success: false,
      statusCode: LOGOUT_FAILURE,
      message: "An error occurred during logout",
    });
  }
};

const deleteUser = async (request, response, next) => {
  const userId = request.params.userId;
  try {
    if (!validate(userId)) {
      return response.status(RESPONSE_FAILURE).send({
        success: false,
        statusCode: MISSING_USER_ID,
        message: "Missing or Invalid User ID format",
      });
    }
    const existingUser = await Users.findOne({
      where: { id: userId },
    });
    if (!existingUser) {
      return response.status(RESPONSE_FAILURE).send({
        success: false,
        statusCode: USER_NOT_EXIST,
        message: "User doesn't exist",
      });
    }
    // Delete the user
    await existingUser.destroy();
    return response.status(RESPONSE_SUCCESS).json({
      success: true,
      statusCode: DELETE_USER_SUCCESS,
      message: "User deleted successfully",
    });
  } catch (error) {
    return response.status(RESPONSE_FAILURE).send({
      success: false,
      statusCode: DELETE_USER_FAILURE,
      message: "An error occurred during deleting user",
    });
  }
};

const getUserDetailsById = async (request, response, next) => {
  const userId = request.params.userId;
  try {
    if (!validate(userId)) {
      return response.status(RESPONSE_FAILURE).send({
        success: false,
        statusCode: MISSING_USER_ID,
        message: "Missing or Invalid User ID format",
      });
    }
    const existingUser = await Users.findOne({
      where: { id: userId },
    });
    if (!existingUser) {
      return response.status(RESPONSE_FAILURE).send({
        success: false,
        statusCode: USER_NOT_EXIST,
        message: "User doesn't exist",
      });
    }
    return response.status(RESPONSE_SUCCESS).send({
      success: true,
      statusCode: FETCH_USER_SUCCESS,
      data: existingUser,
      message: "User details fetched successfully",
    });
  } catch (error) {
    return response.status(RESPONSE_FAILURE).send({
      success: false,
      statusCode: FETCH_SINGLE_USER_FAILURE,
      message: "An error occurred during fetching user details",
    });
  }
};

const getAllUserDetails = async (request, response, next) => {
  try {
    const existingUser = await Users.findAll();
    if (!existingUser?.length) {
      return response.status(RESPONSE_SUCCESS).send({
        success: false,
        statusCode: NO_USER_AVAILABLE,
        data: [],
        message: "No users available",
      });
    }
    return response.status(RESPONSE_SUCCESS).send({
      success: true,
      statusCode: FETCH_ALL_USERS_SUCCESS,
      data: existingUser,
      message: "All users data fetched",
    });
  } catch (error) {
    return response.status(RESPONSE_FAILURE).send({
      success: false,
      statusCode: FETCH_ALL_USERS_FAILURE,
      message: "An error occurred during fetching users details",
    });
  }
};

const updateUser = async (request, response, next) => {
  const userId = request.params.userId;
  try {
    if (!validate(userId)) {
      return response.status(RESPONSE_FAILURE).send({
        success: false,
        statusCode: MISSING_USER_ID,
        message: "Missing or Invalid User ID format",
      });
    }
    const existingUser = await Users.findOne({
      where: { id: userId },
    });
    if (!existingUser) {
      return response.status(RESPONSE_FAILURE).send({
        success: false,
        statusCode: USER_NOT_EXIST,
        message: "User doesn't exist",
      });
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
    return response.status(RESPONSE_SUCCESS).send({
      success: true,
      statusCode: UPDATE_USER_DETAIL_SUCCESS,
      data: updatedObj,
      message: "User details updated",
    });
  } catch (error) {
    return response.status(RESPONSE_FAILURE).send({
      success: false,
      statusCode: UPDATE_USER_DETAIL_FAILURE,
      message: "An error occurred during updating users details",
    });
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

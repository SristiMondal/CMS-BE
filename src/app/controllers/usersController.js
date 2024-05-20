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
} = require("../../utils/constant");
const bcrypt = require("bcryptjs");
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
    response.status(RESPONSE_FAILURE).send({
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
  if (!userId) {
    response.status(RESPONSE_FAILURE).send({
      success: false,
      statusCode: MISSING_USER_ID,
      message: "Missing User ID",
    });
  }
  try {
    const existingUser = await Users.findOne({
      where: { id: userId },
    });
    console.log(existingUser, "Sfee");
    if (!existingUser) {
      response.status(RESPONSE_FAILURE).send({
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
    response.status(RESPONSE_FAILURE).send({
      success: false,
      statusCode: DELETE_USER_FAILURE,
      message: "An error occurred during deleting user",
    });
  }
};

const getUserDetails = async (request, response, next) => {
  response.send({ success: true, message: "operation failed logout" });
};

const updateUser = async (request, response, next) => {
  response.send({ success: true, message: "operation failed logout" });
};

module.exports = {
  register,
  login,
  logout,
  deleteUser,
  getUserDetails,
  updateUser,
};

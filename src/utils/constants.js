responseCode = {
  RESPONSE_SUCCESS: {
    statusCode: 200,
  },
  LOGOUT_SUCCESS: {
    statusCode: 201,
    message: "Logged out successfully",
  },
  REGISTER_SUCCESS: {
    statusCode: 202,
    message: "User registered successfully",
  },
  LOGIN_SUCCESS: {
    statusCode: 203,
    message: "Logged in successfully",
  },
  DELETE_USER_SUCCESS: {
    statusCode: 204,
    message: "User deleted successfully",
  },
  FETCH_USER_SUCCESS: {
    statusCode: 205,
    message: "User details fetched successfully",
  },
  FETCH_ALL_USERS_SUCCESS: {
    statusCode: 206,
    message: "All users data fetched",
  },
  UPDATE_USER_DETAIL_SUCCESS: {
    statusCode: 207,
    message: "User details updated successfully",
  },

  //negative cases
  USER_ALREADY_EXISTS: {
    statusCode: 401,
    message: "User already exists",
  },
  INVALID_LOGIN_EMAIL: {
    statusCode: 402,
    message: "Invalid credentials",
  },
  MISSING_LOGIN_CREDENTIAL: {
    statusCode: 404,
    message: "Email and password are required",
  },
  MISSING_USER_ID: {
    statusCode: 405,
    message: "Missing or Invalid User ID format",
  },
  USER_NOT_EXIST: {
    statusCode: 406,
    message: "User doesn't exist",
  },
  NO_USER_AVAILABLE: {
    statusCode: 407,
    message: "No users available",
  },
  REGISTER_FAILURE: {
    statusCode: 408,
    message: "Email and password are required",
  },
  INVALID_LOGIN_PASSWORD: {
    statusCode: 409,
    message: "Invalid Password",
  },

  RESPONSE_FAILURE: {
    statusCode: 500,
    message: "Server Error",
  },
};

module.exports = responseCode;

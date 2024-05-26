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
  CREATE_DEPARTMENT_SUCCESS: {
    statusCode: 208,
    message: "Department created successfully",
  },
  DEPARTMENT_UPDATED_SUCCESS: {
    statusCode: 209,
    message: "Department updated successfully",
  },
  DELETE_DEPARTMENT_SUCCESS: {
    statusCode: 210,
    message: "Department deleted successfully",
  },
  GET_ALL_DEPARTMENTS_SUCCESS: {
    statusCode: 211,
    message: "Fetched all departments",
  },
  FETCH_DEPARTMENT_BY_ID_SUCCESS: {
    statusCode: 212,
    message: "Fetched all departments",
  },
  CREATE_PROJECT_SUCCESS: {
    statusCode: 213,
    message: "Project created successfully",
  },
  PROJECT_UPDATED_SUCCESS: {
    statusCode: 214,
    message: "Project updated successfully",
  },
  DELETE_PROJECT_SUCCESS: {
    statusCode: 215,
    message: "project deleted successfully",
  },
  GET_ALL_PROJECTS_SUCCESS: {
    statusCode: 216,
    message: "Fetched all projects",
  },
  FETCH_PROJECT_BY_ID_SUCCESS: {
    statusCode: 217,
    message: "Fetched all projects",
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
  MISSING_AUTH_TOKEN: {
    statusCode: 410,
    message: "Missing Authorization Token",
  },
  INVALID_AUTH_TOKEN: {
    statusCode: 411,
    message: "Invalid Authorization Token",
  },
  MISSING_DEPARTMENT_NAME: {
    statusCode: 412,
    message: "Department name is required",
  },
  DUPLICATE_DEPARTMENT_NAME: {
    statusCode: 413,
    message: "Department name must be unique",
  },
  MISSING_DEPARTMENT_ID: {
    statusCode: 414,
    message: "Department id is missing or invalid",
  },
  INVALID_DEPARTMENT_ID: {
    statusCode: 415,
    message: "Department id is not valid",
  },
  NO_DEPARTMENT_EXISTS: {
    statusCode: 416,
    message: "No Department exists",
  },
  MISSING_PROJECT_NAME: {
    statusCode: 417,
    message: "Project name is required",
  },
  DUPLICATE_PROJECT_NAME: {
    statusCode: 418,
    message: "Project name must be unique",
  },
  MISSING_PROJECT_ID: {
    statusCode: 419,
    message: "Project id is missing or invalid",
  },
  INVALID_PROJECT_ID: {
    statusCode: 420,
    message: "Project id is not valid",
  },
  NO_PROJECT_EXISTS: {
    statusCode: 421,
    message: "No Project exists",
  },

  RESPONSE_FAILURE: {
    statusCode: 500,
    message: "Server Error",
  },
};

module.exports = responseCode;

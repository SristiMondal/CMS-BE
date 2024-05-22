const Constants = require("./constants");

exports.makeErrorResponse = (error) => {
  response = {
    success: false,
    statusCode:
      error.statusCode || Constants.responseCode[RESPONSE_FAILURE].statusCode,
    message: error.message || Constants.responseCode[RESPONSE_FAILURE].message,
    data: {},
  };
  return response;
};

const responseCode = require("./constants");

exports.makeErrorResponse = (error) => {
  response = {
    success: false,
    statusCode:
      error?.statusCode || responseCode?.[RESPONSE_FAILURE]?.statusCode,
    message: error?.message || responseCode?.[RESPONSE_FAILURE]?.message,
    data: {},
  };
  return response;
};

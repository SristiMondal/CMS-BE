const Constants = require("./constants");

module.exports = (response, success, messageCode, data) => {
  response.status(success ? 200 : 403).json({
    success,
    statusCode: Constants.responseCode[messageCode].statusCode,
    message: Constants.responseCode[messageCode].message,
    data: data || {},
  });
};

const responseCode = require("./constants");

module.exports = (response, success, messageCode, data) => {
  response.status(success ? 200 : 403).json({
    success,
    statusCode: responseCode?.[messageCode]?.statusCode || 0,
    message: responseCode?.[messageCode]?.message || "",
    data: data || {},
  });
};

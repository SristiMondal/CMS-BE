module.exports = async (request, response, next) => {
  if (request.body.email) {
    request.body.email = request.body.email.toLowerCase();
  }
  next();
};

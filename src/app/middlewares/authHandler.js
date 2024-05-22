const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const responseHandler = require("../../utils/responseHandler");
const Users = require("../../models/usersModel");
// const { redisClient } = require("../config/redisConfig");
const secretKey = process.env.SECRET_KEY;

const generateToken = async (user) => {
  const {
    id,
    first_name,
    last_name,
    designation,
    role,
    email,
    phone,
    date_of_joining,
  } = user;

  const payload = {
    id,
    first_name,
    last_name,
    designation,
    role,
    email,
    phone,
    date_of_joining,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
  // await redisClient.set(token, secretKey);
  return token;
};

verifyToken = async (request, response, next) => {
  const token = request.headers.accesstoken;
  if (!token) {
    return responseHandler(response, false, "MISSING_AUTH_TOKEN");
  }
  jwt.verify(token, secretKey, async (error, decoded) => {
    if (error) {
      return responseHandler(response, false, "INVALID_AUTH_TOKEN");
    }
    const userId = decoded.id;
    const existingUser = await Users.findOne({
      where: { id: userId ?? "" },
    });
    if (!existingUser) {
      return responseHandler(response, false, "INVALID_AUTH_TOKEN");
    }
  });
  next();
};

module.exports = { verifyToken, generateToken };

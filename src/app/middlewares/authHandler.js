const crypto = require("crypto");
const jwt = require("jsonwebtoken");
// const { redisClient } = require("../config/redisConfig");

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
  const secretKey = crypto.randomBytes(32).toString("hex");
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
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  // await redisClient.set(token, secretKey);
  return token;
};

const verifyToken = async (userId) => {};

module.exports = { verifyToken, generateToken };

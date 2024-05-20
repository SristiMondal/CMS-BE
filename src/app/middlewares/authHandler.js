const crypto = require("crypto");
const jwt = require("jsonwebtoken");
// const { redisClient } = require("../config/redisConfig");

const generateToken = async (userId) => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "30d" });
  // await redisClient.set(token, secretKey);
  return token;
};

const verifyToken = async (userId) => {};

module.exports = { verifyToken, generateToken };

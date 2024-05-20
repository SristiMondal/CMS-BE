const Redis = require("ioredis");

const redisClient = new Redis({
  host: "localhost",
  port: 6379,
});

const connectRedis = () => {
  redisClient.ping((error, result) => {
    if (error) {
      console.log("failed to connect to redis", error);
    } else {
      console.log("connected to redis", result);
    }
  });
};

module.exports = { redisClient, connectRedis };

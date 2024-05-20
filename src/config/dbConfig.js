const { Sequelize } = require("sequelize");

// Database configuration
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(
  DB_NAME, // Database name
  DB_USER, // Username (default username for PostgreSQL)
  DB_PASSWORD, // Password for the database user
  {
    host: DB_HOST, // Hostname where the PostgreSQL server is running
    port: DB_PORT, // Port number where the PostgreSQL server is listening for connections
    dialect: "postgres", // communication bridge, Dialect or type of database being used (in this case, PostgreSQL)
    logging: false,
  }
);

// Function to connect to the database
const connectDB = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connected to the database successfully!");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
};

module.exports = { sequelize, connectDB };

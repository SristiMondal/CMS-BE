const { sequelize } = require("../config/dbConfig");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const Projects = sequelize.define(
  "Projects",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    manager_id: {
      type: DataTypes.UUID,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    number_of_employees: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

(async () => {
  try {
    await Projects.sync({ alter: true });
    console.log("Projects model syncronized successfully!!");
  } catch (error) {
    console.error("Error while synchronizing Projects model", error);
  }
})();

module.exports = Projects;

const { sequelize } = require("../config/dbConfig");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const Departments = sequelize.define(
  "Departments",
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
    },
    department_head_id: {
      type: DataTypes.UUID,
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
    await Departments.sync({ alter: true });
    console.log("Departments model syncronized successfully!!");
  } catch (error) {
    console.error("Error while synchronizing Departments model", error);
  }
})();

module.exports = Departments;

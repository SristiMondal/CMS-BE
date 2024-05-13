const { sequelize } = require("../config/dbConfig");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID, // Universally unique identifier.
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    designation: {
      type: DataTypes.STRING,
    },
    work_location: {
      type: DataTypes.STRING,
    },
    project_id: {
      type: DataTypes.UUID,
    },
    department_id: {
      type: DataTypes.UUID,
    },
    manager_id: {
      type: DataTypes.UUID,
    },
    role: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_joining: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields with non-nullable constraints.
  }
);

(async () => {
  try {
    await Users.sync({ alter: true });
    console.log("Users model syncronized successfully!!");
  } catch (error) {
    console.error("Error while synchronizing Users model", error);
  }
})();

module.exports = Users;

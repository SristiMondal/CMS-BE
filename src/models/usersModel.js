const { sequelize } = require("../config/dbConfig");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");

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
      references: {
        model: "Projects",
        key: "id",
      },
    },
    department_id: {
      type: DataTypes.UUID,
      references: {
        model: "Departments",
        key: "id",
      },
    },
    manager_id: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id",
      },
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_joining: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => dayjs().format("YYYY-MM-DD HH:mm:ss"),
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields with non-nullable constraints.
  }
);

module.exports = Users;

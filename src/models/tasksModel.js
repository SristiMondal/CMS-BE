const { sequelize } = require("../config/dbConfig");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const Tasks = sequelize.define(
  "Tasks",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    heading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    assigned_to: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id",
      },
    },
    due_date: {
      type: DataTypes.DATE,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM(
        "Backlog",
        "Selected for Development",
        "bloked",
        "In Progress",
        "review",
        "Completed"
      ), // Example values
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.STRING,
    },
    epic: {
      type: DataTypes.STRING,
    },
    release: {
      type: DataTypes.STRING,
    },
    linked_task_id: {
      type: DataTypes.UUID,
      references: {
        model: "Tasks",
        key: "id",
      },
    },
    project_id: {
      type: DataTypes.UUID,
      references: {
        model: "Projects",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Tasks;

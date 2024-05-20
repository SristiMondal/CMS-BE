const sequelize = require("../config/dbConfig").sequelize;
const Users = require("./usersModel");
const Projects = require("./projectsModel");
const Departments = require("./departmentsModel");
const Tasks = require("./tasksModel");

// Define associations
Projects.belongsTo(Users, { foreignKey: "manager_id" });
Users.belongsTo(Projects, { foreignKey: "project_id" });
Users.belongsTo(Departments, { foreignKey: "department_id" });
Users.belongsTo(Users, { as: "manager", foreignKey: "manager_id" });
Departments.belongsTo(Users, { foreignKey: "department_head_id" });

Tasks.belongsTo(Users, { as: "assignee", foreignKey: "assigned_to" });
Tasks.belongsTo(Users, { as: "creator", foreignKey: "created_by" });
Tasks.belongsTo(Users, { as: "updater", foreignKey: "updated_by" });
Tasks.belongsTo(Tasks, { as: "linkedTask", foreignKey: "linked_task_id" });
Tasks.belongsTo(Projects, { foreignKey: "project_id" });

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models synchronized successfully!");
  } catch (error) {
    console.error("Error while synchronizing models", error);
  }
};

module.exports = syncModels;

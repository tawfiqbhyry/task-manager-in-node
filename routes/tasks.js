const express = require("express");
const Router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  putTask,
} = require("../controllers/tasks.js");

Router.route("/").get(getAllTasks).post(createTask);
Router.route("/:id")
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask)
  .put(putTask);

module.exports = Router;

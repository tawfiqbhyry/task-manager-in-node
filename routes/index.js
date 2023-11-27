const Router = require("express").Router();
const tasks = require(__dirname + "/tasks.js");

Router.use("/tasks", tasks);

module.exports = Router;

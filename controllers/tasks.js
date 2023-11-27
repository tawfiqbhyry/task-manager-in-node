const Task = require("../models/Task");
const AsyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/customError");

const getAllTasks = AsyncWrapper(async (req, res, next) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

const createTask = AsyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const deleteTask = AsyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const deleteTask = await Task.findOneAndDelete({ _id: taskID });
  if (!deleteTask) {
    return next(
      createCustomError(`Task with id: ${taskID} was not found!`, 404)
    );
  }
  res.status(200).json({ completed: true, deleteTask: deleteTask });
});

const getTask = AsyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(
      createCustomError(`Task with id: ${taskID} was not found!`, 404)
    );
  }
  res.status(200).json(task);
});

const updateTask = AsyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const { name, completed } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: taskID },
    { $set: { name: name, completed: completed } },
    { new: true, runValidators: true }
  );
  if (!task) {
    return next(
      createCustomError(`Task with id: ${taskID} was not found!`, 404)
    );
  }
  return res.status(200).json(task);
});

const putTask = AsyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });
  if (!task) {
    return next(
      createCustomError(`Task with id: ${taskID} was not found!`, 404)
    );
  }
  return res.status(200).json(task);
});

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  putTask,
};

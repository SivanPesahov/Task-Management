const fs = require("fs");
const Task = require("../models/task.model");
const User = require("../models/user.model");

async function getTasksByUserId(req, res) {
  const userId = req.userId;
  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching tasks" });
  }
}

async function getTasksByTaskId(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      console.log(
        `task.controller, getTaskById - task not found with id: ${id}`
      );
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `task.controller, getTaskById - task not found with id: ${id}`
      );
      return res.status(404).json({ message: "Task not found" });
    }
    console.log(
      `task.controller, getTaskById - error while getting task with id: ${id}`,
      err.name
    );
    res.status(500).json({ message: err.message });
  }
}

async function deleteTask(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const taskToDelete = await Task.findOneAndDelete({ _id: id, user: userId });

    if (!taskToDelete) {
      return res.status(404).json({ message: "task not found" });
    }

    if (taskToDelete.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this task" });
    }

    res.json({ message: "task deleted" });
  } catch (err) {
    console.log(
      `task.controller, deleteTask. Error while deleting task with id: ${id}`,
      err
    );
    res.status(500).json({ message: "Server error while deleting task" });
  }
}

async function editTask(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  const { title, description, body, todoList, isPinned, user } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description, body, todoList, isPinned, user },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      console.log(`task.controller, updateTask. task not found with id: ${id}`);
      return res.status(404).json({ message: "task not found" });
    }

    if (updatedTask.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this task" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.log(
      `task.controller, updateTask. Error while updating task with id: ${id}`,
      err
    );

    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`task.controller, updateTask. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`task.controller, updateTask. ${err.message}`);
      res.status(500).json({ message: "Server error while updating task" });
    }
  }
}

async function createTask(req, res) {
  const taskToAdd = req.body;
  const userId = req.userId;
  const newTask = new Task(taskToAdd);

  try {
    newTask.user = userId;
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.log("task.controller, createTask. Error while creating task", err);

    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`task.controller, createTask. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`task.controller, createTask. ${err.message}`);
      res.status(500).json({ message: "Server error while creating product" });
    }
  }
}

module.exports = {
  getTasksByUserId,
  getTasksByTaskId,
  deleteTask,
  editTask,
  createTask,
};

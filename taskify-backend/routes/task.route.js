const express = require("express");
const router = express.Router();
const {
  getTasksByUserId,
  getTasksByTaskId,
  deleteTask,
  editTask,
  createTask,
} = require("../controllers/task.controller");

router.get("/tasks", getTasksByUserId);
router.get("/:id", getTasksByTaskId);
router.delete("/:id", deleteTask);
router.patch("/edit/:id", editTask);
router.post("/create", createTask);

module.exports = router;

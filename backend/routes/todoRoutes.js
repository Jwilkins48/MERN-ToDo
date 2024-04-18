import requireAuth from "../middleware/requireAuth.js";
import express from "express";
import {
  createTodo,
  displayTodo,
  displayTodos,
  deleteTodos,
  updateTodos,
} from "../controllers/todoController.js";

const router = express.Router();
router.use(requireAuth);

// create todo - POST /api/todo
router.post("/", createTodo);

// all todos - /api/todo
router.get("/", displayTodos);

// single todo - /api/todo/:id
router.get("/:id", displayTodo);

// update todo - PATCH /api/todo/:id
router.patch("/:id", updateTodos);

// delete todo - DELETE /api/todo/:id
router.delete("/:id", deleteTodos);

export default router;

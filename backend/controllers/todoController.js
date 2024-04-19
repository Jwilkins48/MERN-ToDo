import mongoose from "mongoose";
import Todo from "../models/todoModel.js";

// create todo
const createTodo = async (req, res) => {
  const { todo } = req.body;

  // Input Validation
  let emptyFields = [];
  if (!todo) {
    emptyFields.push("todo");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all fields", emptyFields });
  }

  try {
    const userId = req.user._id;
    const newTodo = await Todo.create({ todo, userId });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// - /api/todo
const displayTodos = async (req, res) => {
  const userId = req.user._id;
  const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
  res.status(200).json(todos);
};

// - /api/todo/:id
const displayTodo = async (req, res) => {
  const { id } = req.params;

  // ID not valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not Todo !!!Found" });
  }

  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(400).json({ error: "Not Todo Found" });
  }

  res.status(200).json(todo);
};

const deleteTodos = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete({ _id: id });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Todo Found" });
  }

  if (!todo) {
    return res.status(400).json({ error: "No Todo Found" });
  }

  res.status(200).json(todo);
};

const updateTodos = async (req, res) => {
  const { id } = req.params;

  // Update and replace as new
  const todo = await Todo.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  // Make sure param id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  // No matching todo
  if (!todo) {
    return res.status(400).json({ error: "No Todo Found" });
  }

  res.status(200).json(req.body);
};

export { createTodo, displayTodo, displayTodos, deleteTodos, updateTodos };

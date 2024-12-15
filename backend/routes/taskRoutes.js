import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getSinngleTodo,
  updateTodo,
} from "../controllers/taskControllers.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, createTodo);

router.get("/", authenticateToken, getAllTodos);

router.get("/:id", authenticateToken, getSinngleTodo);

router.put("/:id", authenticateToken, updateTodo);

router.delete("/:id", authenticateToken, deleteTodo);

export default router;

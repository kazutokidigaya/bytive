import Todo from "../models/taskSchema.js";

const createTodo = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTodo = new Todo({
      title,
      description,
      status,
      createdBy: req.user.id,
    });

    await newTodo.save();

    res
      .status(201)
      .json({ message: "Task Created Successfully", todo: newTodo });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error Creating Task" });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const getTodos = await Todo.find({ createdBy: req.user.id });
    res.status(200).json({ todos: getTodos });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching todos." });
  }
};

const getSinngleTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOne({ _id: id, createdBy: req.user.id });
    res.status(200).json({ todo: todo });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching todo" });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error updating todo" });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteTodo = await Todo.findByIdAndDelete(id);

    if (!deleteTodo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error Deleting Todo" });
  }
};

export { createTodo, getAllTodos, getSinngleTodo, updateTodo, deleteTodo };

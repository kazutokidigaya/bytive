import { useContext, useEffect, useState } from "react";
import { getAllTodo, createTodo, updateTodo, deleteTodo } from "../api/todo";

import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading";

const Tasks = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const { logOutUser } = useContext(AuthContext);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      const res = await getAllTodo();
      setTodos(res.data.todos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setLoading(false);
    }
  };

  const handleCreateTodo = () => {
    setModalTitle("Create New Todo");
    setSelectedTodo(null); // Reset selected todo
    setIsReadOnly(false);
    setIsModalVisible(true);
  };

  const handleViewTodo = (todo) => {
    setModalTitle("View Todo");
    setSelectedTodo(todo);
    setIsReadOnly(true); // Enable read-only mode
    setIsModalVisible(true);
  };

  const handleEditTodo = (todo) => {
    setModalTitle("Edit Todo");
    setSelectedTodo(todo);
    setIsReadOnly(false); // Disable read-only mode
    setIsModalVisible(true);
  };

  const handleDeleteTodo = async (id) => {
    try {
      setLoading(true);
      await deleteTodo(id);
      setLoading(false);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success("Todo deleted successfully! 🗑️");
    } catch (error) {
      console.error("Error deleting todo:", error);
      setLoading(false);
      toast.error("Failed to delete todo. Try again later.");
    }
  };

  const handleModalSubmit = async (todo) => {
    try {
      if (selectedTodo) {
        // Update status
        setLoading(true);
        await updateTodo(selectedTodo._id, todo);
        setLoading(false);
        toast.success("Todo updated successfully! 🛠️");
      } else {
        // Create new todo
        setLoading(true);
        await createTodo(todo);
        setLoading(false);
        toast.success("Todo created successfully! 🎉");
      }
      setIsModalVisible(false);
      fetchAllTasks();
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
  };

  const handleLogout = () => {
    setLoading(true);
    logOutUser();
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 shadow-lg rounded-3xl">
        <h1 className="text-2xl font-bold">Todo Manager</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleCreateTodo}
            className="px-4 py-2 bg-blue-700 text-white rounded-2xl hover:bg-blue-800 cursor-pointer"
          >
            Create Todo
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-2xl hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Todo Cards */}
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="py-20 px-10  grid grid-cols-3 gap-6">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="w-full max-w-sm h-[240px] flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 cursor-pointer"
              onClick={() => handleViewTodo(todo)}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {todo.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {todo.description.length > 20
                  ? `${todo.description.substring(0, 80)}...`
                  : todo.description}
              </p>
              <p className="text-sm text-white font-medium mt-2">
                Status:{" "}
                <span className="text-blue-500 font-semibold">
                  {todo.status}
                </span>
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTodo(todo);
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded-lg cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTodo(todo._id);
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded-lg cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleModalSubmit}
          title={modalTitle}
          initialData={selectedTodo}
          isReadOnly={isReadOnly}
        />
      )}
    </div>
  );
};

const Modal = ({
  isVisible,
  onClose,
  onSubmit,
  title,
  initialData,
  isReadOnly,
}) => {
  const [todo, setTodo] = useState(
    initialData || { title: "", description: "", status: "pending" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(todo); // Pass the updated status to parent
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-4">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black cursor-pointer"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={todo.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              disabled={isReadOnly || initialData}
              required={!isReadOnly}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={todo.description}
              onChange={handleChange}
              rows="5"
              className="w-full p-2 border rounded"
              disabled={isReadOnly || initialData}
              required={!isReadOnly}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Status</label>
            <select
              name="status"
              value={todo.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              disabled={isReadOnly && !!initialData}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </button>
            {isReadOnly ? (
              <></>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 cursor-pointer"
              >
                {initialData ? "Update Todo" : "Create Todo"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tasks;

import { useState } from "react";

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
    onSubmit(todo);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={todo.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              disabled={isReadOnly}
              required={!isReadOnly}
            />
          </div>
          <div className="mb-4">
            <label>Description</label>
            <textarea
              name="description"
              value={todo.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded"
              disabled={isReadOnly}
              required={!isReadOnly}
            />
          </div>
          <div className="mb-4">
            <label>Status</label>
            <select
              name="status"
              value={todo.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              disabled={isReadOnly}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {!isReadOnly && (
            <button type="submit" className="bg-blue-600 text-white px-4 py-2">
              {initialData ? "Update" : "Create"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;

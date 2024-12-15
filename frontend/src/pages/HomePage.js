import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-r bg-black text-white p-4">
      {/* Welcome Section */}
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        Welcome to <span className="underline">Todo Manager</span>
      </h1>
      <p className="text-lg mb-8 max-w-lg text-center">
        Manage your tasks effortlessly! Get started by signing up or logging in.
        Create, view, and update your tasks all in one place.
      </p>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white text-lg font-medium rounded-lg shadow-lg transition-all duration-200"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white text-lg font-medium rounded-lg shadow-lg transition-all duration-200"
        >
          Signup
        </button>
      </div>

      {/* Steps Section */}
      <div className="mt-16 max-w-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <ul className="space-y-4 text-left">
          <li className="flex items-start">
            <span className="w-6 h-6 bg-white text-blue-500 font-bold flex justify-center items-center rounded-full mr-4">
              1
            </span>
            <span>Create an account by signing up.</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-white text-blue-500 font-bold flex justify-center items-center rounded-full mr-4">
              2
            </span>
            <span>Log in to your account to access the task manager.</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-white text-blue-500 font-bold flex justify-center items-center rounded-full mr-4">
              3
            </span>
            <span>Create, view, and manage your tasks easily.</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-white text-blue-500 font-bold flex justify-center items-center rounded-full mr-4">
              4
            </span>
            <span>Update task statuses or delete tasks as needed.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;

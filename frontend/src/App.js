import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import Tasks from "./pages/Tasks";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./components/PrivateRoutes";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Toaster
            position="top-right" // Customize position
            reverseOrder={false} // Notifications stack in order of appearance
            toastOptions={{
              duration: 3000, // Default duration (3 seconds)
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/tasks"
              element={
                <PrivateRoutes>
                  <Tasks />
                </PrivateRoutes>
              }
            />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};
export default App;

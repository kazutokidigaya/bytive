import { createContext, useState } from "react";
import { login, logOut, signUp } from "../api/auth";
import { setAccessToken, clearAccessToken } from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signupUser = async (name, email, password) => {
    const res = await signUp(name, email, password);
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
  };

  const loginUser = async (email, password) => {
    const res = await login(email, password);
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
  };

  const logOutUser = async () => {
    await logOut();
    clearAccessToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logOutUser, signupUser }}>
      {children}
    </AuthContext.Provider>
  );
};

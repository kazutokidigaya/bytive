import axiosInstance from "./axiosInstance";

export const login = (data) => axiosInstance.post("/auth/login", data);
export const signUp = (data) => axiosInstance.post("/auth/signup", data);
export const logOut = () => axiosInstance.post("/auth/logout");
export const refreshAccessToken = async () => {
  const res = await axiosInstance.post("/auth/refresh");
  return res.data.accessToken;
};

import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/users/register", userData);
  return response.data;
};

// ✅ Fix: accept credentials object, not 2 separate args
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/users/login", credentials);
  return response.data;
};
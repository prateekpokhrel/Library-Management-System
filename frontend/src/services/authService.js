import api from "./api";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  // Automatically save token and userId to localStorage upon successful login
  const { token, id } = response.data; // Adjust 'id' if your backend returns it as 'userId'

  if (token) {
    localStorage.setItem("token", token);
  }

  if (id) {
    localStorage.setItem("userId", id);
  }

  return response.data;
};

export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// I highly recommend adding a logout function here too!
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.href = "/login"; // Or wherever your login page is
};
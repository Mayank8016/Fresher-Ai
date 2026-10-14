// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // HTTP-only cookies ke liye zaroori hai
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  return { isLoggedIn, logout };
};
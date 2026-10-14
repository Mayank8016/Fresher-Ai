import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import VerifyOtp from "../pages/VerifyOtp";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<SignUp />} />

      <Route path="/verify-otp" element={<VerifyOtp />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
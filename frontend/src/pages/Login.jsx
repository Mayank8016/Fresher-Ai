import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api"; // Direct api.js se import

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginClick, setLoginClick] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoginClick(true);

    try {
      // Seedha api.js kaapiRequest function use kiya
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      console.log("Login successful:", data);

      // Token ya auth flag save karein taaki navbar/protected routes ko pata chale
      localStorage.setItem("token", data.token || "logged_in");

      // Seedha Dashboard par redirect (replace: true se Back button par loop nahi banega)
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Unable to connect to the server. Please try again.");
    } finally {
      setLoginClick(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-125 h-62.5 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Brand Logo */}
      <Link to="/" className="flex items-center gap-2 mb-6 relative z-10">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
          AI
        </div>
        <span className="text-2xl font-bold text-white">
          AgentHire<span className="text-indigo-400">.ai</span>
        </span>
      </Link>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-800 relative z-10"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-xs text-slate-400 mt-1">
            Login to access your AI Interview Dashboard
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div
            role="alert"
            className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 flex items-center gap-2"
          >
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-slate-300 mb-1.5"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-slate-300"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[11px] text-indigo-400 hover:text-indigo-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loginClick}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition"
        >
          {loginClick ? "Logging in..." : "Login to Dashboard →"}
        </button>

        {/* Bottom Links */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center space-y-2">
          <p className="text-xs text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Sign up
            </Link>
          </p>
          <p>
            <Link
              to="/"
              className="text-[11px] text-slate-500 hover:text-slate-300 transition"
            >
              ← Back to Home
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
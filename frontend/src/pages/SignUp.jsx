import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [clickEmailVerify, setClickEmailVerify] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // SEND OTP
  const handleVerifyClick = async () => {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email first.");
      return;
    }

    try {
      setSendingOtp(true);

      const data = await apiRequest("/auth/send-signup-otp", {
        method: "POST",
        body: JSON.stringify({ email: email.trim() }),
      });

      setClickEmailVerify(true);
      setMessage(data.message || "OTP sent successfully. Check your email.");
    } catch (err) {
      setError(err.message || "Failed to send OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  // VERIFY OTP
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      setVerifyingOtp(true);

      const data = await apiRequest("/auth/verify-signup-otp", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
        }),
      });

      if (!data.verificationToken) {
        throw new Error(
          "Verification token missing from server response."
        );
      }

      setVerificationToken(data.verificationToken);
      setEmailVerified(true);
      setClickEmailVerify(false);
      setOtp("");
      setMessage("Email verified successfully.");
    } catch (err) {
      setError(err.message || "OTP verification failed.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // RESEND OTP
  const handleResendOtp = async () => {
    setError("");
    setMessage("");

    try {
      setSendingOtp(true);

      const data = await apiRequest("/auth/send-signup-otp", {
        method: "POST",
        body: JSON.stringify({ email: email.trim() }),
      });

      setOtp("");
      setMessage(data.message || "New OTP sent successfully.");
    } catch (err) {
      setError(err.message || "Failed to resend OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  // REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!emailVerified || !verificationToken) {
      setError("Please verify your email first.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setCreatingAccount(true);

      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          verificationToken,
        }),
      });

      setMessage(data.message || "Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed.");
    } finally {
      setCreatingAccount(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden font-sans">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <Link to="/" className="flex items-center gap-2 mb-6 relative z-10">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
          AI
        </div>
        <span className="text-2xl font-bold text-white">
          AgentHire<span className="text-indigo-400">.ai</span>
        </span>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-800 relative z-10"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-xs text-slate-400 mt-1">
            Sign up to start your AI mock interviews
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400"
          >
            {error}
          </div>
        )}

        {/* NAME */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1.5">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
            required
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            disabled={emailVerified}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
          />
        </div>

        {/* SEND OTP */}
        {!emailVerified && !clickEmailVerify && (
          <button
            type="button"
            onClick={handleVerifyClick}
            disabled={sendingOtp}
            className="w-full mb-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-sm font-semibold text-white transition"
          >
            {sendingOtp ? "Sending OTP..." : "Verify Email"}
          </button>
        )}

        {/* OTP INPUT + VERIFY */}
        {clickEmailVerify && !emailVerified && (
          <div className="mb-4 p-4 rounded-xl bg-slate-950 border border-indigo-500/30">
            <h2 className="text-sm font-semibold text-white mb-1">
              Verify your email
            </h2>
            <p className="text-xs text-slate-400 mb-3">
              Enter the OTP sent to {email}
            </p>

            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\\D/g, "").slice(0, 6))
              }
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />

            <button
              type="button"
              onClick={handleOtpVerify}
              disabled={verifyingOtp || otp.length !== 6}
              className="w-full mt-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-sm font-semibold text-white"
            >
              {verifyingOtp ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={sendingOtp}
              className="w-full mt-3 py-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
            >
              {sendingOtp ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        )}

        {emailVerified && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <p className="text-xs text-emerald-400 font-medium">
              ✓ Email verified successfully
            </p>
          </div>
        )}

        {/* PASSWORD */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="password" className="block text-xs font-medium text-slate-300">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-[11px] text-indigo-400 hover:text-indigo-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            disabled={!emailVerified}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={emailVerified ? "Enter your password" : "Verify email first"}
            autoComplete="new-password"
            required
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
          />
        </div>

        {/* REGISTER */}
        <button
          type="submit"
          disabled={!emailVerified || !verificationToken || creatingAccount}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-sm font-semibold text-white transition"
        >
          {creatingAccount ? "Creating Account..." : "Create Account →"}
        </button>

        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
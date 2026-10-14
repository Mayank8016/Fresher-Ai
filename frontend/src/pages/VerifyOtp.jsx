import React, { useState } from "react";

const VerifyOtp = ({ email, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid OTP.");
        return;
      }

      // OTP verified successfully
      // Send verification token to SignUp
      onVerified(data.verificationToken);

    } catch (err) {
      console.error(err);

      setError(
        "Something went wrong while verifying OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (otp.length === 6 && !loading) {
        handleVerify();
      }
    }
  };

  return (
    <div className="w-full">

      {/* OTP Input */}
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={otp}
        onChange={(e) => {
          const value = e.target.value;

          // Allow numbers only
          if (/^\d*$/.test(value)) {
            setOtp(value);
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder="Enter 6-digit OTP"
        className="w-full px-4 py-3 rounded-lg border border-gray-300
                   text-gray-900 placeholder-gray-400
                   text-center tracking-widest text-lg font-mono
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   focus:border-indigo-500"
      />

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 mt-2">
          {error}
        </p>
      )}

      {/* Verify Button */}
      <button
        type="button"
        onClick={handleVerify}
        disabled={loading || otp.length !== 6}
        className="w-full mt-3 py-3 rounded-lg
                   bg-indigo-600 text-white font-semibold
                   hover:bg-indigo-700
                   disabled:bg-indigo-300
                   disabled:cursor-not-allowed
                   active:scale-[0.98]
                   transition duration-200"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

    </div>
  );
};

export default VerifyOtp;

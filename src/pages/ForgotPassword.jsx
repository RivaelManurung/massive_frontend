import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Step 1: Email input, Step 2: OTP input

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/forgot-password", { email });
      setMessage(response.data.message);
      setStep(2); // Beralih ke langkah 2 setelah sukses
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/reset-password", {
        email,
        otp,
        newPassword,
      });
      setMessage(response.data.message);
      setStep(3); // Beralih ke langkah 3 setelah sukses
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">Forgot Password</h2>

      {/* Step 1: Input Email */}
      {step === 1 && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text text-black">Email Address</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full text-black bg-white"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Send OTP
          </button>
        </form>
      )}

      {/* Step 2: Input OTP and New Password */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="form-control">
            <label htmlFor="otp" className="label">
              <span className="label-text text-black">Enter OTP</span>
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="input input-bordered w-full text-black bg-white"
            />
          </div>
          <div className="form-control">
            <label htmlFor="newPassword" className="label">
              <span className="label-text text-black">New Password</span>
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="input input-bordered w-full text-black bg-white"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Reset Password
          </button>
        </form>
      )}

      {/* Step 3: Success Message */}
      {step === 3 && (
        <div className="text-center">
          <h3 className="text-xl font-bold text-success">Password Reset Successful</h3>
          <p className="mt-2">You can now log in with your new password.</p>
        </div>
      )}

      {/* Message and Error Display */}
      {message && <p className="text-success mt-4">{message}</p>}
      {error && <p className="text-error mt-4">{error}</p>}
    </div>
  );
};

export default ForgotPassword;

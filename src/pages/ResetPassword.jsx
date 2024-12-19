import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/reset-password", {
        otp,
        newPassword,
      });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="otp" style={{ display: "block", marginBottom: "5px" }}>
            OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="newPassword" style={{ display: "block", marginBottom: "5px" }}>
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Reset Password
        </button>
      </form>
      {message && <p style={{ color: "green", marginTop: "15px" }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;

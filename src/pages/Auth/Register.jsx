import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; 

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // Add phone state
  const [error, setError] = useState(""); // Store error message
  const [successMessage, setSuccessMessage] = useState(""); // Store success message
  const navigate = useNavigate(); // Hook for navigation

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    // Form validation
    if (!name || !email || !password || !phone) {
      setError("Semua field harus diisi!");
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Email tidak valid!");
      return;
    }

    // Phone validation (basic example, you can adjust for specific formats)
    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(phone)) {
      setError("Nomor telepon tidak valid! (Harus terdiri dari 10-15 angka)");
      return;
    }

    // Password validation (min 6 characters for example)
    if (password.length < 6) {
      setError("Kata sandi harus memiliki minimal 6 karakter!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/register", { // Adjust the API route if needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone }), // Include phone in the body
      });

      const data = await response.json();

      // Check if the response status is OK
      if (response.ok) {
        setSuccessMessage("Registrasi berhasil! Silahkan login.");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after 2 seconds
        }, 2000); // Delay 2 seconds before navigation
      } else {
        // Handle specific errors based on response from API
        if (data.errors) {
          setError(data.errors.map(err => err.msg).join(", ")); // If there are specific errors from API
        } else {
          setError(data.message || "Terjadi kesalahan, coba lagi.");
        }
      }
    } catch (error) {
      setError("Terjadi kesalahan pada server, coba lagi.");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-11/12 max-w-4xl rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Section */}
        <div style={{ backgroundColor: '#055941' }} className="p-10 text-white flex flex-col items-center justify-center">
          <img src={logo} alt="Logo" className="mb-6 w-48" />
          <h1 className="text-3xl font-bold mb-4">Selamat Datang</h1>
          <p className="text-center">Silahkan masuk dengan akun anda untuk mendapatkan informasi terbaru!</p>
        </div>

        {/* Right Section */}
        <div className="bg-white p-10">
          <h2 className="text-2xl text-center text-black font-bold mb-5">Buat Akun</h2>

          {/* Show success message */}
          {successMessage && (
            <div className="bg-green-500 text-white p-3 mb-4 rounded">
              {successMessage}
            </div>
          )}

          {/* Show error message */}
          {error && (
            <div className="bg-red-500 text-white p-3 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-control mb-4">
              <input
                type="text"
                placeholder="Nama"
                className="input bg-white input-bordered w-full text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <input
                type="email"
                placeholder="Email"
                className="input bg-white input-bordered w-full text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <input
                type="text"
                placeholder="Nomor Telepon"
                className="input bg-white input-bordered w-full text-black"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <input
                type="password"
                placeholder="Kata sandi"
                className="input bg-white input-bordered w-full text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-end items-center mb-6 text-sm text-black">
              <span>Sudah memiliki akun?</span>
              <a href="/login" className="text-blue-600 ml-1">
                Masuk
              </a>
            </div>
            <button type="submit" className="btn btn-success w-full bg-[#16A34A] text-white">
              Daftar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

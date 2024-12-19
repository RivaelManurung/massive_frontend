import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function LoginPage({ setIsLoggedIn, setIsAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Cek jika user sudah login
    const token = localStorage.getItem("token");
    if (token) {
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      setIsLoggedIn(true);
      setIsAdmin(isAdmin);
      navigate(isAdmin ? "/admin" : "/"); // Arahkan ke halaman yang sesuai
    }
  }, [setIsLoggedIn, setIsAdmin, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent page reload
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          setIsAdmin(true);
          setIsLoggedIn(true);
          window.location.href = "/admin"; // Redirect to admin dashboard
        } else {
          setIsAdmin(false);
          setIsLoggedIn(true);
          window.location.href = "/"; // Redirect to homepage
        }
      } else {
        setError(data.message || "Gagal Login ");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-11/12 max-w-4xl rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-10 text-white bg-[#055941] flex flex-col items-center justify-center">
          <img src={logo} alt="Company Logo" className="mb-6 w-48" />
          <h1 className="text-3xl font-bold mb-4">Selamat Datang</h1>
          <p className="text-center">
            Silahkan masuk dengan akun anda untuk mendapatkan informasi terbaru!
          </p>
        </div>

        <div className="bg-white p-10">
          <h2 className="text-2xl text-center text-black font-bold mb-5">
            Masuk
          </h2>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-control mb-4">
              <input
                type="email"
                placeholder="Email"
                className="input bg-white input-bordered w-full text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Kata Sandi"
                className="input bg-white input-bordered w-full text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm text-gray-600">
                Tampilkan Kata Sandi
              </label>
            </div>

            <div className="flex justify-between items-center mb-6 text-sm text-black">
              <span>Belum memiliki akun?</span>
              <a href="/register" className="text-blue-600 ml-1">
                Daftar
              </a>
            </div>
            <div className="flex justify-end mb-4">
              <a href="/forgot-password" className="text-blue-600 text-sm">
                Lupa Kata Sandi?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-success w-full bg-[#16A34A] text-white"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaHome,
  FaBook,
  FaVideo,
  FaComments,
} from "react-icons/fa";
import { useUser } from "./UserContext";

const LoginModal = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Login Diperlukan
      </h2>
      <p className="text-gray-600 mb-4">
        Anda perlu login untuk mengakses Forum.
      </p>
    </div>
  </div>
);

const UserNavbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUser();

  const isAdmin = user?.role === "admin";
  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleForumClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      navigate("/forum");
    }
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-lime-600 text-white"
      : "text-gray-300 hover:text-white";

  useEffect(() => {
    if (isModalOpen) {
      // Hide modal after 3 seconds
      const timer = setTimeout(() => {
        setIsModalOpen(false);
        navigate("/login");
      }, 2000);

      // Cleanup the timer if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, navigate]);

  return (
    <>
      <nav className="bg-gradient-to-r from-green-600 to-lime-600 p-3 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold text-white">
            AgriLearn
          </Link>

          <div className="hidden lg:flex space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 py-2 px-4 rounded-lg ${isActive(
                "/"
              )}`}
            >
              <FaHome size={18} /> <span>Home</span>
            </Link>
            <Link
              to="/article"
              className={`flex items-center space-x-2 py-2 px-4 rounded-lg ${isActive(
                "/article"
              )}`}
            >
              <FaBook size={18} /> <span>Artikel</span>
            </Link>
            <Link
              to="/videos"
              className={`flex items-center space-x-2 py-2 px-4 rounded-lg ${isActive(
                "/videos"
              )}`}
            >
              <FaVideo size={18} /> <span>Video</span>
            </Link>
            <button
              onClick={handleForumClick}
              className={`flex items-center space-x-2 py-2 px-4 rounded-lg ${isActive(
                "/forum"
              )}`}
            >
              <FaComments size={18} /> <span>Forum</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="text-white flex items-center space-x-2 py-2 px-4 rounded-lg hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <FaUserCircle size={20} />
                  <span>Profile</span>
                </button>
                {isMenuOpen && (
                  <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 text-black z-50">
                    <li>
                      <Link
                        to={`/profile/${user?.id}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profil
                      </Link>
                    </li>
                    {isAdmin && (
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Keluar
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-outline text-white hover:bg-lime-500"
              >
                Masuk
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white"
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white text-black p-4 space-y-4">
            <Link
              to="/"
              className={`block py-2 px-4 rounded-lg ${isActive("/")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/article"
              className={`block py-2 px-4 rounded-lg ${isActive("/article")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Artikel
            </Link>
            <Link
              to="/videos"
              className={`block py-2 px-4 rounded-lg ${isActive("/videos")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Video
            </Link>
            <button
              onClick={() => {
                handleForumClick(); // Panggil fungsi forum
                setIsMenuOpen(false); // Tutup menu
              }}
              className={`block py-2 px-4 rounded-lg ${isActive("/forum")}`}
            >
              Forum
            </button>
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="block py-2 px-4 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profil
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="block py-2 px-4 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="block py-2 px-4 rounded-lg"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 px-4 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Masuk
              </Link>
            )}
          </div>
        )}
      </nav>

      {isModalOpen && <LoginModal />}
    </>
  );
};

export default UserNavbar;

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTags,
  FaFileAlt,
  FaVideo,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";
import Profile from "../assets/logo.png";

const AdminSidebar = ({ setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to check if the link is active
  const isActive = (path) =>
    location.pathname === path
      ? "bg-green-800 text-white font-bold"
      : "hover:bg-green-700 hover:text-white";

  // Handle sign out functionality
  const handleSignOut = () => {
    setIsLoggedIn(false); // Update the logged-in state
    localStorage.removeItem("token"); // Remove the token from localStorage
    localStorage.removeItem("isAdmin"); // Optional: clear the isAdmin flag
    navigate("/login"); // Redirect to login page
  };

  return (
    <aside className="w-64 bg-[#055941] text-white h-screen flex flex-col">
      {/* Admin profile section */}
      <div className="flex flex-col items-center p-6 border-b border-green-700">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img
            src={Profile}
            alt="Admin Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold">AgriLearn</h2>
        <p className="text-sm text-gray-300">Admin</p>
      </div>

      {/* Sidebar navigation links */}
      <ul className="mt-4 space-y-2 px-4">
        <li className={`rounded-lg ${isActive("/admin")}`}>
          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-2 text-base"
          >
            <FaHome /> <span>Dashboard</span>
          </Link>
        </li>
        <li className={`rounded-lg ${isActive("/admin/articles")}`}>
          <Link
            to="/admin/articles"
            className="flex items-center gap-3 px-4 py-2 text-base"
          >
            <FaFileAlt /> <span>Artikel</span>
          </Link>
        </li>
        <li className={`rounded-lg ${isActive("/admin/videos")}`}>
          <Link
            to="/admin/videos"
            className="flex items-center gap-3 px-4 py-2 text-base"
          >
            <FaVideo /> <span>Video</span>
          </Link>
        </li>
        <li className={`rounded-lg ${isActive("/admin/forum")}`}>
          <Link
            to="/admin/forum"
            className="flex items-center gap-3 px-4 py-2 text-base"
          >
            <FaComments /> <span>Forum</span>
          </Link>
        </li>
      </ul>

      {/* Logout button */}
      <div className="p-4">
        <button
          className="btn btn-outline btn-red-500 hover:bg-red-500 hover:text-white w-full flex items-center justify-center"
          onClick={handleSignOut}
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

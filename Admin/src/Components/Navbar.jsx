import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { authDataContext } from "../Contexts/AuthContext";
import { adminDataContext } from "../Contexts/AdminContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentAdmin } = useContext(adminDataContext);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      getCurrentAdmin();
      navigate("/login");
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-md shadow-md border-b border-white/20">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Vishal Mart" className="w-9 h-9" />
        <span className="text-white font-semibold text-xl tracking-wide">
          Vishal Mart
        </span>
      </div>
      <button
        onClick={handleLogout}
        aria-label="Logout"
        className="p-2 rounded hover:bg-white/20 transition"
      >
        <FaSignOutAlt size={22} className="text-white" />
      </button>
    </nav>
  );
}

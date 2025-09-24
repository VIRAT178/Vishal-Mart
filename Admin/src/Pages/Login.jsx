import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { authDataContext } from "../Contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { adminDataContext } from "../Contexts/AdminContext";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, staggerChildren: 0.15, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { adminData, getCurrentAdmin } = useContext(adminDataContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        serverUrl + "/api/auth/adminLogin",
        { email, password },
        { withCredentials: true }
      );
      toast.success("Logged in successfully!");

      await getCurrentAdmin(); 

      if (adminData && Object.keys(adminData).length > 0) {
        navigate("/");
      } else {
        toast.error("Failed to retrieve admin data after login.");
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error("Login failed: " + msg);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1e1e2e] to-[#0f172a] flex flex-col items-center px-6 sm:px-8 md:px-12 lg:px-20 py-10">
      <motion.div
        className="flex flex-col items-center mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <img src={logo} alt="Logo" className="w-20 sm:w-28 mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-1">
          Login to Vishal Mart Admin Panel
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-md text-center">
          Shop what you want with a seamless experience
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 flex flex-col gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.input
          type="email"
          placeholder="Email"
          required
          className="w-full h-12 bg-transparent border border-white/30 rounded-lg px-4 placeholder-gray-300 text-gray-200 text-base font-medium focus:border-indigo-500 focus:outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variants={itemVariants}
        />

        <motion.div className="relative" variants={itemVariants}>
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            required
            className="w-full h-12 bg-transparent border border-white/30 rounded-lg px-4 pr-12 placeholder-gray-300 text-gray-200 text-base font-medium focus:border-indigo-500 focus:outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <FaEyeSlash size={20} /> : <FaRegEye size={20} />}
          </button>
        </motion.div>

        <motion.button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg text-white font-semibold text-lg shadow-lg hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 active:scale-95 transition-transform"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </motion.form>
      <motion.p
        className="text-center text-gray-300 text-xs sm:text-sm mt-3 max-w-xs"
        variants={itemVariants}
      >
        New User Want Create Account?{" "}
        <span
          className="text-blue-400 hover:text-blue-300 cursor-pointer font-semibold"
          onClick={() => navigate("/signup")}
        >
          SignUp
        </span>
      </motion.p>
    </div>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { authDataContext } from "../Contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const Registration = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/adminSignup",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
      toast.error(
        "Failed to create account: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1e1e2e] to-[#0f172a] flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 select-none">
      <motion.div
        className="text-center mt-6 mb-4 max-w-xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <img src={logo} alt="Logo" className="w-24 sm:w-32 mx-auto mb-6" />
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-300 leading-tight tracking-wide mb-2">
          Admin Sign Up
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto">
          Welcome to Vishal Mart, shop what you want with confidence!
        </p>
      </motion.div>

      <motion.div
        className="max-w-md w-full bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl shadow-2xl px-6 sm:px-10 py-8 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.form
          className="w-full flex flex-col gap-5"
          variants={containerVariants}
          onSubmit={handleSignup}
          noValidate
        >
          <motion.input
            type="email"
            placeholder="Email"
            required
            className="w-full h-12 bg-transparent border border-white/30 rounded-lg px-4 placeholder-gray-400 text-gray-100 font-semibold focus:border-[#536DFE] focus:outline-none transition-colors text-base sm:text-lg"
            variants={itemVariants}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="email"
          />

          <motion.div className="relative w-full" variants={itemVariants}>
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full h-12 bg-transparent border border-white/30 rounded-lg px-4 pr-12 placeholder-gray-400 text-gray-100 font-semibold focus:border-[#536DFE] focus:outline-none transition-colors text-base sm:text-lg"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShow((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition focus:outline-none"
              aria-label={show ? "Hide password" : "Show password"}
              tabIndex={0}
            >
              {show ? <FaEyeSlash size={20} /> : <FaRegEye size={20} />}
            </button>
          </motion.div>

          <motion.button
            type="submit"
            disabled={!email || !password}
            className="w-full h-12 sm:h-14 bg-gradient-to-r from-[#536DFE] to-[#FF6F61] rounded-xl text-white font-extrabold shadow-lg hover:from-[#4b5bdb] hover:to-[#ff5f46] focus:outline-none focus:ring-4 focus:ring-[#ff6f61cc] transition-transform duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Account
          </motion.button>
        </motion.form>

        <motion.p
          className="text-center text-gray-400 text-sm sm:text-base mt-6 max-w-xs"
          variants={itemVariants}
        >
          Already have an account?{" "}
          <span
            className="text-[#536DFE] hover:text-[#FF6F61] cursor-pointer font-semibold transition-colors"
            onClick={() => navigate("/login")}
            role="button"
            tabIndex={0}
          >
            Login
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Registration;

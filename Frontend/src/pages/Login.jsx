import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import google_logo from "../assets/google_logo.svg";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { authDataContext } from "../Contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../uits/Firebase.js";
import { userDataContext } from "../Contexts/userContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("Logged in successfully!");
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      toast.error(
        "Failed to create account: " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  const googlelogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;
      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("Logged in Successfully");
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      toast.error(
        "Failed to create account: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1e1e2e] to-[#0f172a] flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12">
     

      <motion.div
        className="text-center mt-4 mb-2 max-w-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-[22px] sm:text-[26px] text-gray-300 font-bold leading-none mb-2">
          Login Page
        </h2>
        <p className="text-[14px] sm:text-[15px] text-gray-300">
          Welcome to Vishal Mart, Shop what you want
        </p>
      </motion.div>

      <motion.div
        className="max-w-md w-full bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl shadow-2xl px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.form
          onSubmit={handleLogin}
          className="w-full flex flex-col gap-3"
          variants={containerVariants}
        >
          <motion.div
            className="w-full h-12 bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] rounded-lg flex items-center justify-center gap-2 text-white font-semibold cursor-pointer hover:opacity-90 transition mb-2"
            whileHover={{ scale: 1.05 }}
            onClick={googlelogin}
          >
            <img
              src={google_logo}
              alt="Google"
              className="w-4 sm:w-5 bg-white rounded-full"
            />
            Login with Google
          </motion.div>

          <motion.div
            className="flex items-center gap-2 my-2"
            variants={itemVariants}
          >
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-2 text-gray-400 text-xs sm:text-sm">OR</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </motion.div>

          <motion.input
            type="email"
            placeholder="Email"
            required
            className="w-full h-11 bg-transparent border border-white/30 rounded-lg px-3 sm:px-4 placeholder-gray-300 font-medium focus:border-blue-400 focus:outline-none transition text-sm sm:text-base"
            variants={itemVariants}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <motion.div className="relative w-full" variants={itemVariants}>
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full h-11 bg-transparent border border-white/30 rounded-lg px-3 pr-10 sm:px-4 placeholder-gray-300 font-medium focus:border-blue-400 focus:outline-none transition text-sm sm:text-base"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white cursor-pointer"
              onClick={() => setShow((p) => !p)}
            >
              {show ? <FaEyeSlash size={18} /> : <FaRegEye size={18} />}
            </span>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full h-11 sm:h-12 mt-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-lg text-base sm:text-lg font-semibold shadow-md"
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
          Want new account?{" "}
          <span
            className="text-blue-400 hover:text-blue-300 cursor-pointer font-semibold"
            onClick={() => navigate("/signup")}
          >
            New Account
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import axios from "axios";
import { authDataContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FiSend } from "react-icons/fi";

const NAVY_BLUE = "#1A237E";
const SOFT_GRAY = "#ECEFF1";
const CORAL = "#FF6F61";

function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(serverUrl + "/api/suscriber", { email });
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      const msg = err.response?.data?.message || "Subscription failed, please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative rounded-2xl w-full min-h-[400px] flex flex-col items-center justify-center p-6 overflow-hidden transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, ${NAVY_BLUE} 0%, ${CORAL} 100%)`,
      }}
    >
      <svg
        className="absolute top-10 left-8 w-20 h-20 opacity-20 animate-spin-slow"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        style={{ color: SOFT_GRAY }}
      >
        <circle cx="12" cy="12" r="10" strokeDasharray="31.4" strokeLinecap="round" />
      </svg>
      <svg
        className="absolute bottom-16 right-10 w-16 h-16 opacity-25"
        viewBox="0 0 100 100"
        fill="none"
        style={{ color: SOFT_GRAY }}
      >
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="5" />
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="3" />
      </svg>

      <div
        className="max-w-md w-full mx-auto p-8 rounded-3xl shadow-xl font-sans animate-fadeInDown relative z-10"
        style={{ backgroundColor: `${SOFT_GRAY}CC`, color: NAVY_BLUE }} 
      >
        <div className="flex items-center justify-center mb-6 space-x-3">
          <HiOutlineMailOpen className="text-4xl" style={{ color: CORAL }} />
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight" style={{ color: NAVY_BLUE }}>
            Subscribe to our Newsletter
          </h2>
        </div>
        <p className="mb-8 text-center font-medium animate-fadeIn delay-100 px-2" style={{ color: NAVY_BLUE }}>
          Stay updated with our latest offers and products.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 w-full animate-fadeIn delay-200"
          noValidate
        >
          <input
            type="email"
            aria-label="Email address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl px-5 py-3 font-semibold focus:outline-none focus:ring-4 transition-shadow shadow-md placeholder:text-corral-600"
            style={{
              color: NAVY_BLUE,
              backgroundColor: SOFT_GRAY,
              borderColor: CORAL,
            }}
            disabled={loading}
            required
          />
          <button
            type="submit"
            disabled={loading || !email}
            className="flex items-center justify-center font-bold rounded-xl px-6 py-3 shadow-lg transition duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed animate-pulse"
            style={{
              backgroundColor: CORAL,
              color: SOFT_GRAY,
            }}
          >
            {loading ? (
              "Subscribing..."
            ) : (
              <>
                Subscribe <FiSend className="ml-2 text-lg" />
              </>
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s cubic-bezier(.79,-.44,.43,1.21) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0;}
          to { opacity: 1;}
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg);}
          to { transform: rotate(360deg);}
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default SubscribeForm;

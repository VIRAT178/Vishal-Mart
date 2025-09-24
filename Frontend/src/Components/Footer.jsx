import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const NAVY_BLUE = "#1A237E";
const SOFT_GRAY = "#ECEFF1";
const CORAL = "#FF6F61";

function Footer() {
  return (
    <footer
      className="relative text-white py-12 px-6 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${NAVY_BLUE} 0%, ${CORAL} 100%)`,
      }}
    >
      <svg
        className="absolute top-8 left-8 w-24 h-24 opacity-20 animate-spin-slow text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        style={{ color: SOFT_GRAY }}
      >
        <circle cx="12" cy="12" r="10" strokeDasharray="31.4" strokeLinecap="round" />
      </svg>
      <svg
        className="absolute bottom-12 right-12 w-20 h-20 opacity-25 text-white"
        viewBox="0 0 100 100"
        fill="none"
        style={{ color: SOFT_GRAY }}
      >
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="5" />
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="3" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between space-y-10 md:space-y-0">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:w-1/4">
          <img src={logo} alt="Logo" className="h-16 w-auto mb-2 animate-fadeIn" />
          <p className="max-w-xs text-[rgba(255,255,255,0.75)] animate-fadeIn delay-100">
            Connecting you with the best products and services with trust and excellence.
          </p>
          <div className="flex space-x-5 mt-2">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="text-white text-xl p-3 rounded-full shadow-lg transition duration-300 transform hover:scale-110 animate-fadeIn"
                style={{
                  backgroundColor: NAVY_BLUE,
                  boxShadow: `0 0 8px ${CORAL}`,
                  animationDelay: `${(idx + 2) * 0.1}s`,
                }}
                aria-label="Social media link"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = NAVY_BLUE)}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <nav className="flex flex-col w-full md:w-1/3 justify-between sm:flex-row space-y-10 sm:space-y-0 sm:space-x-12">
          <div className="animate-fadeIn delay-200">
            <h3
              className="font-bold mb-4 text-lg border-b pb-2 uppercase"
              style={{ borderColor: CORAL }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 text-[rgba(255,255,255,0.85)]">
              <li>
                <Link to="/" className="hover:text-[#FFC0B4] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-[#FFC0B4] transition">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/contect" className="hover:text-[#FFC0B4] transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#FFC0B4] transition">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fadeIn delay-300">
            <h3
              className="font-bold mb-4 text-lg border-b pb-2 uppercase"
              style={{ borderColor: CORAL }}
            >
              Support
            </h3>
            <ul className="space-y-2 text-[rgba(255,255,255,0.85)]">
              <li>
                <Link to="/" className="hover:text-[#FFC0B4] transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#FFC0B4] transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#FFC0B4] transition">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#FFC0B4] transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div
          className="animate-fadeIn delay-400 flex flex-col md:w-1/4 space-y-4"
          style={{ color: SOFT_GRAY }}
        >
          <h3
            className="font-bold mb-4 text-lg border-b pb-2 uppercase"
            style={{ borderColor: CORAL, color: SOFT_GRAY }}
          >
            Contact Us
          </h3>
          <p>Email: support@VishalMart.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 1234 Market Street, Indore, Madhya Pradesh</p>
        </div>
      </div>

      <p className="mt-12 text-center text-[rgba(255,255,255,0.6)] text-sm animate-fadeIn delay-500">
        &copy; {new Date().getFullYear()} Vishal Mart. All rights reserved.
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
      `}</style>
    </footer>
  );
}

export default Footer;

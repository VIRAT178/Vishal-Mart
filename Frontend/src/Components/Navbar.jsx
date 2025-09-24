import "../../src/Animation.css";
import React, { useContext, useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { IoSearch } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { MdOutlineShoppingCart, MdContactPhone } from "react-icons/md";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { BsCollection } from "react-icons/bs";
import { userDataContext } from "../Contexts/userContext";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { shopDataContext } from "../Contexts/ShopContext";

const NAV_ITEMS_COMMON = [
  { label: "HOME", route: "/", icon: <FaHome className="w-6 h-6" /> },
  { label: "COLLECTIONS", route: "/collections", icon: <BsCollection className="w-6 h-6" /> },
  { label: "CONTACT", route: "/contect", icon: <MdContactPhone className="w-6 h-6" /> },
  { label: "ABOUT", route: "/about", icon: <FaShoppingCart className="w-6 h-6" /> },
];

const NAVY_BLUE = "#1A237E";
const SOFT_GRAY = "#ECEFF1";
const CORAL = "#FF6F61";
const TEXT_GRAY = "#37474F";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { showSearch, setShowSearch, search, setSearch ,getCartCount} = useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const { userData, getCurrentUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      getCurrentUser();
      navigate("/login");
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error(error.message);
    }
    setShowProfile(false);
    setMenuOpen(false);
  };

  const handleNavClick = (route) => {
    navigate(route);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 w-full h-[70px] z-50 shadow-md flex items-center justify-between px-6 sm:px-12 transition-all duration-300"
        style={{
          backgroundColor: SOFT_GRAY,
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
          style={{ color: NAVY_BLUE }}
        >
          <img
            src={logo}
            alt="logo"
            className="w-[70px] sm:w-[90px] hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="hidden md:flex">
          <ul className="flex items-center gap-6 text-sm font-medium" style={{ color: TEXT_GRAY }}>
            {NAV_ITEMS_COMMON.map((item) => (
              <li
                key={item.label}
                style={{ cursor: "pointer" }}
                className="relative px-4 py-2 rounded-xl transition-all duration-300"
                onClick={() => handleNavClick(item.route)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = CORAL;
                  e.currentTarget.style.color = SOFT_GRAY;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = TEXT_GRAY;
                }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300"></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 relative" style={{ color: TEXT_GRAY }}>
          {userData && (
            <>
              <IoSearch
                onClick={() => {
                  setShowSearch(!showSearch);
                  navigate("/collections");
                }}
                className="w-6 h-6 transition-transform duration-300 hover:scale-110 cursor-pointer hidden sm:block"
                title="Toggle Search"
                aria-label="Toggle Search"
                style={{ color: NAVY_BLUE }}
                onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.color = NAVY_BLUE)}
              />

              <div className="relative">
                <MdOutlineShoppingCart
                  className="w-6 h-6 transition-transform duration-300 hover:scale-110 cursor-pointer"
                  aria-label="Cart"
                  onClick={() => navigate("/cart")}
                  style={{ color: NAVY_BLUE }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = NAVY_BLUE)}
                />
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-white text-[10px] font-bold rounded-full shadow-md animate-bounce"
                  style={{
                    backgroundColor: CORAL,
                  }}
                >
                 {getCartCount()}
                </span>
              </div>
            </>
          )}

          {!userData ? (
            <FiLogIn
              className="w-6 h-6 cursor-pointer hidden sm:block"
              aria-label="Login"
              onClick={() => navigate("/login")}
              style={{ color: NAVY_BLUE }}
              onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
              onMouseLeave={(e) => (e.currentTarget.style.color = NAVY_BLUE)}
            />
          ) : (
            <div className="relative">
              <div
                className="w-[35px] h-[35px] rounded-full flex items-center justify-center font-bold shadow-md cursor-pointer transition-all duration-300"
                title={userData?.name}
                onClick={() => setShowProfile((pre) => !pre)}
                aria-label="Show Profile"
                style={{
                  backgroundColor: CORAL,
                  color: SOFT_GRAY,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow = `0 0 10px ${CORAL}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>

              {showProfile && (
                <div
                  className="absolute right-0 mt-2 w-[220px] rounded-[10px] z-55"
                  style={{ backgroundColor: NAVY_BLUE, border: `1px solid ${CORAL}` }}
                >
                  <ul className="flex flex-col items-start py-[10px] text-[17px]" style={{ color: SOFT_GRAY }}>
                    <li
                      className="w-full hover:bg-[#d95c54] px-4 py-2.5 cursor-pointer transition-colors duration-300"
                      onClick={() => {
                        handleLogout();
                        setShowProfile(false);
                      }}
                    >
                      Logout
                    </li>
                    <li
                      className="w-full hover:bg-[#d95c54] px-4 py-2.5 cursor-pointer transition-colors duration-300"
                      onClick={() => {setShowProfile(false);
                        navigate('/orders')
                      }}
                    >
                      Orders
                    </li>
                    <li
                      className="w-full hover:bg-[#d95c54] px-4 py-2.5 cursor-pointer transition-colors duration-300"
                      onClick={() => {
                        setShowProfile(false);
                        navigate("/about");
                      }}
                    >
                      About
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          <button
            className="md:hidden transition-transform duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: NAVY_BLUE }}
            onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
            onMouseLeave={(e) => (e.currentTarget.style.color = NAVY_BLUE)}
          >
            {menuOpen ? (
              <HiX className="w-8 h-8" style={{ color: SOFT_GRAY }} />
            ) : (
              <HiOutlineMenuAlt3 className="w-8 h-8" />
            )}
          </button>
        </div>

        {showSearch && userData && (
          <div
            className="w-full p-4 absolute top-[100%] left-0 right-0 flex justify-center z-50"
            style={{
              backgroundColor: NAVY_BLUE,
              backgroundImage: `linear-gradient(to right, ${NAVY_BLUE}, ${CORAL})`,
            }}
          >
            <input
              type="text"
              autoFocus
              className="w-[50%] sm:w-[40%] rounded-full px-12 py-3 placeholder-white text-white text-[19px] border border-white/30 shadow-lg focus:outline-none focus:ring-2 transition"
              placeholder="Search Here"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              style={{
                backgroundColor: "#303F9F",
                color: SOFT_GRAY,
                backdropFilter: "blur(6px)",
                borderColor: CORAL,
              }}
            />
          </div>
        )}
      </nav>

      <div
        className={`fixed top-0 right-0 h-screen w-[75%] sm:w-[50%] transform transition-transform duration-500 ease-in-out self-start z-60 flex flex-col shadow-lg`}
        style={{
          backgroundColor: NAVY_BLUE,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <button
          className="absolute top-5 right-5 text-3xl"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{ color: SOFT_GRAY }}
        >
          <HiX />
        </button>

        <ul className="flex flex-col gap-6 mt-20 text-lg font-semibold px-8" style={{ color: SOFT_GRAY }}>
          {NAV_ITEMS_COMMON.map((item, i) => (
            <li
              key={item.label}
              style={{ animationDelay: `${i * 0.1 + 0.2}s`, cursor: "pointer" }}
              className="opacity-0 animate-fadeInRight flex items-center gap-3 drop-shadow-md transition-colors duration-300"
              onClick={() => handleNavClick(item.route)}
              tabIndex={0}
              role="menuitem"
              aria-label={item.label}
              onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
              onMouseLeave={(e) => (e.currentTarget.style.color = SOFT_GRAY)}
            >
              <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        {userData && (
          <div className="flex flex-col gap-4 px-8" style={{ color: SOFT_GRAY }}>
            <label htmlFor="drawer-search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="drawer-search"
              className="w-full rounded-full px-4 py-3 placeholder-white text-lg border border-white/30 shadow-lg focus:outline-none focus:ring-2 transition"
              placeholder="Search Here"
              style={{
                backgroundColor: "#303F9F",
                color: SOFT_GRAY,
                backdropFilter: "blur(6px)",
                borderColor: CORAL,
              }}
            />
            <div className="flex gap-6 text-2xl mt-6">
              <IoSearch className="cursor-pointer transition" style={{ color: SOFT_GRAY }} />
              <div
                className="w-[35px] h-[35px] rounded-full flex items-center justify-center font-bold shadow-md cursor-pointer transition-all duration-300"
                title={userData?.name}
                aria-label="Show Profile"
                onClick={() => setShowProfile((pre) => !pre)}
                style={{
                  backgroundColor: CORAL,
                  color: SOFT_GRAY,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow = `0 0 10px ${CORAL}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>
            </div>
          </div>
        )}
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        ></div>
      )}
    </>
  );
}

export default Navbar;

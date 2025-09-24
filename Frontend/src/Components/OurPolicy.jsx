import React from "react";
import Title from "./Title";
import { FaTags, FaExchangeAlt } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const NAVY_BLUE = "#1A237E";
const SOFT_GRAY = "#ECEFF1";
const CORAL = "#FF6F61";

function OurPolicy() {
  const iconStyle =
    "text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6";

  return (
    <div className="w-full rounded-3xl py-12 px-4 transition-all duration-300 flex flex-col items-center">
      <div className="mb-6 text-center max-w-xl px-4">
        <Title text1="OUR" text2="POLICY" />
        <p
          className="text-base md:text-lg mt-4 rounded-lg py-3 px-6 inline-block shadow-lg animate-fadeIn"
          style={{
            color: NAVY_BLUE,
            backgroundColor: "rgba(255, 111, 97, 0.3)",
            backdropFilter: "blur(10px)",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)", 
          }}
        >
          Shop confidently—your privacy, security, and satisfaction are our top
          priority.
        </p>
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 px-4">
        <div
          className="group rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center
            hover:shadow-2xl transition-all duration-500 animate-fadeInUp"
          style={{
            backgroundColor: "rgba(236, 239, 241, 0.25)",
            backdropFilter: "blur(8px)",
          }}
        >
          <FaTags className={iconStyle} style={{ color: CORAL }} />
          <p
            className="font-bold mb-2 text-center text-xl"
            style={{ color: CORAL }}
          >
            7 - Days Return Policy
          </p>
          <p
            className="text-center text-sm md:text-base max-w-xs"
            style={{ color: NAVY_BLUE }}
          >
            Shop with Confidence - 7 Days Easy Return Guarantee
          </p>
        </div>
        <div
          className="group rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center
            hover:shadow-2xl transition-all duration-500 animate-fadeInUp"
          style={{
            backgroundColor: "rgba(236, 239, 241, 0.25)",
            backdropFilter: "blur(8px)",
            animationDelay: "0.1s",
          }}
        >
          <FaExchangeAlt className={iconStyle} style={{ color: NAVY_BLUE }} />
          <p
            className="font-bold mb-2 text-center text-xl"
            style={{ color: NAVY_BLUE }}
          >
            Easy Exchange Policy
          </p>
          <p
            className="text-center text-sm md:text-base max-w-xs"
            style={{ color: NAVY_BLUE }}
          >
            Exchange Made Easy - Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>
        <div
          className="group rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center
            hover:shadow-2xl transition-all duration-500 animate-fadeInUp"
          style={{
            backgroundColor: "rgba(236, 239, 241, 0.25)",
            backdropFilter: "blur(8px)",
            animationDelay: "0.2s",
          }}
        >
          <MdSupportAgent className={iconStyle} style={{ color: CORAL }} />
          <p
            className="font-bold mb-2 text-center text-xl"
            style={{ color: CORAL }}
          >
            Best Customer Support
          </p>
          <p
            className="text-center text-sm md:text-base max-w-xs"
            style={{ color: NAVY_BLUE }}
          >
            Trusted Customer Support - Your Satisfaction Is Our Priority.
          </p>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s both;}
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95);}
          to { opacity: 1; transform: scale(1);}
        }
        .animate-fadeIn { animation: fadeIn 0.6s both;}
      `}</style>
    </div>
  );
}

export default OurPolicy;

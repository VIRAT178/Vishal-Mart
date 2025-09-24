import React, { useState, useEffect } from "react";
import { FaDotCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero 2.png";
import hero3 from "../assets/hero 2.jpg";
import hero4 from "../assets/hero 4.jpeg";

const heroSlides = [
  {
    text1: "Feel the Vibe of Style!",
    text2: "Colors & Trends Await",
    image: hero2,
  },
  {
    text1: "Step Out Boldly",
    text2: "New Arrivals, Just For You!",
    image: hero1,
  },
  {
    text1: "Unleash Your Spirit",
    text2: "Shop Unique, Shop Now",
    image: hero3,
  },
  {
    text1: "Stand Out & Shine",
    text2: "Flash Deals Live Today!",
    image: hero4,
  },
];

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="
        relative pt-[70px] overflow-hidden flex items-center justify-center
        bg-gradient-to-br from-[#1A237E] via-[#536DFE] to-[#FF6F61]
        px-6 lg:px-20
        min-h-[300px]    
        sm:min-h-[400px]
        md:min-h-[600px] 
        lg:min-h-[calc(100vh-70px)]
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={currentIndex}
          src={heroSlides[currentIndex].image}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ zIndex: 0 }}
        />
      </AnimatePresence>

      <div className="relative z-10 max-w-4xl text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-5xl md:text-6xl font-bold leading-tight drop-shadow-xl"
              style={{ color: "#ECEFF1" }} 
            >
              {heroSlides[currentIndex].text1}
            </h1>
            <p
              className="mt-4 text-2xl font-semibold drop-shadow"
              style={{ color: "#FF6F61" }} 
            >
              {heroSlides[currentIndex].text2}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex mt-8 justify-center gap-4">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className="focus:outline-none"
            >
              <FaDotCircle
                size={16}
                className={currentIndex === i ? "scale-110" : ""}
                style={{
                  fill: currentIndex === i ? "#FF6F61" : "#ECEFF1", 
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

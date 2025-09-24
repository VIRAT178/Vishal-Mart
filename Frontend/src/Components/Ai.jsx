import React, { useContext, useState, useRef } from "react";
import { motion } from "framer-motion";
import ai from "../assets/ai.webp";
import openSoundSrc from "../assets/start.mp3";    
import stopSoundSrc from "../assets/start.mp3";    
import { shopDataContext } from "../Contexts/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Ai = () => {
  const { showSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);

  const openAudio = useRef(new Audio(openSoundSrc));
  const stopAudio = useRef(new Audio(stopSoundSrc));


  function speak(message) {
    let utterance = new window.SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      speak("Speech Recognition not supported");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onstart = () => {
      openAudio.current.currentTime = 0;
      openAudio.current.play();
      setListening(true);
    };
    recognition.onend = () => {
      setListening(false);
      stopAudio.current.currentTime = 0;
      stopAudio.current.play();
    };

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase();
      if (
        transcript.includes("search") &&
        transcript.includes("open") &&
        !showSearch
      ) {
        speak("Opening Search Bar");
        setShowSearch(true);
        navigate("/collections");
      } else if (
        transcript.includes("close") &&
        transcript.includes("search") &&
        showSearch
      ) {
        speak("Closing Search Bar");
        setShowSearch(false);
      } else if (
        transcript.includes("collection") ||
        transcript.includes("collections") ||
        transcript.includes("product") ||
        transcript.includes("products")
      ) {
        speak("opening Collections Page");
        navigate("/collections");
      } else if (
        transcript.includes("about") ||
        transcript.includes("aboutpage")
      ) {
        speak("opening About Page");
        navigate("/about");
        setShowSearch(false);
      } else if (
        transcript.includes("contact") ||
        transcript.includes("contactpage")
      ) {
        speak("opening Contact Page");
        navigate("/contect");  
        setShowSearch(false);
      } else if (
        transcript.includes("home") ||
        transcript.includes("homepage")
      ) {
        speak("opening Home Page");
        navigate("/");
        setShowSearch(false);
      } else if (
        transcript.includes("cart") ||
        transcript.includes("my cart")
      ) {
        speak("opening Cart Page");
        navigate("/cart");
        setShowSearch(false);
      } else if (
        transcript.includes("orders") ||
        transcript.includes("my orders")
      ) {
        speak("opening Orders Page");
        navigate("/orders");
        setShowSearch(false);
      } else {
        speak("Sorry, I didn't understand that command.");
      }
    };
    recognition.start();
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <motion.img
        src={ai}
        alt="AI Assistant"
        onClick={handleVoice}
        className={
          `w-14 h-14 rounded-full shadow-lg border-4 cursor-pointer 
          ${listening
            ? "border-yellow-400 animate-pulse shadow-2xl scale-110"
            : "border-teal-300 bg-white"}`
        }
        animate={{
          y: [0, -20, 0],
          boxShadow: [
            "0px 4px 20px 0px #0ff6",
            "0px 8px 24px 0px #09fd",
            "0px 4px 20px 0px #0ff6",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
        whileHover={{ scale: 1.14 }}
      />
    </motion.div>
  );
};

export default Ai;

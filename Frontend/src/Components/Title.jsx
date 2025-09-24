import React from "react";

function Title({ text1, text2 }) {
  return (
    <div className="text-center mb-6">
      <p
        className="text-3xl sm:text-4xl font-extrabold tracking-wide"
        style={{ color: "#1A237E" }}
      >
        {text1}{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg, #536DFE, #FF6F61)", 
          }}
        >
          {text2}
        </span>
      </p>
    </div>
  );
}

export default Title;

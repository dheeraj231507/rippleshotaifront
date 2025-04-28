import React from "react";
import { MoveRight, Sparkle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function First({ handleGetStarted }) {
  const navigate = useNavigate();
  return (
    <div className="bg-black flex flex-col md:flex-row  items-center justify-center px-6 md:px-20 lg:px-52 py-16">
      {/* Text Section */}
      <div className="md:w-1/2 text-center md:text-left mb-3">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Transform Your
          <br />
          <span className="text-white">Photography with AI-</span>
          <br />
          <span className="text-white">Powered Reviews</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed">
          RipplShotAI analyzes your photos with advanced AI to provide
          <br className="hidden md:block" />
          professional insights, enhance your skills, and elevate your
          <br className="hidden md:block" />
          photography to the next level.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
          <button
            onClick={handleGetStarted}
            className="text-black bg-white px-8 py-2 rounded-md font-medium hover:opacity-90 transition flex justify-center items-center gap-2"
          >
            <span>Get Started</span>
            <MoveRight />
          </button>
          <button className="border border-gray-600 text-white px-8 py-2 rounded-md font-medium hover:bg-gray-800 transition">
            Log In
          </button>
        </div>
      </div>
      {/* Image Section (Moves Above Text on Smaller Screens) */}
      <div className="relative  w-full h-[40vh] md:w-1/2 flex  justify-center mb-8 md:mb-0">
        <img
          src="/image1.png"
          alt="AI Photography Analysis"
          className="rounded-xl shadow-2xl w-full max-w-sm md:max-w-md"
        />
        {/* AI Analysis Text Overlay */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[100%] md:w-[55%] bg-black text-white text-sm md:text-sm px-4 py-3 flex items-center gap-2 rounded-lg shadow-lg">
          <Sparkle className="text-blue-400" />
          <span>
            AI analysis complete: Professional composition with excellent
            lighting
          </span>
        </div>
      </div>
    </div>
  );
}

export default First;

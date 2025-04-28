import { Camera, Sparkle, Star } from "lucide-react";
import React from "react";

function Second() {
  return (
    <div className="flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 py-16 text-center">
      {/* Features Button */}
      <button className="text-black bg-white px-6 py-2 rounded-md font-medium text-lg">
        Features
      </button>

      {/* Main Heading */}
      <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mt-4">
        Advanced AI Photo Analysis
      </h1>

      {/* Subheading */}
      <p className="text-zinc-500 text-lg md:text-xl lg:text-2xl mt-2 max-w-3xl">
        Leverage cutting-edge AI technology to get professional insights on your
        photography.
      </p>

      {/* Feature Boxes (Responsive Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 w-full max-w-5xl">
        {/* Composition Analysis */}
        <div className="flex flex-col justify-center items-center">
          <Camera className="bg-gray-700 text-white w-14 h-14 p-3 rounded-full" />
          <h3 className="text-white font-bold text-2xl mt-4 text-center">
            Composition Analysis
          </h3>
          <p className="text-zinc-500 text-lg mt-4 text-center">
            Get detailed feedback on framing, rule of thirds, and overall
            composition structure.
          </p>
        </div>

        {/* Lighting Evaluation */}
        <div className="flex flex-col justify-center items-center">
          <Sparkle className="bg-gray-700 text-white w-14 h-14 p-3 rounded-full" />
          <h3 className="text-white font-bold text-2xl mt-4 text-center">
            Lighting Evaluation
          </h3>
          <p className="text-zinc-500 text-lg mt-4 text-center">
            Understand exposure, contrast, and lighting techniques to enhance
            your photography.
          </p>
        </div>

        {/* Style Recognition */}
        <div className="flex flex-col justify-center items-center">
          <Star className="bg-gray-700 text-white w-14 h-14 p-3 rounded-full" />
          <h3 className="text-white font-bold text-2xl mt-4 text-center">
            Style Recognition
          </h3>
          <p className="text-zinc-500 text-lg mt-4 text-center">
            Identify your unique style and get recommendations for improvement
            and consistency.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Second;

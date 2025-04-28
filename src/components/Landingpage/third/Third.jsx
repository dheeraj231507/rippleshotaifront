import React from "react";

function Third() {
  return (
    <div className="flex flex-col justify-center items-center py-20 bg-zinc-900 px-6 md:px-12">
      {/* Main Heading */}
      <h1 className="text-white font-bold text-3xl md:text-4xl text-center">
        How RippleShotAI Works
      </h1>

      {/* Subheading */}
      <p className="text-zinc-500 text-lg md:text-xl mt-2 text-center">
        Three simple steps to transform your photography
      </p>

      {/* Steps Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10 w-full max-w-5xl">
        {/* Step 1 */}
        <div className="flex flex-col justify-start items-center md:items-start">
          <div className="bg-white text-black w-14 h-14 flex items-center justify-center rounded-full text-3xl font-bold">
            1
          </div>
          <h3 className="text-white font-bold text-2xl mt-4 text-center md:text-left">
            Upload Your Photo
          </h3>
          <p className="text-zinc-500 text-lg mt-4 text-center md:text-left">
            Simply upload any photo you want analyzed through our intuitive
            interface.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col justify-start items-center md:items-start">
          <div className="bg-white text-black w-14 h-14 flex items-center justify-center rounded-full text-3xl font-bold">
            2
          </div>
          <h3 className="text-white font-bold text-2xl mt-4 text-center md:text-left">
            AI Analysis
          </h3>
          <p className="text-zinc-500 text-lg mt-4 text-center md:text-left">
            Our advanced AI processes your image, analyzing dozens of technical
            and artistic elements.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col justify-start items-center md:items-start">
          <div className="bg-white text-black w-14 h-14 flex items-center justify-center rounded-full text-3xl font-bold">
            3
          </div>
          <h3 className="text-white font-bold text-2xl mt-4 text-center md:text-left">
            Get Detailed Feedback
          </h3>
          <p className="text-zinc-500 text-lg mt-4 text-center md:text-left">
            Receive comprehensive insights and actionable tips to improve your
            photography skills.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Third;

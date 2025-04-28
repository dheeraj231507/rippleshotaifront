import React, { useState } from "react";
import { ArrowRight, Image, Lightbulb, Upload } from "lucide-react";
import Header from "../common/Header";
import { Link } from "react-router-dom";

function DashBoard() {
  const [file, setFile] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    setFile(uploadedFile);
  };

  return (
    <>
      <Header isAuthenticated={true} />

      {/* Main Content */}
      <div className="max-w-[1200px] w-full mx-auto min-h-screen bg-black flex flex-col justify-center items-center px-4 pt-16">
        <h1 className="text-white w-full text-left text-2xl pt-24 font-bold my-4">
          Dashboard
        </h1>

        {/* Upload, Stats & Tips Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {/* Upload Box */}
          <div className="bg-black p-6 border border-zinc-900 rounded-2xl w-full">
            <h2 className="text-lg font-semibold text-white">
              Upload New Photo
            </h2>
            <p className="text-gray-400 text-sm">
              Get AI feedback on your latest shot
            </p>

            <div
              className="border border-zinc-900 bg-zinc-900 rounded-lg flex flex-col items-center justify-center h-40 my-4 cursor-pointer hover:bg-gray-800 transition"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <Upload size={40} className="text-gray-400" />
              <p className="text-gray-400 text-sm mt-2">
                {file ? file.name : "Drag & drop or click to upload"}
              </p>
            </div>

            <button className="w-full py-2 bg-white text-black font-semibold rounded-lg flex items-center justify-center">
              <Upload size={16} className="mr-2" />
              Upload Photo
            </button>
          </div>

          {/* Stats Box */}
          <div className="bg-black border border-zinc-900 p-6 rounded-2xl w-full text-white">
            <h2 className="text-lg font-semibold">Your Stats</h2>
            <p className="text-gray-400 text-sm mb-4">
              Your photography progress
            </p>

            <div className="space-y-2">
              {[
                { label: "Photos Analyzed", value: "12" },
                { label: "Average Score", value: "84/100" },
                { label: "Top Category", value: "Landscape" },
                { label: "Improvement Areas", value: "Composition" },
              ].map((stat, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-400">{stat.label}</span>
                  <span className="text-white font-semibold">{stat.value}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-2 mt-4 border border-zinc-900 hover:bg-gray-700 transition text-white font-semibold rounded-lg">
              View Full Stats
            </button>
          </div>

          {/* Tips Box */}
          <div className="bg-black border border-zinc-900 p-6 rounded-2xl w-full text-white">
            <h2 className="text-lg font-semibold">Tips & Tutorials</h2>
            <p className="text-gray-400 text-sm mb-4">
              Improve your photography skills
            </p>

            <ul className="space-y-3">
              {[
                "Master the rule of thirds for better composition",
                "Understanding light: The key to stunning photography",
                "Color theory basics for more impactful images",
              ].map((tip, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Lightbulb size={18} className="text-gray-400" />
                  <span className="text-white">{tip}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-2 mt-4 border border-zinc-900 hover:bg-gray-700 transition text-white font-semibold rounded-lg flex items-center justify-center">
              View All Tips <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>

        {/* Recent Reviews Section */}
        <h1 className="text-white w-full text-left text-2xl font-bold mt-8 mb-4">
          Recent Reviews
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {[
            {
              title: "Sunset at the beach",
              score: "87",
              daysAgo: "2 days ago",
            },
            { title: "Mountain landscape", score: "92", daysAgo: "5 days ago" },
            { title: "City skyline", score: "78", daysAgo: "1 week ago" },
          ].map((review, index) => (
            <div
              key={index}
              className="border border-zinc-900 rounded-2xl w-full text-white overflow-hidden shadow-lg"
            >
              <div className="relative bg-white flex items-center justify-center h-40">
                <Image size={40} className="text-gray-500" />
                <span className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-lg">
                  Score: {review.score}/100
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{review.title}</h3>
                <p className="text-gray-400 text-sm">{review.daysAgo}</p>

                <button className="w-full py-2 mt-4 border border-zinc-900 hover:bg-gray-700 transition text-white font-semibold rounded-lg">
                  View Analysis
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="text-white border border-zinc-900 px-7 py-2 rounded-md flex gap-2 justify-between items-center mt-7">
          <span>View All Photos</span>
          <ArrowRight />
        </button>
      </div>
    </>
  );
}

export default DashBoard;

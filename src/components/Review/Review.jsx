import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Download,
  Share2,
  ImageIcon,
  ThumbsUp,
  ThumbsDown,
  MoveLeft,
} from "lucide-react";
import Header from "../common/Header";

function Review() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the uploaded image's response from Redux
  const uploadAnalysis = useSelector((state) => state.upload.analysisResult);

  // Get the selected image's data from the Gallery (via useLocation)
  const galleryPhoto = location.state?.photo;

  // Determine which data to use (uploaded image or gallery image)
  const analysis = galleryPhoto?.analysis || uploadAnalysis?.analysis;
  const imageUrl = galleryPhoto?.imageUrl || uploadAnalysis?.imageUrl;
  const exifData = galleryPhoto?.exifData || uploadAnalysis?.exifData;

  const [activeTab, setActiveTab] = useState("Summary"); // Track active tab

  if (!analysis) {
    return (
      <div className="text-white text-center mt-20">
        <h1>No analysis data available</h1>
        <button
          className="text-blue-500 underline mt-4"
          onClick={() => navigate("/gallery")}
        >
          Go to Gallery
        </button>
      </div>
    );
  }

  const technicalDetails = exifData
    ? [
        { label: "Camera Model", value: exifData.Model || "N/A" },
        { label: "Lens Model", value: exifData.LensModel || "N/A" },
        { label: "Focal Length", value: exifData.FocalLength || "N/A" },
        { label: "Shutter Speed", value: exifData.ShutterSpeedValue || "N/A" },
        { label: "Aperture", value: exifData.ApertureValue || "N/A" },
        { label: "ISO", value: exifData.ISO || "N/A" },
      ]
    : [];

  const parseAnalysis = (analysis) => {
    try {
      const jsonStr = analysis.content.match(/```json\n([\s\S]*?)\n```/)[1];
      const sanitizedJsonStr = jsonStr.replace(/\bN\/A\b/g, "null");
      const data = JSON.parse(sanitizedJsonStr);

      const scores = [
        {
          label: "Storytelling",
          score: Math.round(
            data.image_analysis.storytelling_emotional_impact * 10
          ),
        },
        {
          label: "Originality",
          score: Math.round(
            data.image_analysis.unique_perspective_originality * 10
          ),
        },
        {
          label: "Technical",
          score: Math.round(data.image_analysis.technical_excellence * 10),
        },
        {
          label: "Composition",
          score: Math.round(data.image_analysis.composition_framing * 10),
        },
        {
          label: "Post-Processing",
          score: Math.round(
            data.image_analysis.post_processing_authenticity * 10
          ),
        },
      ];

      const feedbacks = [
        {
          category: "Strengths",
          feedback: data.strengths.map((text) => ({
            type: "Strength",
            text: text,
          })),
        },
        {
          category: "Areas to Improve",
          feedback: data.areas_to_improve.map((text) => ({
            type: "Improve",
            text: text,
          })),
        },
        {
          category: "Post-Processing Tips",
          feedback: data.post_processing_tips.map((text) => ({
            type: "Tip",
            text: text,
          })),
        },
      ];

      return {
        scores,
        feedbacks,
        overallScore: Math.round(data.final_score * 10),
        genre: data.identified_genre,
        potential: data.competition_potential,
      };
    } catch (error) {
      console.error("Error parsing analysis:", error);
      return {
        scores: [],
        feedbacks: [],
        overallScore: 0,
        genre: "Unknown",
        potential: "",
      };
    }
  };

  const { scores, feedbacks, overallScore, genre, potential } =
    parseAnalysis(analysis);

  return (
    <>
      <Header isAuthenticated={true} />

      <div className="max-w-[1200px] w-full mx-auto px-4 pt-24 pb-8">
        <button
          className="text-white flex justify-start items-center gap-3 mb-7"
          onClick={() => navigate("/gallery")}
        >
          <MoveLeft size={15} />
          <span>Back To Gallery</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <div className="bg-black text-white rounded-lg overflow-hidden shadow-lg">
              <div className="w-full h-64 sm:h-80 bg-gray-300 flex items-center justify-center rounded-lg relative">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded photo"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="absolute flex items-center justify-center w-20 h-20 bg-gray-400 rounded-full">
                    <ImageIcon size={32} className="text-gray-600" />
                  </div>
                )}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <h2 className="text-lg font-semibold">{genre}</h2>
                  <p className="text-gray-400 text-sm">
                    Analyzed on {new Date().toLocaleDateString()}
                  </p>
                </div>

                <div className="flex justify-start sm:justify-end gap-4">
                  <button className="rounded-lg hover:bg-gray-700 p-1">
                    <Download size={20} />
                  </button>
                  <button className="rounded-lg hover:bg-gray-700 p-1">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-black border border-zinc-800 text-white rounded-md shadow-lg p-4 sm:p-6 h-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h2 className="text-lg font-semibold">AI Analysis</h2>
                <span className="bg-gray-800 px-3 py-1 rounded-full text-sm w-fit">
                  Overall Score:{" "}
                  <span className="font-bold">{overallScore}/100</span>
                </span>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  className={`px-3 py-1 rounded-lg text-sm ${
                    activeTab === "Summary"
                      ? "bg-gray-700"
                      : "bg-gray-900 text-gray-400"
                  }`}
                  onClick={() => setActiveTab("Summary")}
                >
                  Summary
                </button>
                <button
                  className={`px-3 py-1 rounded-lg text-sm ${
                    activeTab === "Detailed Analysis"
                      ? "bg-gray-700"
                      : "bg-gray-900 text-gray-400"
                  }`}
                  onClick={() => setActiveTab("Detailed Analysis")}
                >
                  Detailed Analysis
                </button>
                <button
                  className={`px-3 py-1 rounded-lg text-sm ${
                    activeTab === "Technical"
                      ? "bg-gray-700"
                      : "bg-gray-900 text-gray-400"
                  }`}
                  onClick={() => setActiveTab("Technical")}
                >
                  Technical
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "Technical" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold mb-3">
                    Technical Details
                  </h3>
                  <ul className="space-y-2">
                    {technicalDetails.map((detail, index) => (
                      <li
                        key={index}
                        className="flex justify-between bg-gray-800 px-4 py-2 rounded-lg"
                      >
                        <span className="font-medium">{detail.label}</span>
                        <span>{detail.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "Summary" && (
                <div>
                  <div className="space-y-3">
                    {scores.map((item) => (
                      <div key={item.label} className="mb-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.label}</span>
                          <span>{item.score}/100</span>
                        </div>
                        <div className="w-full bg-zinc-600 rounded-full h-3">
                          <div
                            className="bg-white h-3 rounded-full"
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="border border-zinc-900 my-4" />

                  {/* Key Feedback */}
                  <h3 className="text-lg font-semibold mb-3">Key Feedback</h3>

                  <div className="space-y-4">
                    {feedbacks.map((section) => (
                      <div key={section.category} className="">
                        <h4 className="text-sm font-semibold">
                          {section.category}
                        </h4>
                        <div className="space-y-2 mt-1">
                          {section.feedback.map((fb, index) => (
                            <p
                              key={index}
                              className={`text-sm p-2 rounded-md ${
                                fb.type === "Strength"
                                  ? "bg-green-900"
                                  : "bg-yellow-900"
                              }`}
                            >
                              <span className="font-semibold">{fb.type}:</span>{" "}
                              {fb.text}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="border border-zinc-900 my-4" />

                  {/* Analysis Feedback Buttons */}
                  <div className="text-sm">
                    <span>Was this analysis helpful?</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button className="border border-zinc-700 px-3 py-1 rounded-lg flex items-center gap-1">
                        <ThumbsUp size={16} />
                        <span>Helpful</span>
                      </button>
                      <button className="border border-zinc-700 px-3 py-1 rounded-lg flex items-center gap-1">
                        <ThumbsDown size={16} />
                        <span>Not Helpful</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Detailed Analysis" && (
                <div>
                  <p className="text-gray-400">
                    Detailed analysis content goes here...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;

import React, { useEffect } from "react";
import { Image, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGalleryThunk } from "../../features/gallery/gallery.thunk";
import Header from "../common/Header";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";

function Gallery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { analyses, isLoading } = useSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(fetchGalleryThunk());
  }, [dispatch]);

  const handleImageClick = (photo) => {
    // Navigate to the Review component with the selected photo's data
    navigate("/review", { state: { photo } });
  };

  return (
    <>
      <Header isAuthenticated={true} />

      <div className="bg-black min-h-screen text-white pt-24">
        <div className="max-w-[1200px] w-full mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Gallery</h1>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyses.map((photo, index) => {
                let parsed = {};
                try {
                  // Extract JSON inside ```json ... ```
                  const match = photo.analysis.content.match(
                    /```json\s*([\s\S]*?)```/
                  );
                  if (match && match[1]) {
                    parsed = JSON.parse(match[1]);
                  } else {
                    console.warn(
                      "No valid JSON block found in analysis.content"
                    );
                  }
                } catch (err) {
                  console.error("❌ Error parsing analysis:", err);
                }

                return (
                  <div
                    key={index}
                    className="relative border border-zinc-900 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                    onClick={() => handleImageClick(photo)} // Handle image click
                  >
                    {/* Image */}
                    <div className="h-64 bg-gray-800 flex items-center justify-center">
                      {photo.imageUrl ? (
                        <img
                          src={photo.imageUrl}
                          alt={`Photo ${index}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image size={40} className="text-gray-500" />
                      )}
                    </div>

                    {/* Score */}
                    <div className="absolute top-2 right-2 bg-gray-700 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Star size={16} className="text-yellow-400" />
                      <span>
                        {parsed.final_score
                          ? Math.round(parsed.final_score * 10)
                          : "N/A"}
                        /100
                      </span>
                    </div>

                    {/* Title */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">
                        {parsed.identified_genre || "Unknown Genre"}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Gallery;

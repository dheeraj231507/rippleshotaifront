import React from "react";
import { Image, Star } from "lucide-react";
import Header from "../common/Header";

function Gallery() {
  // Example data for images and scores
  const photos = [
    { id: 1, imageUrl: "/image1.png", score: 85 },
    { id: 2, imageUrl: "/image1.png", score: 92 },
    { id: 3, imageUrl: "/image1.png", score: 78 },
    { id: 4, imageUrl: "/image1.png", score: 88 },
  ];

  return (
    <>
      {/* Navbar */}
      <Header isAuthenticated={true} />

      {/* Gallery Content */}
      <div className="bg-black min-h-screen text-white pt-24">
        <div className="max-w-[1200px] w-full mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Gallery</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative border border-zinc-900 rounded-lg overflow-hidden shadow-lg"
              >
                {/* Image */}
                <div className="h-64 bg-gray-800 flex items-center justify-center">
                  {photo.imageUrl ? (
                    <img
                      src={photo.imageUrl}
                      alt={`Photo ${photo.id}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image size={40} className="text-gray-500" />
                  )}
                </div>

                {/* Score */}
                <div className="absolute top-2 right-2 bg-gray-700 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={16} className="text-yellow-400" />
                  <span>{photo.score}/100</span>
                </div>

                {/* Title */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Photo {photo.id}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;

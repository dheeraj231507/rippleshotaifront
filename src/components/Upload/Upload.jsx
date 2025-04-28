import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setFile,
  setSelectedCategory,
  setSelectedFocus,
  setPhotoTitle,
  setPhotoDescription,
  setExifData,
} from "../../features/upload/upload.slice.js";
import { Camera, Upload, Loader } from "lucide-react"; // Import the loader icon
import Header from "../common/Header";
import { uploadPhotoThunk } from "../../features/upload/upload.thunk.js";
import * as exifr from "exifr"; // Import exifr for EXIF data extraction

function Uploaded() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    file,
    photoTitle,
    photoDescription,
    selectedCategory,
    selectedFocus,
    isLoading, // Add isLoading state
    analysisResult,
    exifData, // Add exifData state if needed
  } = useSelector((state) => state.upload);

  // Add useEffect to handle navigation when analysisResult is available
  useEffect(() => {
    if (analysisResult) {
      navigate("/review");
    }
  }, [analysisResult, navigate]);

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      dispatch(
        setFile({
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
        })
      );
      fileInputRef.current.file = selectedFile;

      // Extract EXIF data if the file is an image
      try {
        const exifData = await exifr.parse(selectedFile);

        // Extract only the required EXIF data
        const requiredExifData = {
          Model: exifData?.Model || null,
          LensModel: exifData?.LensModel || null,
          FocalLength: exifData?.FocalLength || null,
          ShutterSpeedValue: exifData?.ShutterSpeedValue || null,
          ApertureValue: exifData?.ApertureValue || null,
          ISO: exifData?.ISO || null,
        };

        // Store EXIF data in Redux state
        dispatch(setExifData(requiredExifData));
      } catch (error) {
        console.error("Error extracting EXIF data:", error);
      }
    }
  };

  // Use the EXIF data from Redux state for logging and condition checking
  useEffect(() => {
    if (exifData) {
      console.log("EXIF Data from Redux State:", exifData); // Log EXIF data from Redux state

      // Validate required fields
      const isValidExifData =
        exifData?.Model &&
        exifData?.LensModel &&
        exifData?.FocalLength &&
        exifData?.ShutterSpeedValue &&
        exifData?.ApertureValue &&
        exifData?.ISO;

      if (isValidExifData) {
        console.log("Image is valid and not AI-generated.");
      } else {
        console.log(
          "Image might be AI-generated or missing required EXIF data."
        );
        // Clear the file state if the image is AI-generated
        dispatch(setFile(null));
        alert(
          "The uploaded image appears to be AI-generated. Please upload a valid image."
        );
      }
    }
  }, [exifData]); // Run whenever exifData changes

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      dispatch(
        setFile({
          name: droppedFile.name,
          size: droppedFile.size,
          type: droppedFile.type,
        })
      );
      fileInputRef.current.file = droppedFile;
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    if (fileInputRef.current && fileInputRef.current.file) {
      dispatch(
        uploadPhotoThunk({
          file: fileInputRef.current.file,
          title: photoTitle,
          description: photoDescription,
          category: selectedCategory,
          focus: selectedFocus,
          exifData, // Send only the required EXIF data
        })
      );
    }
  };

  return (
    <>
      {/* Navbar */}
      <Header isAuthenticated={true} />

      {/* Main Content Section */}
      <div className="min-h-screen bg-black text-white flex justify-center items-center p-6 pt-24 md:pt-6">
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-6">
          {/* Left Side - File Upload (Now stays on left in responsive mode) */}
          <div className="w-full lg:w-1/2 flex flex-col items-center p-6 order-1">
            <div
              className={`w-full h-64 lg:h-80 flex flex-col items-center justify-center border-2 ${
                dragActive ? "border-dotted" : "border-zinc-900"
              } rounded-lg cursor-pointer relative`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              {/* Dashed border layer */}
              <div className="absolute inset-6 border-2 border-dashed border-zinc-900 rounded-lg pointer-events-none"></div>

              {file && fileInputRef.current?.file ? (
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={URL.createObjectURL(fileInputRef.current.file)}
                    alt="Uploaded Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-300 text-center">
                    Click or drag & drop to upload
                  </p>
                  <p className="text-sm text-gray-500 text-center">
                    Supports JPG, PNG, HEIC (max 20MB)
                  </p>
                </>
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".jpg,.png,.heic"
                ref={fileInputRef}
              />
            </div>

            {/* Tips for better analysis */}
            <div className="w-full mt-4 p-4 rounded-lg">
              <h3 className="text-gray-300 font-semibold mb-4">
                Tips for better analysis:
              </h3>
              <ul className="text-zinc-500 text-sm list-disc list-inside space-y-2">
                <li>
                  Upload high-resolution images for more accurate analysis
                </li>
                <li>
                  Avoid heavily edited or filtered photos for best results
                </li>
                <li>Include relevant details in the description for context</li>
                <li>
                  Select the appropriate category for specialized feedback
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 p-6 rounded-lg shadow-lg order-2">
            <div className="mb-4">
              <label className="block white mb-1">Photo Title</label>
              <input
                type="text"
                placeholder="e.g., Sunset at the Beach"
                className="w-full p-2 text-white rounded border border-zinc-900 bg-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={photoTitle}
                onChange={(e) => dispatch(setPhotoTitle(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-1">
                Description (Optional)
              </label>
              <textarea
                placeholder="Add any details about your photo that might help with the analysis"
                className="w-full p-2 bg-black text-white rounded border border-zinc-900 h-24 focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={photoDescription}
                onChange={(e) => dispatch(setPhotoDescription(e.target.value))}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Photo Category</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Landscape",
                  "Portrait",
                  "Street",
                  "Architecture",
                  "Wildlife",
                  "Other",
                ].map((category) => (
                  <button
                    key={category}
                    className={`p-2 border border-zinc-900 text-start rounded hover:bg-gray-600 transition ${
                      selectedCategory === category ? "bg-gray-600" : ""
                    }`}
                    onClick={() => dispatch(setSelectedCategory(category))}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">
                Analysis Focus (Optional)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Composition", "Lighting", "Color", "Technical"].map(
                  (focus) => (
                    <button
                      key={focus}
                      className={`p-2 text-left border border-zinc-900 rounded hover:bg-gray-600 transition ${
                        selectedFocus === focus ? "bg-gray-600" : ""
                      }`}
                      onClick={() => dispatch(setSelectedFocus(focus))}
                    >
                      {focus}
                    </button>
                  )
                )}
              </div>
            </div>

            <button
              className="w-full p-2 bg-slate-300 font-semibold text-black rounded flex justify-center items-center"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                "Submit for Analysis"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Uploaded;

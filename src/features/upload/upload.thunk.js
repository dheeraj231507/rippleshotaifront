import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";

export const uploadPhotoThunk = createAsyncThunk(
  "upload/uploadPhoto",
  async (
    { file, title, description, category, focus, exifData }, // Include exifData
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("focus", focus);
      formData.append("exifData", JSON.stringify(exifData)); // Send EXIF data as JSON

      const response = await axiosInstance.post(
        "photos/analyze-photo",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to upload photo. Please try again.");
    }
  }
);

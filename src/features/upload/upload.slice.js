import { createSlice } from "@reduxjs/toolkit";
import { uploadPhotoThunk } from "./upload.thunk";

const initialState = {
  file: null,
  selectedCategory: null,
  selectedFocus: null,
  photoTitle: "",
  photoDescription: "",
  isLoading: false,
  analysisResult: null,
  exifData: null,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setFile: (state, action) => {
      const file = action.payload;
      state.file = file
        ? { name: file.name, size: file.size, type: file.type }
        : null; // Store only metadata
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedFocus: (state, action) => {
      state.selectedFocus = action.payload;
    },
    setPhotoTitle: (state, action) => {
      state.photoTitle = action.payload;
    },
    setPhotoDescription: (state, action) => {
      state.photoDescription = action.payload;
    },
    setExifData: (state, action) => {
      state.exifData = action.payload; // Store EXIF data in the state
    },
    resetUploadState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(uploadPhotoThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadPhotoThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.analysisResult = action.payload;
      console.log("Analysis Result:", state.analysisResult); // Log the analysis result
    });
    builder.addCase(uploadPhotoThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  setFile,
  setSelectedCategory,
  setSelectedFocus,
  setPhotoTitle,
  setPhotoDescription,
  resetUploadState,
  setExifData,
} = uploadSlice.actions;

export default uploadSlice.reducer;

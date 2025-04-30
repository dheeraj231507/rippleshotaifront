import { createSlice } from "@reduxjs/toolkit";
import { fetchGalleryThunk } from "./gallery.thunk";

const initialState = {
  analyses: [],
  isLoading: false,
  error: null,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGalleryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analyses = action.payload;
      })
      .addCase(fetchGalleryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default gallerySlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "./features/upload/upload.slice.js";
import authReducer from "./features/auth/auth.slice.js";
import galleryReducer from "./features/gallery/gallery.slice.js";

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    auth: authReducer,
    gallery: galleryReducer,
  },
});

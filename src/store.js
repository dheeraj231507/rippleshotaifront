import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "./features/upload/upload.slice.js";
import authReducer from "./features/auth/auth.slice.js";

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    auth: authReducer,
  },
});

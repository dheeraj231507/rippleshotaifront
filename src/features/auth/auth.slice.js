import { createSlice } from "@reduxjs/toolkit";

import {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  refreshTokenThunk,
} from "./auth.thunk";

const initialState = {
  isButtonLoading: false,
  user: null,
  isAuthenticated: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state) => {
      state.isButtonLoading = true;
      state.error = null;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.isButtonLoading = false;
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.isButtonLoading = false;
      state.error = action.payload;
    });
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isButtonLoading = true;
      state.error = null;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isButtonLoading = false;
      state.user = action.payload.user; // Assuming the payload contains user data
      state.isAuthenticated = true; // Set authenticated state to true
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.isButtonLoading = false;
      state.error = action.payload;
    });

    // Handle logout
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.user = null; // Clear user data
      state.isAuthenticated = false; // Set authenticated state to false
    });

    // Handle refresh token
    builder.addCase(refreshTokenThunk.fulfilled, (state, action) => {
      state.user = action.payload.user; // Assuming the payload contains user data
      state.isAuthenticated = true; // Set authenticated state to true
    });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;

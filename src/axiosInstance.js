import axios from "axios";
import { store } from "./store";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DB_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add this at the top of the file
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Intercept requests to add the auth token if available
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept responses to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or it's a refresh request, reject
    if (
      error.response?.status !== 401 ||
      originalRequest.url === "/api/users/refresh"
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return axiosInstance(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    isRefreshing = true;

    try {
      await store.dispatch(refreshTokenThunk());
      processQueue(null);
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // Clear cookies and redirect
      document.cookie =
        "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie =
        "refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      store.dispatch(logoutUserThunk());
      // Redirect to login if we're not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;

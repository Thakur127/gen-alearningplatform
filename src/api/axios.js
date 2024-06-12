import axios from "axios";
import deleteAllCookies from "../lib/deleteAllCookies";
import refreshToken from "./refreshToken";
import getCookie from "../lib/getCookie";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest.__isRetryRequest) {
      originalRequest.__isRetryRequest = true;

      try {
        const refresh_token = localStorage.getItem("refresh_token");
        if (refresh_token) {
          const res = await refreshToken(refresh_token);
          localStorage.setItem("access_token", res.data.access);

          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${res.data.access}`;

          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        deleteAllCookies();
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to login page or handle the situation appropriately
        window.location.pathname = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

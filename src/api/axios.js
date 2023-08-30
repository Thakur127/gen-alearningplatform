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
    // Check if an access token is available in local storage
    // const accessToken = localStorage.getItem("access_token");
    const accessToken = getCookie("auth_access_token");

    // If an access token exists, add it to the request headers
    if (accessToken) {
      config.headers["Authorization"] = "Bearer" + " " + accessToken;
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
    const originalRequest = error?.config;
    // console.log(error.response);
    if (
      error?.response?.status === 401 &&
      error?.response?.data.detail ===
        "Authentication credentials were not provided." &&
      !originalRequest?.__isRetryRequest
    ) {
      try {
        originalRequest.__isRetryRequest = true;

        // const refresh_token = localStorage.getItem("refresh_token");
        const refresh_token = getCookie("auth_refresh_token");
        if (refresh_token) {
          // fetch new access token
          const res = await refreshToken(refresh_token);

          // Set Authorization header with new token
          originalRequest.headers.Authorization =
            "Bearer" + " " + res.data.access;
        }

        const retryResponse = await axiosInstance(originalRequest);
        return retryResponse;
      } catch (refreshError) {
        // console.error("Failed to refresh token");
        // console.log(refreshError);

        deleteAllCookies();
        localStorage.clear();
        sessionStorage.clear();

        // window.location.pathname = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

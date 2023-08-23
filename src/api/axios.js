import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

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
        await axiosInstance.post("/auth/token/refresh/");
        const retryResponse = await axiosInstance(originalRequest);
        return retryResponse;
      } catch (refreshError) {
        console.error("Failed to refresh token");
        window.location.pathname = "/logout";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

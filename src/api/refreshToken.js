import axiosInstance from "./axios";
import setCookie from "../lib/setCookie";

const refreshToken = async (refresh) => {
  try {
    return await axiosInstance.post("/auth/token/refresh/", { refresh });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default refreshToken;

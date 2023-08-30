import setCookie from "../lib/setCookie";
import axiosInstance from "./axios";

const refreshToken = async (refresh) => {
  try {
    const res = await axiosInstance.post("/auth/token/refresh/", { refresh });
    setCookie("auth_access_token", res.data.access, {
      expireIn: new Date(res.data?.access_expiration).toUTCString(),
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default refreshToken;

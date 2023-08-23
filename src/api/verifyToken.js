import axiosInstance from "./api";

const verifyToken = async (token) => {
  let isVerified = false;

  try {
    const response = await axiosInstance.post("auth/token/verify/", {
      token,
    });

    if (response.status === 200) {
      isVerified = true;
    }
  } catch (error) {}

  return isVerified;
};

export default verifyToken;

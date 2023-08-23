import axiosInstance from "./axios";

const createCourse = async (courseData) => {
  try {
    return await axiosInstance.post("/courses/", courseData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default createCourse;

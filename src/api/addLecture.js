import axiosInstance from "./axios";

const addLecture = async (course_id, lectureData) => {
  try {
    return await axiosInstance.post(
      `/course/${course_id}/lectures/`,
      lectureData
    );
  } catch (error) {
    return Promise.reject(error);
  }
};
export default addLecture;

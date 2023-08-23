import axiosInstance from "../api/axios";
import { useQuery } from "react-query";

const useEnrolledCourses = () => {
  return useQuery({
    queryKey: "enrolled-courses",
    queryFn: async () => {
      const { data } = await axiosInstance.get("/course/enroll");
      return data;
    },
  });
};

export default useEnrolledCourses;

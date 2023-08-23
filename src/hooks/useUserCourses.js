import axiosInstance from "../api/axios";
import { useQuery } from "react-query";

const useUserCourses = (username, role) => {
  return useQuery({
    queryKey: ["user-courses", username, role],
    queryFn: async () => {
      const { data } = await axiosInstance(`/user/${username}/courses/`);
      return data;
    },
    enabled: !!username && role === "Teacher",
  });
};

export default useUserCourses;

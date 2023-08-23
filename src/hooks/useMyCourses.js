import axiosInstance from "../api/axios";
import useGetUser from "./useGetUser";
import { useQuery } from "react-query";
import useUserCourses from "./useUserCourses";

const useMyCourses = () => {
  const { data: user } = useGetUser();

  return useUserCourses(user?.username, user?.role);
};

export default useMyCourses;

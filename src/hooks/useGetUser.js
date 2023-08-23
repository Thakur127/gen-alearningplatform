import axiosInstance from "../api/axios";
import { useQuery } from "react-query";
import useAuth from "./useAuth";

const useGetUser = () => {
  const isAuthenticated = useAuth();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/auth/user");
      return data;
    },
    enabled: !!isAuthenticated,
  });
};

export default useGetUser;

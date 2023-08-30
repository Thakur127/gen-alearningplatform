import axiosInstance from "../api/axios";
import { useQuery, useQueryClient } from "react-query";
import useAuth from "./useAuth";

const useGetUser = () => {
  const isAuthenticated = useAuth();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/auth/user/");
      return data;
    },
    enabled: !!isAuthenticated,
    onError: () => {
      queryClient.invalidateQueries("currentUser");
    },
  });
};

export default useGetUser;

import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Box, Spinner } from "@chakra-ui/react";
import deleteAllCookies from "../lib/deleteAllCookies";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

const Signout = () => {
  const [signoutSuccess, setSignoutSuccess] = useState(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  useEffect(() => {
    const logout = async () => {
      try {
        queryClient.invalidateQueries("currentUser");

        await axiosInstance.post("/auth/logout/");
        setSignoutSuccess(true);

        // clear user info
        deleteAllCookies();
        localStorage.clear();
        sessionStorage.clear();

        // redirect to login page
        // window.location.pathname = "/login";
        navigate("/login", { replace: true });
      } catch (error) {}
    };
    if (!signoutSuccess) {
      logout();
    }
  }, [signoutSuccess]);

  return (
    <Box className="absolute inset-0">
      <Box className="h-full flex justify-center items-center">
        <Spinner size="lg" />
      </Box>
    </Box>
  );
};

export default Signout;

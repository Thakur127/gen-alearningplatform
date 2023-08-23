import React, { useEffect } from "react";
import axiosInstance from "../api/axios";
import useSignOut from "../hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import authenticatedState from "../atoms/authenticatedState";
import userState from "../atoms/userState";
import { Box, Spinner } from "@chakra-ui/react";

const Signout = () => {
  const navigate = useNavigate();

  useSignOut();
  useResetRecoilState(authenticatedState);
  useResetRecoilState(userState);

  useEffect(() => {
    const logout = async () => {
      try {
        await axiosInstance.post("/auth/logout/");
        window.location.pathname = "/login";
        // navigate("/login", { replace: true });
      } catch (error) {}
    };
    logout();
  });

  return (
    <Box className="absolute inset-0">
      <Box className="h-full flex justify-center items-center">
        <Spinner size="lg" />
      </Box>
    </Box>
  );
};

export default Signout;

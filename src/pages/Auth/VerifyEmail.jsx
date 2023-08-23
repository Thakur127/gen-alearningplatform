import { Button, Spinner, useToast } from "@chakra-ui/react";
import React from "react";
import { useMutation, useQuery } from "react-query";
import axiosInstance from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const VerifyEmail = () => {
  const [time, setTime] = useState(5);
  const { key } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate, isLoading, error, isSuccess } = useMutation(
    async () => {
      console.log("runing...");
      const { data } = await axiosInstance.post(
        "/auth/account-confirm-email/",
        {
          key,
        }
      );
      console.log(data);
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        toast({
          title: "Verification Done",
          description: "Email Verification Done Successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Verification Failed.",
          description: "Email Verification Failed.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );

  useEffect(() => {
    return mutate();
  }, [key]);

  useEffect(() => {
    if (!isLoading) {
      // Start the countdown when the verification is successful
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      // Navigate to the login page when the time reaches zero
      const timeout = setTimeout(() => {
        navigate("/login", { replace: true });
      }, time * 1000);

      // Clear the interval and timeout when the component unmounts
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isLoading, navigate, time]);

  return (
    <div className="flex-1 py-4">
      <div className="container h-full flex items-center justify-center">
        {isLoading ? (
          <div className="flex items-center gap-4">
            <Spinner size={"md"} />
            <span>Please wait, while we are verifying your email</span>
          </div>
        ) : (
          <div className="text-center">
            <p>You will redirected to login page in {time} seconds.</p>
            <Button
              variant={"primary"}
              onClick={() => {
                navigate("/login", { replace: true });
              }}
              className="mt-2"
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;

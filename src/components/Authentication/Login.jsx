import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, useToast } from "@chakra-ui/react";
import axiosInstance from "../../api/axios";
import { useQuery } from "react-query";
import setCookie from "../../lib/setCookie";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { refetch: fetchUser } = useQuery({
    queryKey: "currentUser",
  });

  const loginWithCredentials = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login/", credentials);

      const auth_expiration = new Date(
        res.data.refresh_expiration
      ).toUTCString();

      const access_expiration = new Date(
        res.data.access_expiration
      ).toUTCString();

      setCookie("_auth", btoa(true), {
        expires: res.data.refersh_expiration,
      });
      setCookie("auth_access_token", res.data.access, {
        expireIn: res.data.access_expiration,
        secure: true,
      });
      setCookie("auth_refresh_token", res.data?.refresh, {
        expireIn: res.data.refresh_expiration,
        secure: true,
      });

      // fetch current user
      fetchUser();

      // redirect to dashbaord
      navigate(location.state ? location.state : "/dashboard/", {
        replace: true,
      });
    } catch (error) {
      // console.log(error);
      console.log(error);
      toast({
        title: "Unauthenticated",
        description: error.response.data.non_field_errors[0],
        status: "info",
        position: "top",
      });
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setCredentials((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="">
      <form onSubmit={loginWithCredentials} className="">
        <div className="mb-3">
          <label htmlFor="email" className="text-sm text-zinc-800">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@gmai.com"
            value={credentials.email}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="text-sm text-zinc-800">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="P@$$word"
            value={credentials.password}
            onChange={handleChange}
            className="input"
          />
          <div className="my-3">
            <Button
              variant="primary"
              width={"full"}
              isLoading={isLoading}
              type="submit"
            >
              Sign in
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

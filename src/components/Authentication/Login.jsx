import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import { Button, useToast } from "@chakra-ui/react";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const loginWithCredentials = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await axios.post("/auth/login/", credentials);
      // console.log(res.data);
      const auth_expiration = new Date(
        res.data.refresh_expiration
      ).toUTCString();
      document.cookie =
        "_auth=" +
        btoa(true) +
        ";" +
        "expires=" +
        auth_expiration +
        ";" +
        "sameSite=lax;";

      // redirect to dashbaord

      window.location.pathname = location.state ? location.state : "/dashboard";
      // navigate("/dashboard", { replace: true });
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

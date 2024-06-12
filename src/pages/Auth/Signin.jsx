import Login from "../../components/Authentication/Login";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import {
  Button,
  ButtonGroup,
  Divider,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import SendAccountVerificationEmail from "../../components/Authentication/SendAccountVerificationEmail";
import SendResetPasswordEmail from "../../components/Authentication/SendResetPasswordEmail";

import google from "../../assets/svgs/google.svg";
import github from "../../assets/svgs/github.svg";
import { LoginSocialGoogle } from "reactjs-social-login";

const Signin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: resetIsOpen,
    onOpen: resetOnOpen,
    onClose: resetOnClose,
  } = useDisclosure();

  return (
    <div className="py-4 flex-1">
      <SendAccountVerificationEmail onClose={onClose} isOpen={isOpen} />
      <SendResetPasswordEmail onClose={resetOnClose} isOpen={resetIsOpen} />
      <div className="container h-full flex flex-col justify-center items-center">
        <div className="w-full text-left">
          <BackButton />
        </div>
        <div className="mt-4">
          <h1 className="text-xl mb-6 text-center">
            Gen - A Learning Platform
          </h1>
          <div className="border p-4 rounded shadow-md">
            <Login />
            <p className="text-sm text-zinc-800 mt-3">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="underline underline-offset-2 text-blue-500"
              >
                Create Account
              </Link>{" "}
            </p>
            <Divider marginY={"1rem"} />
            <div className="space-y-1">
              <p className="text-sm">
                Forgot Password?{" "}
                <span
                  onClick={resetOnOpen}
                  className="underline text-blue-500  underline-offset-2 cursor-pointer"
                >
                  Reset
                </span>
              </p>
              <p className="text-sm">
                Email Not verified?{" "}
                <span
                  onClick={onOpen}
                  className="underline text-blue-500 underline-offset-2 cursor-pointer"
                >
                  Verify Email
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

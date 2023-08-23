import BackButton from "../../components/BackButton";
import Register from "../../components/Authentication/Register";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Signup = () => {
  return (
    <div className="flex-1 py-4">
      <div className="container h-full flex flex-col justify-center items-center">
        <div className="w-full text-left">
          <BackButton />
        </div>
        <div className="mt-4">
          <h1 className="text-xl mb-6 text-center">Create an account</h1>
          <div className="border p-4 rounded shadow-md">
            <Register role={"ST"} />
            {/* <p className="text-center text-sm text-zinc-800 mb-3">
              {" "}
              or continue with
            </p> */}
            <p className="text-xs text-zinc-800 mb-3">
              By continuing, you agree to our Terms & conditions and Privacy
              policy.
            </p>
            <p className="text-sm text-zinc-800">
              Already has an account?{" "}
              <Link
                to="/login"
                className="underline underline-offset-2 text-blue-500"
              >
                Login
              </Link>{" "}
              here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

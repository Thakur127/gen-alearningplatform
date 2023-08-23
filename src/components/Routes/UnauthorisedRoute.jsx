import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const UnauthorisedRoute = () => {
  const isAuthenticated = useAuth();

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace={true} />
  );
};

export default UnauthorisedRoute;

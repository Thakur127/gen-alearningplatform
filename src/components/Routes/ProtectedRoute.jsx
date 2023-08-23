import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useGetUser from "../../hooks/useGetUser";

const ProtectedRoute = ({ allowedRoles }) => {
  const isAuthenticated = useAuth();

  const location = useLocation();
  const { data: user } = useGetUser();

  return isAuthenticated ? (
    allowedRoles?.find((role) => user?.role === role) ? (
      <Outlet />
    ) : (
      <Navigate to={location.pathname} replace={true} />
    )
  ) : (
    <Navigate to="/login" replace={true} state={location.pathname} />
  );
};

export default ProtectedRoute;

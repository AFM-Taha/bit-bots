import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const RequireAuth = ({ children }) => {
  const { isLoading, user } = useSelector((state) => state.user);
  const location = useLocation();

  if (isLoading) {
    return <Spinner />;
  }

  if (!user?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;

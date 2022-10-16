import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";

import Spinner from "../spinner/Spinner";
import auth from "../../firebase.init";

const RequireAuth = ({ children }) => {
  // const { isLoading, user } = useSelector((state) => state.user);

  const [user, loading, error] = useAuthState(auth);

  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }

  if (!user?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;

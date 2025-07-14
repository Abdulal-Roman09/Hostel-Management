import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import Loader from "../Pages/Loader/Loader";

const SubscriberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (loading || isLoading) return <Loader />;

  if (user && role === "subscriber") {
    return children;
  }

  return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default SubscriberRoute;

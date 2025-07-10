import useAuth from "@/Hooks/useAuth";
import React, { Children } from "react";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh] w-[100vw]">
        <div className="spinner-8 relative w-12 h-12 bg-black rounded-full animate-spin text-[#FF3D00]">
          <div className="absolute w-3 h-3 bg-current rounded-full top-2.5 left-1.5 shadow-[25px_2px_0_0_currentColor,10px_22px_0_0_currentColor]"></div>
        </div>
      </div>
    );
  }
  if (!user) {
    <Navigate state={{ From: location.pathname }} to={"/login"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;

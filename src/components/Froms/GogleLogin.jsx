
import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from "./../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAuth from './../../Hooks/useAuth';

const GoogleLogin = () => {
 
  const { signInWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

 const handleGoogleLogin = async () => {
  try {
    const result = await signInWithGoogle();
    const loggedInUser = result.user;

    console.log("Google login success:", loggedInUser);

    const userInfo = {
      email: loggedInUser.email,
      role: "user",
      packages: "Bronze",
      created_at: new Date().toISOString(),
      last_login_at: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post(`/users`, userInfo);
      console.log("User synced:", res.data);
    } catch (error) {
      console.error("Failed to sync user:", error.response?.data || error.message);
    }

    navigate("/");
  } catch (error) {
    console.error("Google login failed:", error.message);
  }
};

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-center text-gray-500 pt-4">or</p>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-3 border border-gray-300 px-18 py-2 rounded-md shadow-sm hover:bg-gray-100 transition text-sm"
      >
        <FcGoogle className="text-2xl" />
        <span className="text-base font-medium">Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;

import React from "react";
import useAuth from "./../../../Hooks/useAuth";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader/Loader";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, isLoading, isError } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load user profile.
      </p>
    );

  const joinedDate = new Date(userInfo?.created_at).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <img
          src={user?.photoURL || "/placeholder.svg"}
          alt="User"
          className="w-24 h-24 rounded-full mx-auto border mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {user?.displayName || "User"}
        </h2>
        <p className="text-sm text-gray-600 mb-2">{user?.email}</p>

        <div className="mt-4 text-sm text-left space-y-2">
          <p>
            <span className="font-medium text-gray-700">Role:</span>{" "}
            <span className="text-blue-600">{userInfo?.role || "user"}</span>
          </p>
          <p>
            <span className="font-medium text-gray-700">Package:</span>{" "}
            <span className="text-green-600">
              {userInfo?.packages || "Bronze"}
            </span>
          </p>
          <p>
            <span className="font-medium text-gray-700">Joined On:</span>{" "}
            <span className="text-gray-600">{joinedDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

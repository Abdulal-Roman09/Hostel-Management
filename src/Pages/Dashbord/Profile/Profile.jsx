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
      <p className="text-center mt-10 text-red-500 dark:text-red-400">
        Failed to load user profile.
      </p>
    );

  const joinedDate = new Date(userInfo?.created_at).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-xl p-8 max-w-md w-full text-center transition-colors duration-300">
        <img
          src={user?.photoURL || "/placeholder.svg"}
          alt="User"
          className="w-24 h-24 rounded-full mx-auto border border-gray-200 dark:border-gray-700 mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1 transition-colors duration-300">
          {user?.displayName || "User"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">
          {user?.email}
        </p>

        <div className="mt-4 text-sm text-left space-y-2">
          <p className="transition-colors duration-300">
            <span className="font-medium text-gray-700 dark:text-gray-300">Role:</span>{" "}
            <span className="text-blue-600 dark:text-blue-400">{userInfo?.role || "user"}</span>
          </p>
          <p className="transition-colors duration-300">
            <span className="font-medium text-gray-700 dark:text-gray-300">Package:</span>{" "}
            <span className="text-green-600 dark:text-green-400">
              {userInfo?.packages || "Bronze"}
            </span>
          </p>
          <p className="transition-colors duration-300">
            <span className="font-medium text-gray-700 dark:text-gray-300">Joined On:</span>{" "}
            <span className="text-gray-600 dark:text-gray-300">{joinedDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from './../../Hooks/useAuth';
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import Loader from './../../Pages/Loader/Loader';

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user's role using your backend route
  const { data: roleData, isLoading: roleLoading, isError } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}/role`);
      return res.data;
    },
  });

  if (roleLoading) return <Loader />;
  if (isError || !roleData?.success)
    return (
      <div className="text-center mt-10 text-red-500 dark:text-red-400">
        Failed to load user role.
      </div>
    );

  const userRole = roleData.role;

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-orange-50 to-yellow-100 dark:from-gray-800 dark:to-gray-900 px-4 py-10 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-700 rounded-lg p-8 max-w-md w-full text-center border border-orange-100 dark:border-gray-700 transition-colors duration-300">
        <img
          src={user?.photoURL || "/placeholder.svg"}
          alt="User"
          className="w-24 h-24 rounded-full mx-auto border object-cover shadow dark:border-gray-600"
        />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-4">
          {user?.displayName || "Anonymous User"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">{user?.email}</p>

        <div className="mt-6 text-left space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300 font-medium">User Role:</span>
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold capitalize">
              {userRole}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300 font-medium">Joined:</span>
            <span className="text-gray-700 dark:text-gray-200">
              {new Date(user?.metadata?.creationTime || "").toLocaleDateString("en-BD", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300 font-medium">Package:</span>
            <span className="text-green-600 dark:text-green-400 font-semibold">Bronze</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

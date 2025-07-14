import React from "react";
import useAuth from "./../../../Hooks/useAuth";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader/Loader";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading, isError } = useQuery({
    queryKey: ["adminMeals", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/allFoods?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center text-red-600 mt-10">
        Failed to load meals for this admin.
      </p>
    );

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <img
          src={user?.photoURL || "/placeholder.svg"}
          alt="Admin"
          className="w-24 h-24 rounded-full mx-auto border mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {user?.displayName || "Admin User"}
        </h2>
        <p className="text-sm text-gray-600 mb-4">{user?.email}</p>
        <div className="bg-orange-100 text-orange-700 font-semibold py-2 rounded-md">
          Total Meals Added: {meals.length}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

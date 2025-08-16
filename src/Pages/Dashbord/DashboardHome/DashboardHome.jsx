import React from "react";
import AdminDashboardHome from "./AdminDashboardHome";
import UserDashboardHome from "./UserDashboardHome";
import useUserRole from "@/Hooks/useUserRole";

const DashboardHome = () => {
  const { role } = useUserRole(); 

  return (
    <div className="p-4">
      {role === "admin" && <AdminDashboardHome />}
      {role === "subscriber" && <UserDashboardHome />}
      {!role && (
        <p className="text-gray-600 dark:text-gray-300">
          You do not have access to dashboard.
        </p>
      )}
    </div>
  );
};

export default DashboardHome;

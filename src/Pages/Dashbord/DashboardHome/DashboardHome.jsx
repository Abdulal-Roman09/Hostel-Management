import React from "react";

import useUserRole from "@/Hooks/useUserRole";
import AdminDashboardHome from "./AdminDashboardHome";
import UserDashboardHome from "./SubcriberDashboardHome";

const DashboardHome = () => {
  const { role } = useUserRole(); 

  return (
    <div className="">
      {role === "admin" && <AdminDashboardHome />}
      {role === "subscriber" && <UserDashboardHome/>}
      {!role && (
        <p className="text-gray-600 dark:text-gray-300">
          You do not have access to dashboard.
        </p>
      )}
    </div>
  );
};

export default DashboardHome;

import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user);

  const {
    data: roleData,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "noman"],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`user/${user.email}/role`);
      console.log(res);
      return res.data.role;
    },
  });
  return {
    role: roleData,
    roleLoading: isPending,
    isError,
    refetch,
  };
};

export default useUserRole;

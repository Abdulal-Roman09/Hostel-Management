import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import Loader from "./../../Loader/Loader";
import { Package } from "lucide-react";

const Customars = () => {
  const axiosSecure = useAxiosSecure();
  // fetch the user from database
  const {
    data: customars = [],
    isLoading,
    isError,
  } = useQuery({
    querykey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      console.log(res.data);
      return res.data;
    },
  });
  if (isLoading) return <Loader />;
  if (isError) return <P>filded</P>;
  return (
    <div>
      <p className="text-center text-4xl py-5 text-amber-500">All user and ther role</p>
      <table className="min-w-full border rounded shadow text-sm text-left">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2">Index</th>

            <th className="px-4 py-2">UserEmail</th>
            <th className="px-4 py-2">Package</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">last_login_at</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customars.map((customar, index) => {
            return (
              <tr key={customar._id}>
                <th className="px-4 py-2">{index + 1}</th>
                <th className="px-4 py-2">{customar.email}</th>
                <th className="px-4 py-2">{customar.packages}</th>
                <th className="px-4 py-2">{customar.role}</th>
                <th className="px-4 py-2">{customar.created_at}</th>
                <th className="px-4 py-2">{customar.last_login_at}</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Customars;

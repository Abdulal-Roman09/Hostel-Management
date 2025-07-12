import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import Loader from "./../../Loader/Loader";

const Customars = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const updateRoleMutation = useMutation({
    mutationFn: async ({ email, role }) => {
      const res = await axiosSecure.patch(`/users/${email}/role`, {
        newRole: role,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const {
    data: customars = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load users</p>;

  return (
    <div>
      <p className="text-center text-4xl py-5 text-amber-500">
        All users and their roles
      </p>
      <table className="min-w-full border rounded shadow text-sm text-left">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2">Index</th>
            <th className="px-4 py-2">UserEmail</th>
            <th className="px-4 py-2">Package</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Last Login At</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customars.map((customar, index) => (
            <tr key={customar._id}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{customar.email}</td>
              <td className="px-4 py-2">{customar.packages}</td>
              <td className="px-4 py-2">{customar.role}</td>
              <td className="px-4 py-2">
                {new Date(customar.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-2">
                {new Date(customar.last_login_at).toLocaleString()}
              </td>
              <td className="px-4 py-2 space-x-2">
                {customar.role !== "admin" ? (
                  <button
                    onClick={() =>
                      updateRoleMutation.mutate({ email: customar.email, role: "admin" })
                    }
                    disabled={updateRoleMutation.isLoading}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Make Admin
                  </button>
                ) : (
                  <>
                    <span className="text-green-600 font-semibold mr-2">Admin</span>
                    <button
                      onClick={() =>
                        updateRoleMutation.mutate({ email: customar.email, role: "user" })
                      }
                      disabled={updateRoleMutation.isLoading}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Cancel Admin
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customars;

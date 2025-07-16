import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import Loader from "./../../Loader/Loader";

const Customars = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

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
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", searchTerm, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchTerm}&page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page
    setSearchTerm(searchInput);
  };

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Failed to load users</p>;

  const customars = data?.users || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div>
      <p className="text-center text-4xl py-5 text-amber-500">
        All users and their roles
      </p>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-1/3"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>

      {/* User Table */}
      <table className="min-w-full border rounded shadow text-sm text-left">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Package</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Last Login</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customars.length > 0 ? (
            customars.map((customar, index) => (
              <tr key={customar._id}>
                <td className="px-4 py-2">{(page - 1) * limit + index + 1}</td>
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
                        updateRoleMutation.mutate({
                          email: customar.email,
                          role: "admin",
                        })
                      }
                      disabled={updateRoleMutation.isLoading}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <>
                      <span className="text-green-600 font-semibold mr-2">
                        Admin
                      </span>
                      <button
                        onClick={() =>
                          updateRoleMutation.mutate({
                            email: customar.email,
                            role: "user",
                          })
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
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center my-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              page === num + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {num + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Customars;

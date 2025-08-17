import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import useAuth from "./../../../../Hooks/useAuth";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import Loader from "./../../../Loader/Loader";
import toast from "react-hot-toast";

const PendingRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: payments = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPayments`);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/myPayments/${id}/status`, {
        status: "successful",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPayments"]);
      toast.success("Payment approved successfully!");
    },
    onError: () => {
      toast.error("Failed to approve payment. Please try again.");
    },
  });

  const handleApprove = (id) => {
    updateStatusMutation.mutate(id);
  };

  const pendingPayments = payments.filter(
    (payment) => payment.transaction?.status === "pending"
  );

  if (isPending) return <Loader />;

  if (isError)
    return (
      <p className="text-red-600 dark:text-red-400 text-center mt-10">
        Failed to fetch data
      </p>
    );

  return (
    <div className="overflow-x-auto p-4 min-h-screen bg-orange-50 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-2xl font-semibold text-orange-600 dark:text-orange-400 text-center mb-6">
        Pending Payment Requests
      </h2>

      {pendingPayments.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No pending payment requests.
        </p>
      ) : (
        <table className="min-w-full border rounded shadow text-sm text-left bg-white dark:bg-gray-800 transition-colors duration-300">
          <thead className="bg-orange-500 dark:bg-orange-700 text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Recipe ID</th>
              <th className="px-4 py-2">Buyer Email</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingPayments.map((payment, index) => (
              <tr
                key={payment._id}
                className="border-t hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{index + 1}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{payment.recipe?.id}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{payment.buyer?.email}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{payment.recipe?.title}</td>
                <td className="px-4 py-2 text-green-600">{payment.recipe?.price}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{payment.transaction?.id}</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100">
                    {payment.transaction?.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500 dark:text-gray-300">
                  {new Date(payment.transaction?.date).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-1 rounded shadow-sm transition-colors duration-200"
                    size="sm"
                    onClick={() => handleApprove(payment._id)}
                    disabled={updateStatusMutation.isPending}
                  >
                    {updateStatusMutation.isPending ? "Approving..." : "Approve"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingRequests;

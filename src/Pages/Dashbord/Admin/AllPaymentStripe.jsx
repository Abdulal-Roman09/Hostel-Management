import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllPaymentStripe = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stripePayments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stripePayments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/stripe-payments");
      return res.data.data;
    },
  });

  if (isLoading) {
    return <p className="text-center text-orange-600 mt-10">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600 mt-10">
        Failed to load payment history.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-orange-700">
        Stripe Payment History
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border shadow rounded-lg">
          <thead className="bg-orange-100 text-orange-800">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">User Email</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {stripePayments.map((payment, index) => (
              <tr
                key={payment.id}
                className="text-center border-t hover:bg-orange-50"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  ${(payment.amount / 100).toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  {payment.metadata?.userEmail || "Not Provided"}
                </td>
                <td className="px-4 py-2">
                  {payment.metadata?.productName || "N/A"}
                </td>
                <td className="px-4 py-2 capitalize">
                  {payment.status || "N/A"}
                </td>
                <td className="px-4 py-2">
                  {new Date(payment.created * 1000).toLocaleString()}
                </td>
              </tr>
            ))}
            {stripePayments.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPaymentStripe;

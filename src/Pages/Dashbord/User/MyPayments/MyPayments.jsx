import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "./../../../Loader/Loader";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import useAuth from "./../../../../Hooks/useAuth";

const MyPayments = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPayments/${user?.email}`);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  if (isPending) return <Loader />;
  if (isError)
    return (
      <p className="text-red-600 text-center mt-10">Failed to fetch data</p>
    );

  return (
    <div className="overflow-x-auto p-4 min-h-screen bg-orange-50">
      <h2 className="text-2xl font-semibold text-orange-600 text-center mb-6">
        My Payment History (Full Details)
      </h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-600">You have no payments yet.</p>
      ) : (
        <table className="min-w-full border rounded shadow text-sm text-left bg-white">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Recipe Id</th>
              <th className="px-4 py-2">Buyer Email</th>
              <th className="px-4 py-2">Recipe Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Seller</th>
              <th className="px-4 py-2">Seller Email</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment.transaction?.id}
                className="border-t hover:bg-orange-50"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 ">
                  {payment.recipe.id}
                </td>
                <td className="px-4 py-2">{payment.buyer?.email}</td>
                <td className="px-4 py-2">{payment.recipe?.title}</td>
                <td className="px-4 py-2">${payment.recipe?.price}</td>
                <td className="px-4 py-2">${payment.recipe?.totalPrice}</td>
                <td className="px-4 py-2">{payment.transaction?.id}</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                    {payment.transaction?.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {new Date(payment.transaction?.date).toLocaleString()}
                </td>
                <td className="px-4 py-2">{payment.seller?.name}</td>
                <td className="px-4 py-2">{payment.seller?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPayments;

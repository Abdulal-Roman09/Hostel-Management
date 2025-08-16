import React from 'react';
import useAxiosSecure from './../../../Hooks/useAxiosSecure';
import useAuth from './../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loader from './../../Loader/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MyOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPayments/${user?.email}`);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-600 dark:text-red-400 text-center mt-10">Failed to fetch data</p>;

  const getStatusColor = (status) => {
    switch (status) {
      case 'succeeded':
        return 'text-green-600 dark:text-green-400';
      case 'processing':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-300';
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-extrabold text-center my-8 text-gray-900 dark:text-gray-100">
        🍊 Your Recipe Purchase History
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments.map((payment) => (
          <Card
            key={payment._id}
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Recipe: {payment.recipe.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p><span className="font-semibold">Price:</span> ${payment.recipe.price}</p>
              <p><span className="font-semibold">Total:</span> ${payment.recipe.totalPrice}</p>
              <hr className="my-2 border-gray-300 dark:border-gray-700" />
              <p><span className="font-semibold">Transaction ID:</span> {payment.transaction.id}</p>
              <p><span className="font-semibold">Date:</span> {new Date(payment.transaction.date).toLocaleString()}</p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className={`font-medium ${getStatusColor(payment.transaction.status)}`}>
                  {payment.transaction.status}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;

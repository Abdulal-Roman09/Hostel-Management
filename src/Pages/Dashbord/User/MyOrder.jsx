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
  if (isError) return <p className="text-red-600 text-center mt-10">Failed to fetch data</p>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-extrabold text-center my-8 text-orange-600">
        🍊 Your Recipe Purchase History
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments.map((payment) => (
          <Card
            key={payment._id}
            className="border border-orange-300 bg-orange-50 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-orange-700">
                Recipe: {payment.recipe.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-1">
              <p><span className="font-semibold text-orange-600">Price:</span> ${payment.recipe.price}</p>
              <p><span className="font-semibold text-orange-600">Total:</span> ${payment.recipe.totalPrice}</p>
              <hr className="my-2 border-orange-300" />
              <p><span className="font-semibold text-orange-600">Transaction ID:</span> {payment.transaction.id}</p>
              <p><span className="font-semibold text-orange-600">Date:</span> {new Date(payment.transaction.date).toLocaleString()}</p>
              <p>
                <span className="font-semibold text-orange-600">Status:</span>{" "}
                <span className={`font-medium ${payment.transaction.status === 'succeeded' ? 'text-green-600' : 'text-red-600'}`}>
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

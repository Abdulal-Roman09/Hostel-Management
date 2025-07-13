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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {payments.map((payment) => (
        <Card key={payment._id}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recipe: {payment.recipe.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><span className="font-medium">Price:</span> ${payment.recipe.price}</p>
            <p><span className="font-medium">Total:</span> ${payment.recipe.totalPrice}</p>
            <hr className="my-2" />
            <p><span className="font-medium">Transaction ID:</span> {payment.transaction.id}</p>
            <p><span className="font-medium">Date:</span> {new Date(payment.transaction.date).toLocaleString()}</p>
            <p><span className="font-medium">Status:</span> {payment.transaction.status}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyOrder;

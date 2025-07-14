import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useAuth from './../../../../Hooks/useAuth';
import useUserRole from './../../../../Hooks/useUserRole';
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import Loader from './../../../Loader/Loader';

const DashboardPage = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['dashboard-stats', role],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard-stats?email=${user?.email}&role=${role}`);
      return res.data;
    },
    enabled: !!user && !!role,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600 mb-6 text-center sm:text-left">
        Welcome, {user?.displayName || 'User'}! 🍽️
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Admin Dashboard */}
        {role === 'admin' && (
          <>
            <DashboardCard title="Total Users" value={stats.totalUsers || 0} />
            <DashboardCard title="Total Recipes" value={stats.totalRecipes || 0} />
            <DashboardCard title="Total Payments" value={`$${stats.totalPayments || 0}`} />
            <DashboardCard title="Successful Orders" value={stats.successfulOrders || 0} />
            <DashboardCard title="Total Packages" value={stats.totalPackages || 0} />
            <DashboardCard title="Total Riders" value={stats.totalRiders || 0} />
          </>
        )}

        {/* Subscriber Dashboard */}
        {role === 'subscriber' && (
          <>
            <DashboardCard title="My Orders" value={stats.myOrders || 0} />
            <DashboardCard title="Successful Orders" value={stats.successfulOrders || 0} />
            <DashboardCard title="Current Package" value={stats.packageName || 'Free'} />
            <DashboardCard title="Last Order" value={stats.lastOrderTitle || 'N/A'} />
            <DashboardCard title="Total Payments" value={`$${stats.totalPayments || 0}`} />
          </>
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <Card className="bg-orange-50 border-orange-100 shadow-sm hover:shadow-md transition-all duration-200 w-full">
    <CardHeader>
      <CardTitle className="text-base sm:text-lg text-orange-700">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-xl sm:text-2xl font-semibold text-gray-800">{value}</p>
    </CardContent>
  </Card>
);

export default DashboardPage;

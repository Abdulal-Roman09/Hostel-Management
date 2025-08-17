import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, ShoppingBag, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/Pages/Loader/Loader";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAuth from "@/Hooks/useAuth";

const AdminDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // --- USERS ---
  const {
    data: allUsers = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log("All Users:", res.data);
      return res.data.users || [];
    },
  });

  // --- PAYMENTS ---
  const {
    data: payments = [],
    isLoading: paymentsLoading,
    isError: paymentsError,
  } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/myPayments");
      console.log("Payments:", res.data.data);
      return res.data.data || [];
    },
    enabled: !!user?.email,
  });

  // --- FOODS ---
  const {
    data: allFoods = [],
    isLoading: foodsLoading,
    isError: foodsError,
  } = useQuery({
    queryKey: ["dishes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allFoods");
      console.log("All Foods:", res.data);
      return res.data || [];
    },
  });

  // Loader & Error
  if (usersLoading || paymentsLoading || foodsLoading) return <Loader />;
  if (usersError || paymentsError || foodsError)
    return (
      <p className="text-red-600 dark:text-red-400 text-center mt-10">
        Failed to fetch data
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-4 md:p-6">
      <div className="mx-auto space-y-6">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <User className="h-6 w-6 md:h-8 md:w-8 text-red-500" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Overview of users, payments & foods
            </p>
          </div>
        </div>

        {/* --- QUICK STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Total Users */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Total Users
              </CardTitle>
              <User className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {allUsers.length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Registered Users
              </p>
            </CardContent>
          </Card>

          {/* Total Payments */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Total Payments
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {payments.length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Completed Transactions
              </p>
            </CardContent>
          </Card>

          {/* Pending Orders */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Pending Orders
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {
                  payments.filter((p) => p.transaction?.status === "pending")
                    .length
                }
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Waiting to process
              </p>
            </CardContent>
          </Card>

          {/* Total Foods */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Foods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {allFoods.length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Total Dishes
              </p>
            </CardContent>
          </Card>

          {/* Total Earnings */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ৳
                {payments.reduce(
                  (sum, p) => sum + (p.recipe?.totalPrice || 0),
                  0
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Total money collected
              </p>
            </CardContent>
          </Card>
               {/* avater */}

          <div className="w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5  items-center gap-4 transition-colors duration-300">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500 shadow-md flex items-center justify-center bg-orange-100 dark:bg-orange-700 mx-auto">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-full h-full object-cover mx-auto"
                />
              ) : (
                <span className="text-xl font-bold text-orange-600 dark:text-orange-200">
                  {user?.displayName?.charAt(0) || "U"}
                </span>
              )}
            </div>

            {/* User Info */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center">
                {user?.displayName || "Anonymous User"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {user?.email || "No email available"}
              </p>
            </div>
          </div>
        </div>
        {/* Recent Orders & Food Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Recent Orders */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments
                  .slice(-5)
                  .reverse()
                  .map((payment) => (
                    <div
                      key={payment._id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            payment.buyer.photo ||
                            "/placeholder.svg?height=40&width=40"
                          }
                          alt={payment.buyer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {payment.buyer.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {payment.recipe.title}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          ৳{payment.recipe.totalPrice}
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded ${
                            payment.transaction.status === "succeeded"
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                          }`}
                        >
                          {payment.transaction.status}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Food Items */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Popular Food Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allFoods
                  .sort((a, b) => (b.likes || 0) - (a.likes || 0)) // sort by likes descending
                  .slice(0, 5) // take top 5 most liked foods
                  .map((food) => (
                    <div
                      key={food._id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={food.image || "/placeholder.svg"}
                          alt={food.productName}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {food.productName}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {food.category} • {food.likes || 0} likes
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          ৳{food.price}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Stock: {food.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* User Management (All Users, 5 only) */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allUsers.slice(0, 5).map((user) => (
                  <div
                    key={user._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
                  >
                    {/* User Info */}
                    <div className="flex items-center space-x-3">
                      <User className="h-10 w-10 text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full p-2" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {user.packages || "N/A"} • {user.role || "N/A"}
                        </div>
                      </div>
                    </div>
                    {/* Dates */}
                    <div className="mt-2 sm:mt-0 text-left sm:text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Joined:{" "}
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "N/A"}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Last login:{" "}
                        {user.last_login_at
                          ? new Date(user.last_login_at).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Admin Users (5 only) */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Admin Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allUsers
                  .filter((user) => user.role === "admin")
                  .slice(0, 5)
                  .map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <User className="h-10 w-10 text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full p-2" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {user.packages} • {user.role}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Joined:{" "}
                          {new Date(user.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Last login:{" "}
                          {new Date(user.last_login_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Subscriber Users (5 only) */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allUsers
                  .filter((user) => user.role === "subscriber")
                  .slice(0, 5)
                  .map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <User className="h-10 w-10 text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full p-2" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {user.packages} • {user.role}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Joined:{" "}
                          {new Date(user.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Last login:{" "}
                          {new Date(user.last_login_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;

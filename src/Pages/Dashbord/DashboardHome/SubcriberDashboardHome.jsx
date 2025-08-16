import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag, Clock, Star } from "lucide-react";
import useAuth from "@/Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/Pages/Loader/Loader";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const UserDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Payments
  const {
    data: payments = [],
    isLoading: paymentsLoading,
    isError: paymentsError,
  } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPayments/${user?.email}`);
      return res.data?.data || [];
    },
    enabled: !!user?.email,
  });

  // Role
  const {
    data: roleData = {},
    isLoading: roleLoading,
    isError: roleError,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}/role`);
      return res.data || {};
    },
    enabled: !!user?.email,
  });

  // Reviews
  const {
    data: myReviews = [],
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user?.email}`);
      return res.data || [];
    },
    enabled: !!user?.email,
  });

  // Loader
  if (paymentsLoading || roleLoading || reviewsLoading) return <Loader />;

  // Error handling
  if (paymentsError || roleError || reviewsError) {
    return (
      <p className="text-red-600 dark:text-red-400 text-center mt-10">
        Failed to fetch data
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-4 md:p-6">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <User className="h-6 w-6 md:h-8 md:w-8 text-orange-500" />
              Welcome, {user?.displayName || "User"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Manage your orders, payments & reviews
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">
              Order Now
            </Button>
            <Button variant="outline">View Menu</Button>
          </div>
        </div>
        {/* Last 3 Orders */}
        <div>
          <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-4">
            Last 3 Orders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {payments
              .slice(-3)
              .reverse()
              .map((payment) => (
                <Card
                  key={payment._id}
                  className=" dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 rounded-2xl"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      🍴 Recipe:{" "}
                      <span className="text-orange-600 dark:text-orange-400">
                        {payment.recipe.title}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700 dark:text-gray-100 space-y-2">
                    <p>
                      <span className="font-semibold">Price per unit:</span> ৳
                      {payment.recipe.price}
                    </p>
                    <p>
                      <span className="font-semibold">Total:</span> ৳
                      {payment.recipe.totalPrice}
                    </p>
                    <hr className="my-2 border-orange-300 dark:border-orange-700" />
                    <p>
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(payment.transaction.date).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                          payment.transaction.status === "succeeded"
                            ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-100"
                        }`}
                      >
                        {payment.transaction.status}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Total Orders */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-gray-500 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {payments.length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                All time
              </p>
            </CardContent>
          </Card>

          {/* Active Orders */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Active Orders
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
                Being prepared
              </p>
            </CardContent>
          </Card>

          {/* Role */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Role
              </CardTitle>
              <User className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {roleData?.role || "N/A"}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                User Role
              </p>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Reviews
              </CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {myReviews.length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Total Reviews
              </p>
            </CardContent>
          </Card>

          {/* Total Spent */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Total Spent
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-green-500" />
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
                Money spent
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

        {/* Last 3 Payments */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-4">
            Last 3 Payments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {payments
              .slice(-3)
              .reverse()
              .map((p) => (
                <Card
                  key={p._id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="flex justify-between items-center pb-2">
                    <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100">
                      {p.recipe?.title}
                    </CardTitle>
                    <span className="text-xs text-orange-600 dark:text-orange-400 font-semibold">
                      {new Date(p.transaction?.date).toLocaleDateString()}
                    </span>
                  </CardHeader>
                  <CardContent className="pt-3 space-y-2 text-gray-900 dark:text-gray-100">
                    <p>
                      👨‍🍳 Seller:{" "}
                      <span className="text-orange-600 dark:text-orange-400 font-medium">
                        {p.seller?.name}
                      </span>
                    </p>
                    <p>💰 Price: ৳{p.recipe?.totalPrice}</p>
                    <p
                      className={`text-xs font-semibold px-2 py-1 inline-block rounded-md ${
                        p.transaction?.status === "succeeded"
                          ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-100"
                      }`}
                    >
                      {p.transaction?.status}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Last 3 Reviews */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            My Total Reviews: {myReviews.length}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Last 3 Reviews
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {myReviews
              .slice(-3)
              .reverse()
              .map((review, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl p-4 flex flex-col items-start gap-3"
                >
                  {/* User Photo */}
                  <img
                    src={review.userPhoto || "/placeholder.svg"}
                    alt={review.userName || "User"}
                    className="w-12 h-12 rounded-full object-cover border shadow dark:border-gray-600"
                  />

                  {/* Review Content */}
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-orange-600 dark:text-orange-400">
                        {review.userName || "Anonymous"}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-300">
                        {new Date(review.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                      Review: {review.text}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;

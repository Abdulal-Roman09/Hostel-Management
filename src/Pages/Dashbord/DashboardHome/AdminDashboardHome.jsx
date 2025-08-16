import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Users, DollarSign, Clock, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

const AdminDashboardHome = () => {
  // ------------------------
  // Mock data for demonstration
  // ------------------------
  const stats = {
    totalOrders: 156,
    activeOrders: 12,
    totalRevenue: 4250,
    avgOrderTime: 18,
  };

  const recentOrders = [
    { id: "#001", customer: "John Doe", items: "Burger, Fries", total: 24.99, status: "preparing", time: "5 min ago" },
    { id: "#002", customer: "Jane Smith", items: "Pizza Margherita", total: 18.5, status: "ready", time: "8 min ago" },
    { id: "#003", customer: "Mike Johnson", items: "Pasta, Salad", total: 32.0, status: "delivered", time: "12 min ago" },
    { id: "#004", customer: "Sarah Wilson", items: "Steak, Wine", total: 65.0, status: "preparing", time: "15 min ago" },
  ];

  // ------------------------
  // Functions to get status icon & badge color
  // ------------------------
  const getStatusIcon = (status) => {
    switch (status) {
      case "preparing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "ready":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "ready":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "delivered":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ---------------- Header ---------------- */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-orange-500" />
              Restaurant Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your restaurant operations</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">
            View Full Menu
          </Button>
        </div>

        {/* ---------------- Stats Cards ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Orders Today</CardTitle>
              <Users className="h-4 w-4 text-gray-500 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalOrders}</div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Active Orders</CardTitle>
              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.activeOrders}</div>
              <p className="text-xs text-gray-500 dark:text-gray-300">Currently being prepared</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Revenue Today</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">${stats.totalRevenue}</div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +8% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Avg Order Time</CardTitle>
              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.avgOrderTime} min</div>
              <p className="text-xs text-gray-500 dark:text-gray-300">2 min faster than target</p>
            </CardContent>
          </Card>
        </div>

        {/* ---------------- Recent Orders ---------------- */}
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Recent Orders</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-300">Latest orders from your restaurant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{order.customer}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">{order.items}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-gray-100">${order.total}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">{order.time}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ---------------- Quick Actions ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Kitchen Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                View Kitchen Orders
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Update Menu Items
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Staff Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                View Staff Schedule
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Add New Staff
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                Daily Sales Report
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Inventory Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;

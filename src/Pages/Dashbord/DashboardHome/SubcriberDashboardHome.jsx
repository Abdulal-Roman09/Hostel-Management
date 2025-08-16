import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ShoppingBag, Clock, Star, MapPin, Phone, Calendar, CreditCard } from "lucide-react";

const UserDashboardHome = () => {
  // Mock data for customer dashboard
  const customerInfo = {
    name: "Ahmed Rahman",
    email: "ahmed@example.com",
    phone: "+880 1234-567890",
    loyaltyPoints: 450,
  };

  const myOrders = [
    { id: "#ORD001", items: "Biryani, Kabab", total: 850, status: "delivered", date: "Today, 2:30 PM", rating: 5 },
    { id: "#ORD002", items: "Chicken Curry, Rice", total: 420, status: "preparing", date: "Today, 1:15 PM", rating: null },
    { id: "#ORD003", items: "Fish Fry, Naan", total: 380, status: "delivered", date: "Yesterday", rating: 4 },
  ];

  const favoriteItems = [
    { name: "Chicken Biryani", price: 450, image: "/flavorful-chicken-biryani.png" },
    { name: "Beef Kabab", price: 320, image: "/grilled-beef-kababs.png" },
    { name: "Fish Curry", price: 280, image: "/vibrant-fish-curry.png" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <User className="h-6 w-6 md:h-8 md:w-8 text-orange-500" />
              Welcome, {customerInfo.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your orders and explore delicious food</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">Order Now</Button>
            <Button variant="outline">View Menu</Button>
          </div>
        </div>

        {/* Customer Info & Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Loyalty Points</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{customerInfo.loyaltyPoints}</div>
              <p className="text-xs text-gray-500 dark:text-gray-300">50 points = ৳100 discount</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-gray-500 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">24</div>
              <p className="text-xs text-gray-500 dark:text-gray-300">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Active Order</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <p className="text-xs text-gray-500 dark:text-gray-300">Being prepared</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Contact</CardTitle>
              <Phone className="h-4 w-4 text-gray-500 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{customerInfo.phone}</div>
              <p className="text-xs text-gray-500 dark:text-gray-300">For order updates</p>
            </CardContent>
          </Card>
        </div>

        {/* My Recent Orders */}
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">My Recent Orders</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-300">Track your order history and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg gap-4"
                >
                  <div className="flex items-start space-x-4">
                    <ShoppingBag className="h-5 w-5 text-orange-500 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{order.id}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{order.items}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">{order.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-gray-100">৳{order.total}</div>
                      {order.rating && (
                        <div className="flex items-center text-sm text-yellow-600">
                          <Star className="h-3 w-3 fill-current mr-1" />
                          {order.rating}/5
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      {order.status === "delivered" ? "Reorder" : "Track"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Favorite Items & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Favorite Items */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Your Favorites</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-300">Quick order your favorite dishes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favoriteItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">৳{item.price}</div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Quick Actions</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-300">Manage your account and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Make a Reservation
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Update Delivery Address
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Methods
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Star className="h-4 w-4 mr-2" />
                Rate & Review Orders
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <User className="h-4 w-4 mr-2" />
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Restaurant Info */}
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Restaurant Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Address</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">123 Food Street, Dhaka</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Phone</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">+880 1234-567890</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Hours</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">10:00 AM - 11:00 PM</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboardHome;

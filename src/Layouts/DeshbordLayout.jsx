import React, { useState } from "react";
import {
  LayoutDashboard,
  Utensils,
  ReceiptText,
  Users,
  ListOrdered,
  ChefHat,
  CreditCard,
  Package,
  DollarSign,
  CalendarPlus,
  MessageCircle,
  Bike,
  Zap,
  User,
  LogOut,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "./../components/shared/Logo";
import useAuth from "./../Hooks/useAuth";
import useUserRole from "./../Hooks/useUserRole";
import AdminProfile from './../Pages/Dashbord/Profile/AdminProfile';

export default function DashboardLayout() {
  const { role } = useUserRole();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const activeClass = "bg-orange-50 text-orange-600 hover:bg-orange-100";
  const inactiveClass = "text-gray-600 hover:text-gray-900 hover:bg-gray-50";

  const renderLinks = () => (
    <>
      {/* admin routs */}
      {role === "admin" && (
        <>
          {" "}
          <li>
            <NavLink
              to="adminProile"
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="addFood"
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <Utensils className="w-4 h-4" />
              <span>Add Food</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="AllPaymentStripe"
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <DollarSign className="w-4 h-4" />
              <span>All Payment Stripe</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="customers"
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <Users className="w-4 h-4" />
              <span>Customers/makeAdmin</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="myCreationList"
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <ListOrdered className="w-4 h-4" />
              <span>My Creation List</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="dishes"
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <ChefHat className="w-4 h-4" />
              <span>Dishes</span>
            </NavLink>
          </li>
           <li>
            <NavLink
              to="PendingRequests"
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <ChefHat className="w-4 h-4" />
              <span>PendingRequests</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="AddUpcomingMeals"
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Add Upcoming Meals</span>
            </NavLink>
          </li>
        </>
      )}

      {/* subcriber routs */}
      {user && (
        <>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <Package className="w-4 h-4" />
              <span>Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="packages"
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <Package className="w-4 h-4" />
              <span>Packages</span>
            </NavLink>
          </li>
        </>
      )}
      {role === "subscriber" && (
        <>
          {" "}
          <li>
            <NavLink
              to="myPayments"
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <CreditCard className="w-4 h-4" />
              <span>My Payments</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reviews"
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <MessageCircle className="w-4 h-4" />
              <span>My Reviews</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="MyOrders"
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <ReceiptText className="w-4 h-4" />
              <span>My Orders</span>
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white shadow-sm border-r">
        <div className="flex items-center justify-center py-3 flex-col">
          <Logo name="KJH" />
          <p className="text-center py-1 font-bold text-xl">
            Kobi Jasimuddin Hall
          </p>
        </div>
        <nav className="flex-1 p-4 overflow-auto">
          <ul className="space-y-2">{renderLinks()}</ul>
        </nav>
        <div className="p-4 border-t">
          <div className="mb-4 p-3 bg-orange-50 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <Link to="/packages">
              <p className="text-xs text-gray-600 mb-2">
                🔥 Upgrade Your Plan. Find Out here
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-orange-600 border-orange-200 hover:bg-orange-50 bg-transparent"
              >
                Contact Support
              </Button>
            </Link>
          </div>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start h-9 text-gray-600"
            >
              <User className="w-4 h-4 mr-3" /> Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-9 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-3" /> Logout
            </Button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg border-r z-50 md:hidden flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Logo />
                </div>
                <span className="text-xl font-semibold text-gray-800">KJH</span>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSidebarOpen(false)}
                className="p-1 text-gray-600 hover:bg-gray-100 rounded"
              >
                <CloseIcon className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 p-4 overflow-auto">
              <ul className="space-y-2">{renderLinks()}</ul>
            </nav>
            <div className="p-4 border-t">
              <div className="mb-4 p-3 bg-orange-50 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-orange-600" />
                  </div>
                </div>
                <Link to="/packages">
                  <p className="text-xs text-gray-600 mb-2">
                    🔥 Upgrade Your Plan. Find Out here
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-orange-600 border-orange-200 hover:bg-orange-50 bg-transparent"
                  >
                    Contact Support
                  </Button>
                </Link>
              </div>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-9 text-gray-600"
                >
                  <User className="w-4 h-4 mr-3" /> Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-9 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-3" /> Logout
                </Button>
              </div>
            </div>
          </aside>
        </>
      )}

      <div className="flex-1 overflow-auto flex flex-col">
        <header className="bg-white shadow-sm border-b p-4 md:p-6 flex items-center justify-between">
          <Button
            variant="ghost"
            className="md:hidden p-2 mr-4"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <MenuIcon className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-center md:text-left text-gray-900">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1 text-center md:text-left">
              Welcome back! Here's what's happening today.
            </p>
          </div>
        </header>
        <div className="px-1 flex-1">
         
          <Outlet />
        </div>
      </div>
    </div>
  );
}

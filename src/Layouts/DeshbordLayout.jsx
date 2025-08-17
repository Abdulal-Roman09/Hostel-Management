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
  Zap,
  User,
  LogOut,
  Menu as MenuIcon,
  X as CloseIcon,
  Home,
  HomeIcon,
} from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "./../components/shared/Logo";
import useAuth from "./../Hooks/useAuth";
import useUserRole from "./../Hooks/useUserRole";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function DashboardLayout() {
  const { role } = useUserRole();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const activeClass =
    "bg-orange-50 dark:bg-orange-400 text-orange-600 dark:text-orange-900 hover:bg-orange-100 dark:hover:bg-orange-200 dark:text-white";
  const inactiveClass =
    "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700";

  const renderLinks = () => (
    <>
      {/* Admin routes */}
      {role === "admin" && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
          </li>
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
              <span>All Payments</span>
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
              <span> Make Admin</span>
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
              <span>Pending Requests</span>
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

      {/* Subscriber routes */}
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
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `${
                  isActive ? activeClass : inactiveClass
                } w-full h-10 px-3 rounded flex items-center gap-2`
              }
            >
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
          </li>
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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white dark:bg-gray-800 shadow-sm border-r dark:border-gray-700">
        <div className="flex items-center justify-center py-4 flex-col">
          <Logo name="KJH" />
          <p className="text-center py-1 font-bold text-xl text-gray-900 dark:text-gray-100">
            Kobi Jasimuddin Hall
          </p>
        </div>
        <nav className="flex-1 p-4 overflow-auto">
          <ul className="space-y-2">{renderLinks()}</ul>
        </nav>
        <div className="p-4 border-t dark:border-gray-700">
          <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-500 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-200 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-orange-600 dark:text-orange-900" />
              </div>
            </div>
            <Link to="/packages">
              <p className="text-xs text-gray-600 dark:text-gray-200 mb-2">
                🔥 Upgrade Your Plan. Find Out Here
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-orange-600 dark:text-orange-900 border-orange-200 dark:border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-200 bg-transparent"
              >
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg border-r dark:border-gray-700 z-50 flex flex-col">
            <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Logo />
              </div>
              <Button
                variant="ghost"
                onClick={() => setSidebarOpen(false)}
                className="p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <CloseIcon className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 p-4 overflow-auto">
              <ul className="space-y-2">{renderLinks()}</ul>
            </nav>
          </aside>
        </>
      )}

      <div className="flex-1 overflow-auto flex flex-col">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 p-4 md:p-6 flex items-center justify-between">
          <Button
            variant="ghost"
            className="md:hidden p-2 mr-4 text-gray-600 dark:text-gray-300"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <MenuIcon className="w-6 h-6" />
          </Button>
          <div className="flex-1 ">
            <h1 className="text-md md:text-2xl lg:text-3xl font-semibold text-center   text-orange-500 dark:text-orange-600">
              {role} Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1 text-center text-sm">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <div className="md:pr-10 lg:pr-20 mx-3">
            {" "}
            <ThemeToggle />
          </div>
          <div className="md:pr-10 lg:pr-20">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 ">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-orange-200 text-orange-800 font-bold text-lg">
                  {user?.displayName?.charAt(0) || "U"}
                </div>
              )}
            </div>
          </div>
        </header>
        <main className=" flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

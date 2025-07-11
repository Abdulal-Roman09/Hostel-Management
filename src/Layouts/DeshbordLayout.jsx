import React, { useState } from "react";
import {
  LayoutDashboard,
  Plus,
  ShoppingCart,
  Users,
  Store,
  UtensilsCrossed,
  UserCheck,
  Wallet,
  Zap,
  User,
  LogOut,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router";
import Logo from "./../components/shared/Logo";
import useAuth from "./../Hooks/useAuth";

export default function DashboardLayout() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Plus, label: "AddFood", path: "addFood" },

    // ✅ Conditional item — only included if `user` is truthy
    ...(user
      ? [{ icon: ShoppingCart, label: "MyOrders", path: "MyOrders" }]
      : []),
    { icon: Users, label: "Customers", path: "customers" },
    { icon: Store, label: "MyCraetionList", path: "myCreationList" },
    { icon: UtensilsCrossed, label: "Dishes", path: "dishes" },
    { icon: UserCheck, label: "MyPaymenst", path: "myPayments" },
    { icon: Wallet, label: "Packages", path: "packages" },
  ];
  // Custom active class for NavLink
  const activeClass = "bg-orange-50 text-orange-600 hover:bg-orange-100";
  const inactiveClass = "text-gray-600 hover:text-gray-900 hover:bg-gray-50";

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white shadow-sm border-r">
        {/* Logo */}
        <div className=" flex items-center justify-center py-3 flex-col">
          <Logo name={"KJH"}></Logo>
          <p className="text-center py-1 font-bold text-xl">
            kobi Jasimuddin Hall{" "}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-auto">
          <ul className="space-y-2">
            {sidebarItems.map(({ icon: Icon, label, path }) => (
              <li key={label}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `w-full flex items-center h-10 px-3 rounded justify-start ${
                      isActive ? activeClass : inactiveClass
                    }`
                  }
                  onClick={() => setSidebarOpen(false)} // close mobile sidebar on nav click
                >
                  <Icon className="w-4 h-4 mr-3" />
                  <span className="flex-1 text-left">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t">
          {/* Upgrade Section */}
          <div className="mb-4 p-3 bg-orange-50 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <Link to={"/packages"}>
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

          {/* Profile & Logout */}
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start h-9 text-gray-600"
            >
              <User className="w-4 h-4 mr-3" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-9 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar (drawer) */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg border-r z-50 md:hidden flex flex-col">
            {/* Close button */}
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
                aria-label="Close sidebar"
              >
                <CloseIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-auto">
              <ul className="space-y-2">
                {sidebarItems.map(({ icon: Icon, label, path }) => (
                  <li key={label}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `w-full flex items-center h-10 px-3 rounded justify-start ${
                          isActive ? activeClass : inactiveClass
                        }`
                      }
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      <span className="flex-1 text-left">{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t">
              <div className="mb-4 p-3 bg-orange-50 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-orange-600" />
                  </div>
                </div>
                <Link to={"/packages"}>
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
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-9 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b p-4 md:p-6 flex items-center justify-between">
          {/* Hamburger menu for mobile */}
          <Button
            variant="ghost"
            className="md:hidden p-2 mr-4"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <MenuIcon className="w-6 h-6" />
          </Button>

          <div className="flex-1">
            <h1 className="text-2xl font-semibold mx-auto text-gray-900 text-center   md:text-left flex justify-center">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1 text-center md:text-left flex justify-center">
              Welcome back! Here's what's happening today.
            </p>
          </div>
        </header>
        {/* ✅ Add Outlet here to show nested routes */}
        <div className="px-1 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

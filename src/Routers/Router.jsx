import React from "react";
import { createBrowserRouter } from "react-router";
import Roots from "../Layouts/RootLayout";
import ErrorPage from "./../Pages/Error/ErrorPage";
import LoginFrom from "./../components/Froms/LoginFrom";
import RegisterForm from "../components/Froms/RegisterFrom";
import DeshbordLayout from "../Layouts/DeshbordLayout";

import MyOrder from "./../Pages/Dashbord/User/MyOrder";
import PrivateRoute from "./../Routes/PrivateRoute";
import Packages from "../Pages/Dashbord/User/Packages";
import Home from "./../Pages/Home/Home";
import PackagesHome from "./../Pages/Packages/PackageHome";
import AddFood from "./../Pages/Dashbord/Admin/AddFood";
import MyCreationList from ".././Pages/Dashbord/Admin/MyCreationList";
import AllMeals from "../Pages/Dashbord/User/AllMeals/AllMeals";
import AllMealDetails from "./../Pages/Dashbord/User/AllMealDetails";
import Customars from "./../Pages/Dashbord/Admin/Customars";
import Dishes from "./../Pages/Dashbord/Admin/Dishes";
import Payments from "./../Pages/Dashbord/User/Payments/Payments";
import PackagePayment from "./../Pages/Dashbord/User/PackaagePayments/PackagePayment";
import MyPayments from "./../Pages/Dashbord/User/MyPayments/MyPayments";
import AllPaymentStripe from "./../Pages/Dashbord/Admin/AllPaymentStripe";
import AddUpcomingMeals from "./../Pages/Dashbord/Admin/UpcomingMeals/AddUpcommingMeals";
import AllUpcommingMeals from "./../Pages/Dashbord/Admin/UpcomingMeals/AllUpcommingMeals";
import UpcommingMealsDetails from "./../Pages/Dashbord/Admin/UpcomingMeals/UpcommingMealsDetails";
import MyReviews from "./../Pages/Dashbord/User/MyReviews/MyReviews";
import Profile from "./../components/shared/Profile";
import AdminProfile from "./../Pages/Dashbord/Profile/AdminProfile";
import PendingRequests from "./../Pages/Dashbord/Admin/PendingRequests/PendingRequests";
import Forbidden from "./../components/shared/Forbidden";
import AdminRoute from "./../Routes/AdminRoutes";
import SubscriberRoute from "./../Routes/SubscriberRoute";
import DashboardHome from "@/Pages/Dashbord/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "login",
    Component: LoginFrom,
  },
  {
    path: "register",
    Component: RegisterForm,
  },
  {
    path: "forbidden",
    element: <Forbidden />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "packages",
    element: <PackagesHome />,
  },
  {
    path: "/upcoming-meals",
    element: <AllUpcommingMeals />,
  },
  {
    path: "upcomingmealsdetails/:id",
    element: <UpcommingMealsDetails />,
  },
  {
    path: "allMeals",
    element: <AllMeals></AllMeals>,
  },
  {
    path: "/allmealsdetails/:id",
    element: (
      <PrivateRoute>
        <AllMealDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "payments",
    element: <Payments />,
  },
  {
    path: "packagePayments",
    element: <PackagePayment />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DeshbordLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index:true,
        element:<DashboardHome />
      },
      {
        path: "MyOrders",
        element: (
          <SubscriberRoute>
            <MyOrder />
          </SubscriberRoute>
        ),
      },
      {
        path: "packages",
        element: <Packages />,
      },
      {
        path: "addFood",
        element: (
          <AdminRoute>
            <AddFood />
          </AdminRoute>
        ),
      },
      {
        path: "myCreationList",
        element: (
          <AdminRoute>
            <MyCreationList />
          </AdminRoute>
        ),
      },
      {
        path: "customers",
        element: (
          <AdminRoute>
            {" "}
            <Customars />
          </AdminRoute>
        ),
      },
      {
        path: "dishes",
        element: (
          <AdminRoute>
            {" "}
            <Dishes />
          </AdminRoute>
        ),
      },
      {
        path: "myPayments",
        element: (
          <SubscriberRoute>
            <MyPayments />
          </SubscriberRoute>
        ),
      },
      {
        path: "AllPaymentStripe",
        element: (
          <AdminRoute>
            <AllPaymentStripe />
          </AdminRoute>
        ),
      },
      {
        path: "AddUpcomingMeals",
        element: (
          <AdminRoute>
            {" "}
            <AddUpcomingMeals />
          </AdminRoute>
        ),
      },
      {
        path: "reviews",
        element: (
          <SubscriberRoute>
            {" "}
            <MyReviews />
          </SubscriberRoute>
        ),
      },
      {
        path: "adminProile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "PendingRequests",
        element: (
          <AdminRoute>
            <PendingRequests />
          </AdminRoute>
        ),
      },
    ],
  },
]);

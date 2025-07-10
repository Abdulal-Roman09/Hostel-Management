import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navber";
import React from "react";
import { Outlet } from "react-router";

const Roots = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Roots;

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Hamburger } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background text-foreground">
      <Hamburger className="" size={300} color="orange"></Hamburger>
      <h1 className="text-[140px] font-bold mb-2">404</h1>
      <p className="text-lg mb-4 text-muted-foreground">
        Oops! The page you are looking for doesn't exist.
      </p>
      <Link to="/">
        <Button variant="default" ><span  className="text-3xl pb-1">←</span> Go Home</Button>
      </Link>
    </div>
  );
}

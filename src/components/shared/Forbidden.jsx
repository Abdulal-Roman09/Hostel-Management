import React from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="text-center bg-white p-10 rounded-2xl shadow-md max-w-md">
        <div className="flex justify-center mb-4">
          <ShieldAlert className="text-red-500" size={450} />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
        </p>
        <Button onClick={() => navigate("/")} className="w-full">
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default Forbidden;

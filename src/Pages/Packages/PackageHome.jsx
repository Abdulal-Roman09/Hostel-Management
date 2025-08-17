import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown } from "lucide-react";
import Footer from "../../components/shared/footer";
import Navber from "../../components/shared/Navber";
import { useNavigate } from "react-router-dom";

const PackagesHome = () => {
  const navigate = useNavigate();

  const handleChoosePlan = (amount, title, description) => {
    navigate("/packagePayments", {
      state: { amount, title, description },
    });
  };

  return (
    <>
      <Navber />
      <main className="p-6 bg-amber-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Meal Packages Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2 transition-colors duration-300">
              Choose Your Meal Plan
            </h2>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Select the best meal subscription for your hostel stay
            </p>
          </div>

          <div className="container mx-auto px-2 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Basic Plan */}
            <Card className="relative border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </div>
                <CardTitle className="text-xl text-gray-800 dark:text-gray-200">
                  Basic Plan
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Ideal for minimal meal needs
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    $29
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {[
                    "2 meals per day",
                    "Standard menu access",
                    "Weekly meal rotation",
                    "Basic support",
                    "Limited customization",
                  ].map((text) => (
                    <li className="flex items-center" key={text}>
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-sm dark:text-gray-200">{text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() =>
                    handleChoosePlan(29, "Basic Plan", "Ideal for minimal meal needs")
                  }
                  className="w-full bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Choose Basic
                </Button>
              </CardContent>
            </Card>

            {/* Standard Plan */}
            <Card className="relative border-2 border-yellow-400 dark:border-yellow-600 hover:border-yellow-500 dark:hover:border-yellow-500 shadow-lg transition-colors duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-yellow-500 text-white px-3 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
                </div>
                <CardTitle className="text-xl text-yellow-800 dark:text-yellow-400">
                  Standard Plan
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Best for regular hostel life
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-yellow-800 dark:text-yellow-300">
                    $59
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {[
                    "3 meals per day",
                    "Expanded weekly menu",
                    "Personalized food preferences",
                    "Meal skip/reschedule",
                    "Monthly meal feedback",
                    "Basic nutrition tracking",
                  ].map((text) => (
                    <li className="flex items-center" key={text}>
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-sm dark:text-gray-200">{text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() =>
                    handleChoosePlan(59, "Standard Plan", "Best for regular hostel life")
                  }
                  className="w-full bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-600"
                >
                  Choose Standard
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-2 bg-red-400 border-purple-400 dark:border-purple-600 hover:border-purple-500 dark:hover:border-purple-500 transition-colors duration-300 ">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                </div>
                <CardTitle className="text-xl text-purple-800 dark:text-purple-400">
                  Premium Plan
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  For top-tier meal services
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-purple-800 dark:text-purple-300">
                    $99
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {[
                    "All-inclusive 4 meals/day",
                    "Custom meal planning",
                    "Dietary restrictions support",
                    "24/7 meal help desk",
                    "Nutrition & health tracking",
                    "Event-based special meals",
                    "Priority kitchen access",
                  ].map((text) => (
                    <li className="flex items-center" key={text}>
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-sm dark:text-gray-200">{text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() =>
                    handleChoosePlan(99, "Premium Plan", "For top-tier meal services")
                  }
                  className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                >
                  Choose Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PackagesHome;

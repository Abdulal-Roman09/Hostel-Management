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
import Dot from "./../../Home/Dot";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const navigate = useNavigate();

  const handleChoose = (amount, title, description) => {
    navigate("/packagePayments", {
      state: { amount, title, description },
    });
  };

  return (
    <>
      <Dot />
      <div className="bg-orange-50 dark:bg-slate-900 min-h-screen">
        <main className="p-6 container mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <div className="inline-block bg-orange-100 dark:bg-orange-700 text-orange-600 dark:text-orange-100 px-4 py-2 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-medium my-10 flex items-center">
                Choose Your Plan
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Silver Package */}
            <Card className="relative border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </div>
                <CardTitle className="text-xl text-gray-800 dark:text-gray-100">
                  Silver
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Perfect for small hostel users
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    $29
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {[
                    "2 meals/day",
                    "Weekly standard menu",
                    "Email support",
                    "Mobile app access",
                    "Basic menu customization",
                  ].map((text) => (
                    <li className="flex items-center" key={text}>
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-sm dark:text-gray-200">{text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleChoose(29, "Silver", "Perfect for small hostel users")}
                  className="w-full bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                >
                  Choose Silver
                </Button>
              </CardContent>
            </Card>

            {/* Gold Package */}
            <Card className="relative border-2 border-yellow-400 dark:border-yellow-600 hover:border-yellow-500 dark:hover:border-yellow-500 transition-colors shadow-lg">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-yellow-500 dark:bg-yellow-600 text-white px-3 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
                </div>
                <CardTitle className="text-xl text-yellow-800 dark:text-yellow-300">
                  Gold
                </CardTitle>
                <CardDescription className="text-yellow-700 dark:text-yellow-200">
                  Best for regular hostel students
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-yellow-800 dark:text-yellow-300">
                    $59
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {[
                    "3 meals/day",
                    "Flexible menu choice",
                    "Priority support",
                    "Guest meal access",
                    "Nutrition tracking",
                    "Event-based meals",
                  ].map((text) => (
                    <li className="flex items-center" key={text}>
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-sm dark:text-gray-200">{text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleChoose(59, "Gold", "Best for regular hostel students")}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-600"
                >
                  Choose Gold
                </Button>
              </CardContent>
            </Card>

            {/* Platinum Package */}
            <Card className="relative border-2 border-purple-400 dark:border-purple-600 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                </div>
                <CardTitle className="text-xl text-purple-800 dark:text-purple-300">
                  Platinum
                </CardTitle>
                <CardDescription className="text-purple-700 dark:text-purple-200">
                  All-inclusive premium solution
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-purple-800 dark:text-purple-300">
                    $99
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {[
                    "4 meals/day",
                    "Custom meal planning",
                    "Diet-specific options",
                    "24/7 food support",
                    "Dedicated nutritionist",
                    "Special event catering",
                    "Kitchen priority access",
                  ].map((text) => (
                    <li className="flex items-center" key={text}>
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-sm dark:text-gray-200">{text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleChoose(99, "Platinum", "All-inclusive premium solution")}
                  className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                >
                  Choose Platinum
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default Packages;

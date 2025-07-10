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
      state: {
        amount,
        title,
        description,
      },
    });
  };

  return (
    <>
      <div className="bg-orange-50">
        <main className="p-6 container mx-auto">
          {/* Pricing Packages Section */}
          <div className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Choose Your Plan
              </h2>
              <p className="text-gray-600">
                Select the perfect package for your hostel meal needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Silver Package */}
              <Card className="relative border-2 border-gray-200 hover:border-gray-300 transition-colors">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-gray-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-800">Silver</CardTitle>
                  <CardDescription>Perfect for small hostel users</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">$29</span>
                    <span className="text-gray-600">/month</span>
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
                      <li className="flex items-center space-y-4" key={text}>
                        <Check className="w-4 h-4 text-green-500 mr-3" />
                        <span className="text-sm">{text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() =>
                      handleChoose(29, "Silver", "Perfect for small hostel users")
                    }
                    className="w-full bg-gray-600 hover:bg-gray-700"
                  >
                    Choose Silver
                  </Button>
                </CardContent>
              </Card>

              {/* Gold Package */}
              <Card className="relative border-2 border-yellow-400 hover:border-yellow-500 transition-colors shadow-lg">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-500 text-white px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-6 h-6 text-yellow-600" />
                  </div>
                  <CardTitle className="text-xl text-yellow-800">Gold</CardTitle>
                  <CardDescription>Best for regular hostel students</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-yellow-800">$59</span>
                    <span className="text-gray-600">/month</span>
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
                        <span className="text-sm">{text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() =>
                      handleChoose(59, "Gold", "Best for regular hostel students")
                    }
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                  >
                    Choose Gold
                  </Button>
                </CardContent>
              </Card>

              {/* Platinum Package */}
              <Card className="relative border-2 border-purple-400 hover:border-purple-500 transition-colors">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl text-purple-800">Platinum</CardTitle>
                  <CardDescription>All-inclusive premium solution</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-purple-800">$99</span>
                    <span className="text-gray-600">/month</span>
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
                        <span className="text-sm">{text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() =>
                      handleChoose(99, "Platinum", "All-inclusive premium solution")
                    }
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Choose Platinum
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Packages;

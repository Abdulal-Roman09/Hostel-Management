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

const PackagesHome = () => {
  return (
    <>
      <Navber />
      <main className="p-6">
        {/* Meal Packages Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-600 mb-2">
              Choose Your Meal Plan
            </h2>
            <p className="text-gray-600">
              Select the best meal subscription for your hostel stay
            </p>
          </div>

          <div className="container mx-auto px-2 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Basic Plan */}
            <Card className="relative border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-gray-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Basic Plan</CardTitle>
                <CardDescription>Ideal for minimal meal needs</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">$29</span>
                  <span className="text-gray-600">/month</span>
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
                    <li className="flex items-center space-y-4" key={text}>
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-sm">{text}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gray-600 hover:bg-gray-700">
                  Choose Basic
                </Button>
              </CardContent>
            </Card>

            {/* Standard Plan */}
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
                <CardTitle className="text-xl text-yellow-800">Standard Plan</CardTitle>
                <CardDescription>Best for regular hostel life</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-yellow-800">$59</span>
                  <span className="text-gray-600">/month</span>
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
                    <li className="flex space-y-2 items-center" key={text}>
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-sm">{text}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  Choose Standard
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-2 border-purple-400 hover:border-purple-500 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-purple-800">Premium Plan</CardTitle>
                <CardDescription>For top-tier meal services</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-purple-800">$99</span>
                  <span className="text-gray-600">/month</span>
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
                      <span className="text-sm">{text}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
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

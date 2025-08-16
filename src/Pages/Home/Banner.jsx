
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, Star } from "lucide-react";
import Image from "../../assets/banner.jpeg";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <div className="h-fit sm:pt-10  bg-orange-50 dark:bg-slate-900">
      <section className="relative flex items-center justify-center overflow-hidden">
    

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col justify-center space-y-6"
            >
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="w-fit dark:bg-slate-800 dark:text-slate-200"
                >
                  <Star className="w-3 h-3 mr-1" />
                  Trusted by University Admins and Students
                </Badge>

                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  <TypeAnimation
                    sequence={[
                      "University Hostel Meal Management System", 2000,
                      "Smart Food & Student Management", 2000,
                      "Meal Reviews & Scheduling Platform", 2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </h1>

                <p className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  This system enables students to log in, view and review meals,
                  while administrators can manage student data, meals, and food
                  reviews efficiently — built using the MERN stack.
                </p>
              </div>

              {/* Feature highlights */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>Meal Scheduling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-400" />
                  <span>Student Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>Food Reviews</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Button
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8"
                  >
                    Get Started Today
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 bg-transparent dark:border-gray-600 dark:text-gray-200"
                  >
                    View Demo
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={Image}
                  alt="University Hostel Dashboard"
                  className="object-cover w-full h-full"
                />

                {/* Floating Cards */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute top-4 left-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 max-w-[200px]"
                >
                  <div className="flex items-center gap-2 text-sm dark:text-gray-200">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="font-medium">92% Hall Occupancy</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    ↑ 8% from last semester
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="absolute bottom-4 right-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 max-w-[180px]"
                >
                  <div className="text-sm font-medium dark:text-gray-200">
                    New Review Submitted
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Alex K. – “Loved the lunch today!”
                  </p>
                  <p className="text-xs text-orange-600 mt-1">2 mins ago</p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>

      
      </section>
    </div>
  );
}

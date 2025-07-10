import React from "react";
import Image from "../../assets/appImage.png";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dot from "./Dot";

const randomAvatars = [
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=27",
  "https://i.pravatar.cc/150?img=34",
];

export default function AppDownload() {
  return (
    <div className="relative h-fit py-10 bg-orange-50 overflow-hidden">
      {/* Decorative Dots */}
      {/* Center-focused decorative dots */}
     <Dot/>
      {/* Decorative Circle */}
      <div className="absolute top-64 right-16 w-8 h-8 bg-gradient-to-br from-red-400 to-orange-500 rounded-full opacity-80"></div>

      {/* Main Grid */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="mb-16">
              <Button
                variant="secondary"
                className="bg-orange-200 hover:bg-orange-300 text-orange-800 border-0 rounded-full px-8 py-2 font-medium"
              >
                Download App
              </Button>
            </div>

            <div className="max-w-xl">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight mb-8">
                Get Started With Us Today!
              </h1>

              <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                Discover food wherever and whenever and get your food delivered
                quickly.
              </p>

              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                Order Now
              </Button>
            </div>

            <div className="flex space-x-4 pt-5">
              {randomAvatars.map((avatar, idx) => (
                <div
                  key={idx}
                  className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md"
                >
                  <img
                    src={avatar}
                    alt={`Avatar ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Only Image */}
          <div className="flex justify-center">
            <img
              src={Image}
              alt="Delicious food delivery"
              className="rounded-3xl  w-full max-w-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

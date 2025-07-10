import React from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "../../assets/tastimonialImage.png";
import Dot from "./Dot";

const TestimonialSection = () => {
  // Generate random avatars using pravatar.cc
  const reviewerAvatars = [
    "https://i.pravatar.cc/150?img=11",
    "https://i.pravatar.cc/150?img=12",
    "https://i.pravatar.cc/150?img=13",
  ];

  const bottomReviewerAvatars = [
    "https://i.pravatar.cc/150?img=21",
    "https://i.pravatar.cc/150?img=22",
    "https://i.pravatar.cc/150?img=23",
    "https://i.pravatar.cc/150?img=24",
  ];

  const customerAvatar = "https://i.pravatar.cc/150?img=30";
  const customerName = "Will Byers";

  return (
    <section className="bg-orange-50 py-16 px-4 md:px-6 lg:px-8">
      {/* Decorative random dots across the full page */}
      {/* Center-focused decorative dots */}
    
<Dot/>
     

      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <img
              src={Image}
              className="w-full h-auto object-cover rounded-lg"
              alt="Testimonial"
            />

            {/* Our Reviewers Badge */}
            <div className="absolute bottom-8 left-8 bg-white rounded-lg p-4 shadow-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Our Reviewers
              </p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {reviewerAvatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className="w-8 h-8 border-2 border-white"
                    >
                      <AvatarImage src={avatar} />
                      <AvatarFallback>U{index + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  12k
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Testimonial */}
          <div className="space-y-8">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
              Testimonials
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              What They Say About Us.
            </h2>

            {/* Testimonial Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={customerAvatar} />
                  <AvatarFallback>{customerName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {customerName}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="relative">
                <div className="text-6xl text-orange-400 font-bold absolute -top-4 -left-2">
                  "
                </div>
                <p className="text-gray-600 text-lg leading-relaxed pl-8">
                  Food is the best. Besides the many and delicious meals, the
                  service is also very good, especially in the very fast
                  delivery. I highly recommend Food to you.
                </p>
                <div className="text-6xl text-orange-400 font-bold absolute -bottom-8 right-0">
                  "
                </div>
              </div>
            </div>

            {/* Bottom reviewer avatars */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {bottomReviewerAvatars.map((avatar, index) => (
                  <Avatar
                    key={index}
                    className="w-12 h-12 border-4 border-white"
                  >
                    <AvatarImage src={avatar} />
                    <AvatarFallback>R{index + 1}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

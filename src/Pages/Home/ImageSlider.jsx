import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Dot from "./Dot";

const slides = [
  {
    src: "https://i.ibb.co/RpDXn6kg/yoav-aziz-Ai-HJi-RCw-B3w-unsplash.jpg",
    title: "Fresh Fruits & Salads",
    price: "৳120",
  },
  {
    src: "https://i.ibb.co/G1tyJ5k/nick-bratanek-h9-Yj-JSTy-Ga-Y-unsplash.jpg",
    title: "Healthy Rice Bowls",
    price: "৳150",
  },
  {
    src: "https://i.ibb.co/RpjPDT58/vd-photography-TGLf-Kvgzy-AQ-unsplash.jpg",
    title: "Spicy Curry Dishes",
    price: "৳180",
  },
  {
    src: "https://i.ibb.co/zWjYFPpd/maksym-mazur-g-CT7s8-Ql-THs-unsplash.jpg",
    title: "Evening Snacks",
    price: "৳90",
  },
  {
    src: "https://i.ibb.co/35dzxrQr/nick-bratanek-h9-Yj-JSTy-Ga-Y-unsplash.jpg",
    title: "Biryani & More",
    price: "৳220",
  },
];

const ImageSlider = () => {
  return (
    <div className="bg-orange-50 py-12 px-4">
      <Dot />
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="inline-block bg-orange-100 dark:bg-orange-700 text-orange-600 dark:text-orange-100 px-4 py-2 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-medium my-10 flxe items-center">
            Different Kinds of Meals
          </div>
        </div>

        <div className="w-full px-2 md:px-4 lg:px-6">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[700px] ">
                  <img
                    src={slide.src}
                    alt={`Slide ${index}`}
                    className="absolute inset-0 w-full h-full object-cover object-center brightness-75"
                  />

                  <div className="absolute top-4 left-4 bg-orange-600 text-white font-semibold px-5 py-3 rounded-full shadow-lg text-lg md:text-xl">
                    {slide.price}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl md:text-4xl font-bold bg-black/50 px-6 py-2 rounded-xl shadow-md text-center">
                      {slide.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;

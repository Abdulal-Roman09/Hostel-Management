import React from "react";
import Banner from "./Banner";
import TestimonialSection from "./TestimonialSection";
import AppDownload from "./AppDownload";
import FoodLottie from "./Lotti/FoodLottie";
import ImageSlider from "./ImageSlider";
import Packages from "../Dashbord/User/Packages";
import CategoryMeals from "./MealsCategorires/CategoryMeals";
import UpcommingHome from "./UpcommingHome";
import FAQ from "@/components/Faq/Faq";

const Home = () => {
  return (
    <div>
      <Banner id="banner" />
      <TestimonialSection id="testimonials" />
      <UpcommingHome id="upcoming" />
      <ImageSlider id="slider" />
      <CategoryMeals id="categories" />
      <AppDownload id="appdownload" />
      <FAQ id="faq" />
      <Packages id="packages" />
    </div>
  );
};

export default Home;

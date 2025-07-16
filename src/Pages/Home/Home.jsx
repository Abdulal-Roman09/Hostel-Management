import React from "react";
import Banner from "./Banner";
import TestimonialSection from "./TestimonialSection";
import AppDownload from "./AppDownload";
import FoodLottie from "./Lotti/FoodLottie";
import ImageSlider from "./ImageSlider";
import Packages from "../Dashbord/User/Packages";
import CategoryMeals from "./MealsCategorires/CategoryMeals";
import UpcommingHome from "./UpcommingHome";

const Home = () => {
  return (
    <div>
      <Banner />
      <TestimonialSection />
      <UpcommingHome />
      <ImageSlider />
      <CategoryMeals />
      <AppDownload />
      <Packages />
    </div>
  );
};

export default Home;

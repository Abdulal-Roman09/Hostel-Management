import React from "react";
import Lottie from "lottie-react";
import foodAnimation from "../../../assets/Lotti/foodSwipe.json";

const FoodLottie = () => {
  return (
    <div className="h-100 w-100 bg-orange-50">
      <Lottie animationData={foodAnimation} loop={true} />
    </div>
  );
};

export default FoodLottie;

import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw] bg-amber-50">
      <div className="spinner-8 relative w-12 h-12 bg-black rounded-full animate-spin text-[#FF3D00]">
        <div className="absolute w-3 h-3 bg-current rounded-full top-2.5 left-1.5 shadow-[25px_2px_0_0_currentColor,10px_22px_0_0_currentColor]"></div>
      </div>
    </div>
  );
};

export default Loader;

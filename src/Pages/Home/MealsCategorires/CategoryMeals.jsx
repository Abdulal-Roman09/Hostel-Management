import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import Loader from "./../../Loader/Loader";
import Navbar from "./../../../components/shared/Navber";
import Footer from "./../../../components/shared/footer";
import Dot from "./../../Home/Dot";
import SingleAllMeals from "./../../Dashbord/User/AllMeals/SingleAllMeals";

const CategoryMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState("All Meals");

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meals", category],
    queryFn: async () => {
      const query = category === "All Meals" ? "" : `?category=${category}`;
      const res = await axiosSecure.get(`/categorys${query}`);
      return res.data;
    },
  });

  const categories = ["All Meals", "Breakfast", "Lunch", "Dinner"];

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">Failed to load meals.</p>
    );

  return (
    <>
      <Dot />
      <div className="bg-orange-50 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">
            {category}
          </h2>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  category === cat
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-orange-600 border-orange-300 hover:bg-orange-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Meals Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.length ? (
              data.map((product) => (
                <SingleAllMeals key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No meals found in this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryMeals;

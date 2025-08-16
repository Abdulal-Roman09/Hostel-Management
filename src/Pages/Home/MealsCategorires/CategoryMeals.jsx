import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import Loader from "./../../Loader/Loader";
import Dot from "./../../Home/Dot";
import SingleAllMeals from "./../../Dashbord/User/AllMeals/SingleAllMeals";

const CategoryMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState("All Meals");
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 10;

  const {
    data = { meals: [], total: 0 },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meals", category, currentPage],
    queryFn: async () => {
      const categoryParam =
        category === "All Meals" ? "" : `&category=${category}`;
      const res = await axiosSecure.get(
        `/categorys?page=${currentPage}&limit=${mealsPerPage}${categoryParam}`
      );
      return res.data;
    },
  });

  const categories = ["All Meals", "Breakfast", "Lunch", "Dinner"];

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">Failed to load meals.</p>
    );

  const totalPages = Math.ceil(data.total / mealsPerPage);

  return (
    <>
      <Dot />
      <div className="bg-orange-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="inline-block bg-orange-100 dark:bg-orange-700 text-orange-600 dark:text-orange-100 px-4 py-2 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-medium my-10 flxe items-center">
              Category Meals
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">
            {category}
          </h2>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setCurrentPage(1); // reset to first page
                }}
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
            {data.meals.length ? (
              data.meals.map((product) => (
                <SingleAllMeals key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No meals found in this category.
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 flex-wrap gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md text-sm border ${
                      currentPage === page
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-orange-600 border-orange-300 hover:bg-orange-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryMeals;

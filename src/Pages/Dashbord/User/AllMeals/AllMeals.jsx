import React, { useState, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import Loader from './../../../Loader/Loader';
import SingleAllMeals from './SingleAllMeals';
import Navbar from './../../../../components/shared/Navber';
import Footer from './../../../../components/shared/footer';
import Dot from './../../../Home/Dot';

const CategoryMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState("All Meals");
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["meals", category, searchText],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = new URLSearchParams({
        category: category !== "All Meals" ? category : "",
        search: searchText,
        page: pageParam,
        limit: 10,
      });
      const res = await axiosSecure.get(`/foods?${queryParams.toString()}`);
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.reduce(
        (acc, page) => acc + page.data.length,
        0
      );
      return loadedItems < lastPage.total ? allPages.length + 1 : undefined;
    },
    keepPreviousData: true,
  });

  const observer = useRef();
  const lastMealRef = useCallback(
    (node) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchText(searchInput.trim());
    }
  };

  const handleSearchClick = () => {
    setSearchText(searchInput.trim());
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-600 dark:text-red-400">
        Failed to load meals.
      </p>
    );

  return (
    <>
      <Navbar />
      <Dot />
      <div className="bg-amber-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
        <div className="container mx-auto px-4 py-10">
          {/* Search input with button */}
          <div className="mb-6 max-w-md mx-auto flex gap-2">
            <input
              type="text"
              placeholder="Search meals..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200"
            />
            <button
              onClick={handleSearchClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Search
            </button>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {["All Meals", "Breakfast", "Lunch", "Dinner"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  category === cat
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 border-orange-300 dark:border-gray-600 hover:bg-orange-100 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Meals Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.pages.flatMap((page, pageIndex) =>
              page.data.map((product, i) => {
                if (
                  pageIndex === data.pages.length - 1 &&
                  i === page.data.length - 1
                ) {
                  return (
                    <SingleAllMeals
                      key={product._id}
                      product={product}
                      ref={lastMealRef}
                    />
                  );
                }
                return <SingleAllMeals key={product._id} product={product} />;
              })
            )}
          </div>

          {/* Loading Indicator */}
          {isFetchingNextPage && <Loader />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryMeals;

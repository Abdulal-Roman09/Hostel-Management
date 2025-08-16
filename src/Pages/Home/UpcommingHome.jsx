import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import Loader from "../Loader/Loader";
import SingleUpcommingMeals from "../Dashbord/Admin/UpcomingMeals/SingleUpcommingMeals";
import Dot from "./Dot";

const UpcommingHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcoming-meals");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-600 dark:text-red-400">
        Failed to load upcoming meals.
      </p>
    );

  return (
    <>
      <Dot />
      <div className="bg-orange-50 dark:bg-slate-900">
        <div className="flex justify-center">
          <p className="inline-block bg-orange-100 dark:bg-orange-700 text-orange-600 dark:text-orange-100 px-4 py-2 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-medium my-6 ">
            Upcoming Meals
          </p>
        </div>
        <div className="container mx-auto px-4 py-10">
          {/* Meals Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.length ? (
              data.map((product) => (
                <SingleUpcommingMeals key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No upcoming meals available.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcommingHome;

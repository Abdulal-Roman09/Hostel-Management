import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import Loader from "./../../../Loader/Loader";
import Navbar from "./../../../../components/shared/Navber";
import Footer from "./../../../../components/shared/footer";
import Dot from "./../../../Home/Dot";
import SingleUpcommingMeals from "./SingleUpcommingMeals";

const AllUpcommingMeals = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcoming-meals");
      console.log(res.data)
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load upcoming meals.
      </p>
    );

  return (
    <>
      <Navbar />
      <Dot />
      <div className="bg-amber-50">
        <div className="container mx-auto px-4 py-10">
          {/* Meals Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.map((product) => (
              <SingleUpcommingMeals key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllUpcommingMeals;

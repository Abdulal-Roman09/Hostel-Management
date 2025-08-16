import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Heart,
  Clock,
  Package,
  Plus,
  Minus,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import { FcLike } from "react-icons/fc";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import useUserRole from "./../../../../Hooks/useUserRole";
import Navbar from "./../../../../components/shared/Navber";
import Footer from "./../../../../components/shared/footer";
import Loader from "./../../../Loader/Loader";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const UpcommingMealsDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { role } = useUserRole();
  const navigate = useNavigate();
  const [cartQuantity, setCartQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["upcomingMealDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/upcoming-meals/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const likeMutation = useMutation({
    mutationFn: async (mealId) => {
      const res = await axiosSecure.patch(`/upcoming-meals/${mealId}/likes`);
      return res.data;
    },
    onSuccess: (updatedMeal) => {
      queryClient.setQueryData(["upcomingMealDetails", id], (oldData) => ({
        ...oldData,
        likes: updatedMeal.likes,
      }));
      queryClient.invalidateQueries(["upcomingMeals"]);
    },
  });

  const handleQuantityChange = (type) => {
    if (type === "increase" && cartQuantity < product.quantity) {
      setCartQuantity((prev) => prev + 1);
    } else if (type === "decrease" && cartQuantity > 1) {
      setCartQuantity((prev) => prev - 1);
    }
  };

  if (isLoading) return <Loader />;
  if (isError || !product)
    return (
      <p className="text-center mt-10 text-red-600 dark:text-red-400">
        Meal not found.
      </p>
    );

  const totalPrice = cartQuantity * product.price;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-orange-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Image Section */}
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.productName}
                  className="w-full h-96 md:h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  {role === "subscriber" && (
                    <button
                      onClick={() => likeMutation.mutate(product._id)}
                      disabled={likeMutation.isLoading}
                      className="flex items-center gap-1 hover:scale-110"
                      title="Like this meal"
                    >
                      <FcLike size={60} />
                    </button>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 capitalize">
                  {product.productName}
                </h1>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-orange-400 text-orange-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    (4.8 rating)
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-1 flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  {product.likes || 0} Likes
                </p>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Price Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      ${product.price}
                    </span>
                    {/* <span className="text-lg text-gray-400 dark:text-gray-500 line-through">
                      ${product.cost + 100}
                    </span>
                    <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm font-medium">
                      Save ${product.cost + 100 - product.price}
                    </span> */}
                  </div>
                </div>

                {/* Stock Info */}
                <div className="mb-6 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-orange-500" />
                    {product.quantity} in stock
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    Added on {formatDate(product.createdAt)}
                  </p>
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-500" />
                    By {product.addedBy?.name}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      disabled={cartQuantity <= 1}
                      className="w-10 h-10 rounded-full border border-orange-300 dark:border-orange-500 flex items-center justify-center hover:bg-orange-50 dark:hover:bg-orange-600 disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium text-gray-900 dark:text-gray-100">
                      {cartQuantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      disabled={cartQuantity >= product.quantity}
                      className="w-10 h-10 rounded-full border border-orange-300 dark:border-orange-500 flex items-center justify-center hover:bg-orange-50 dark:hover:bg-orange-600 disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="mb-6 p-4 bg-orange-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Total Price:</span>
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      ${totalPrice}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full bg-gray-400 dark:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Available After Approval
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpcommingMealsDetails;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
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
import Navbar from "./../../../components/shared/Navber";
import Footer from "./../../../components/shared/footer";
import { FcLike } from "react-icons/fc";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const MealDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient(); // ✅ FIXED

  const [cartQuantity, setCartQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mealDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/foods/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const likeMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/foods/${id}/likes`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mealDetails", id]);
      queryClient.invalidateQueries(["allMeals"]);
    },
  });

  const handleQuantityChange = (type) => {
    if (type === "increase" && cartQuantity < product.quantity) {
      setCartQuantity((prev) => prev + 1);
    } else if (type === "decrease" && cartQuantity > 1) {
      setCartQuantity((prev) => prev - 1);
    }
  };

  if (isLoading)
    return <p className="text-center mt-10 text-orange-500">Loading...</p>;
  if (isError || !product)
    return <p className="text-center mt-10 text-red-600">Meal not found.</p>;

  const totalPrice = cartQuantity * product.price;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-orange-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
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
                  <button
                    onClick={() => likeMutation.mutate(product._id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600"
                  >
                    {/* <Heart color="red" size={40} className="w-4 h-4" /> */}
                    <FcLike className="hover:scale-120" size={60} />
                  </button>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
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
                  <span className="text-sm text-gray-600">(4.8 rating)</span>
                </div>

                <p className="text-gray-600 text-sm mb-1">
                  <Heart className="w-4 h-4 inline text-red-500 mr-1" />
                  {product.Likes || 0} Likes
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-orange-600">
                      ${product.price}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ${product.cost + 100}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                      Save ${product.cost + 100 - product.price}
                    </span>
                  </div>
                </div>

                {/* Stock Info */}
                <div className="mb-6 space-y-2 text-sm text-gray-600">
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

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      disabled={cartQuantity <= 1}
                      className="w-10 h-10 rounded-full border border-orange-300 flex items-center justify-center hover:bg-orange-50 disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">
                      {cartQuantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      disabled={cartQuantity >= product.quantity}
                      className="w-10 h-10 rounded-full border border-orange-300 flex items-center justify-center hover:bg-orange-50 disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Price:</span>
                    <span className="text-2xl font-bold text-orange-600">
                      ${totalPrice}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button className="w-full border border-orange-500 text-orange-500 hover:bg-orange-50 py-3 px-6 rounded-lg font-medium transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Product Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Details</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Fresh and organic</li>
                  <li>• Rich in vitamins</li>
                  <li>• Premium quality</li>
                  <li>• Carefully selected</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Nutritional Benefits
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• High in Vitamin C</li>
                  <li>• Contains antioxidants</li>
                  <li>• Low in calories</li>
                  <li>• Good source of potassium</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MealDetails;

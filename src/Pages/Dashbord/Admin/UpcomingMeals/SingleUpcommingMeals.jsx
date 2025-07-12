import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Package, Clock, Heart } from "lucide-react";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
};

const SingleUpcommingMeals = forwardRef(({ product }, ref) => {
    console.log(product)
  return (
    <div
      ref={ref}
      className="bg-white rounded-xl border border-orange-200 overflow-hidden shadow-sm transition-transform hover:scale-[1.02]"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.productName || "Meal Image"}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {product.category || "Unknown"}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          <span className="bg-white text-orange-600 px-2 py-1 rounded-full text-xs font-medium border border-orange-200">
            ${product.price ?? "0.00"}
          </span>
          <span className="flex items-center gap-1 text-xs bg-orange-100 px-2 py-1 rounded-full text-orange-600 border border-orange-200">
            <Heart className="w-3 h-3" /> {product.likes ?? 0} Likes
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
          {product.productName || "Unnamed Meal"}
        </h3>

        <p className="text-gray-600 text-sm mb-4">
          {product.description || "No description available."}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Package className="w-3 h-3" />
            <span>{product.quantity ?? 0} in stock</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{formatDate(product.createdAt)}</span>
          </div>
        </div>

        {/* Added By */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.addedBy?.photo ? (
              <img
                src={product.addedBy.photo}
                alt={product.addedBy.name ?? "User"}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-semibold text-sm">
                {product.addedBy?.name
                  ? product.addedBy.name.charAt(0).toUpperCase()
                  : "?"}
              </div>
            )}
            <span className="text-xs text-gray-600">
              {product.addedBy?.name || "Unknown"}
            </span>
          </div>
          <Link to={`/upcomingmealsdetails/${product._id}`}>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default SingleUpcommingMeals;

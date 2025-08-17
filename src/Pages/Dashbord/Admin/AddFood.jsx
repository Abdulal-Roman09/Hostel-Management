import React from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { Upload } from "lucide-react";
import useAuth from "./../../../Hooks/useAuth";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import { imageUpload } from "../../../Api/utils";
import { toast } from "react-hot-toast";

export default function AddFood() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();

  const price = watch("price") || 0;
  const quantity = watch("quantity") || 0;
  const totalCost = parseFloat(price) * parseInt(quantity);

  const onSubmit = async (formData) => {
    try {
      const imageFile = formData.image[0];
      const uploadedImageUrl = await imageUpload(imageFile);

      const foodData = {
        productName: formData.productName,
        category: formData.category,
        description: formData.description,
        price: parseFloat(formData.price),
        cost: totalCost,
        quantity: parseInt(formData.quantity, 10),
        image: uploadedImageUrl,
        Likes: 0,
        addedBy: {
          name: user?.displayName || "Anonymous",
          email: user?.email || "N/A",
          photo: user?.photoURL || "N/A",
        },
        createdAt: new Date().toISOString(),
        comments: [],
      };

      const res = await axiosSecure.post("/foods", foodData);
      console.log("Upload success:", res.data);
      toast.success("Food added successfully!");
      reset();
    } catch (error) {
      console.error("Upload error:", error.message);
      toast.error("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-gray-900 py-6 px-4 flex justify-center transition-colors duration-300">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 transition-colors duration-300">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-600 dark:text-orange-400 mb-6 text-center transition-colors duration-300">
          Add New Food Product
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap gap-6 items-center justify-between"
        >
          {/* Image Upload */}
          <div className="flex-1 min-w-[260px]">
            <label className="mb-1 font-semibold text-orange-700 dark:text-orange-400 flex items-center gap-2 transition-colors duration-300">
              <Upload size={20} className="text-orange-600 dark:text-orange-400" />
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Product image is required" })}
              className="w-full text-sm text-gray-600 dark:text-gray-300
                file:mr-4 file:py-1.5 file:px-3
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-orange-200 dark:file:bg-orange-700 file:text-orange-800 dark:file:text-orange-100
                hover:file:bg-orange-300 dark:hover:file:bg-orange-600 transition-colors duration-300"
            />
            {errors.image && (
              <p className="text-red-600 dark:text-red-400 mt-1 transition-colors duration-300">{errors.image.message}</p>
            )}
          </div>

          {/* Product Name */}
          <div className="flex-1 min-w-[260px]">
            <label className="block mb-1 font-semibold text-orange-700 dark:text-orange-400 transition-colors duration-300">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              {...register("productName", { required: "Product name is required" })}
              className="w-full border border-orange-400 dark:border-orange-600 rounded px-3 py-2
                bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200
                focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-colors duration-300"
            />
            {errors.productName && (
              <p className="text-red-600 dark:text-red-400 mt-1 transition-colors duration-300">{errors.productName.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="flex-1 min-w-[260px]">
            <label className="block mb-1 font-semibold text-orange-700 dark:text-orange-400 transition-colors duration-300">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full border border-orange-400 dark:border-orange-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200
                focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-colors duration-300"
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="All Meals">All Meals</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            {errors.category && (
              <p className="text-red-600 dark:text-red-400 mt-1 transition-colors duration-300">{errors.category.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex-[2_1_540px] min-w-[260px]">
            <label className="block mb-1 font-semibold text-orange-700 dark:text-orange-400 transition-colors duration-300">
              Description
            </label>
            <textarea
              placeholder="Enter product description"
              rows={4}
              {...register("description", { required: "Description is required" })}
              className="w-full border border-orange-400 dark:border-orange-600 rounded px-3 py-2 resize-none
                bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200
                focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-colors duration-300"
            />
            {errors.description && (
              <p className="text-red-600 dark:text-red-400 mt-1 transition-colors duration-300">{errors.description.message}</p>
            )}
          </div>

          {/* Price, Cost, Quantity */}
          <div className="flex gap-4 w-full max-w-3xl">
            {/* Price */}
            <div className="flex-1 min-w-[80px]">
              <label className="block mb-1 font-semibold text-orange-700 dark:text-orange-400 transition-colors duration-300">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
                className="w-full border border-orange-400 dark:border-orange-600 rounded px-3 py-2
                  bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200
                  focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-colors duration-300"
              />
              {errors.price && (
                <p className="text-red-600 dark:text-red-400 mt-1 transition-colors duration-300">{errors.price.message}</p>
              )}
            </div>

            {/* Cost */}
            <div className="flex-1 min-w-[80px]">
              <label className="block mb-1 font-semibold text-orange-700 dark:text-orange-400 transition-colors duration-300">
                Cost ($)
              </label>
              <input
                type="number"
                value={isNaN(totalCost) ? "" : totalCost.toFixed(2)}
                readOnly
                className="w-full border border-orange-400 dark:border-orange-600 rounded px-3 py-2
                  bg-orange-100 dark:bg-orange-700 text-orange-800 dark:text-orange-100 font-semibold transition-colors duration-300"
              />
            </div>

            {/* Quantity */}
            <div className="flex-1 min-w-[80px]">
              <label className="block mb-1 font-semibold text-orange-700 dark:text-orange-400 transition-colors duration-300">
                Quantity
              </label>
              <input
                type="number"
                placeholder="Qty"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 0, message: "Quantity must be positive" },
                })}
                className="w-full border border-orange-400 dark:border-orange-600 rounded px-3 py-2
                  bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200
                  focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-colors duration-300"
              />
              {errors.quantity && (
                <p className="text-red-600 dark:text-red-400 mt-1 transition-colors duration-300">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="w-full flex justify-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-600
                disabled:opacity-50 disabled:cursor-not-allowed
                text-white font-bold py-2 px-8 rounded transition-colors duration-300"
            >
              <FiPlus size={20} />
              {isSubmitting ? "UPLOADING..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../shared/Navber";
import Footer from "../shared/footer";
import GoogleLogin from "./GogleLogin";
import useAuth from "./../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

async function imageUpload(file) {
  const apiKey = import.meta.env.VITE_img_api_key;
  if (!apiKey) throw new Error("API key is missing");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    return data.data.display_url;
  } else {
    throw new Error("Image upload failed");
  }
}

export default function RegisterForm() {
  const { createUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchImage = watch("image");

  const onSubmit = async (data) => {
    try {
      const file = data.image[0];
      const imageUrl = await imageUpload(file);

      const result = await createUser(data.email, data.password);

      await updateUserProfile({
        displayName: data.name,
        photoURL: imageUrl,
      });

      await axiosSecure.post("/users", {
        email: data.email,
        role: "user",
        packages: "Bronze",
        created_at: new Date().toISOString(),
        last_login_at: new Date().toISOString(),
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have registered successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="py-10 bg-orange-50 dark:bg-gray-900 transition-colors duration-300">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-6 border rounded-xl space-y-6 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 transition-colors duration-300"
          encType="multipart/form-data"
        >
          <h1 className="text-center text-4xl font-bold text-orange-500 dark:text-orange-400 transition-colors duration-300">
            Register Form
          </h1>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-medium text-gray-600 dark:text-gray-300 transition-colors duration-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border px-3 py-2 rounded border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 transition-colors duration-300"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-600 dark:text-gray-300 transition-colors duration-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border px-3 py-2 rounded border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 transition-colors duration-300"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-medium text-gray-600 dark:text-gray-300 transition-colors duration-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full border px-3 py-2 rounded border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 transition-colors duration-300"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label
              htmlFor="image"
              className="block mb-1 font-medium text-gray-600 dark:text-gray-300 transition-colors duration-300"
            >
              Profile Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              {...register("image", { required: "Profile image is required" })}
              className="w-full border px-3 py-2 rounded border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 transition-colors duration-300"
            />
            {errors.image && (
              <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>
            )}

            {watchImage && watchImage.length > 0 && (
              <img
                src={URL.createObjectURL(watchImage[0])}
                alt="Preview"
                className="mt-2 h-24 w-24 object-cover rounded"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary dark:bg-orange-500 text-white py-2 rounded hover:bg-primary-dark dark:hover:bg-orange-400 transition-colors duration-300"
          >
            Register
          </button>

          {/* Login link */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors duration-300"
            >
              Login
            </Link>
          </p>
        </form>
        <GoogleLogin />
      </div>
      <Footer />
    </>
  );
}

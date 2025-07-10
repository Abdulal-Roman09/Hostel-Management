import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "../shared/Navber";
import Footer from "../shared/footer";
import GoogleLogin from "./GogleLogin";
import { Link, useNavigate } from "react-router";
import useAuth from "./../../Hooks/useAuth";
import { imageUpload } from "./../../Api/utils";


export default function RegisterForm() {
  const { createUser, updateUserProfile } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchImage = watch("image");

  // ✅ Async submit handler
  const onSubmit = async (data) => {
    try {
      const file = data.image[0];

      // 1. Upload image
      const imageUrl = await imageUpload(file);
      console.log("Image URL:", imageUrl);

      // 2. Create user
      const result = await createUser(data.email, data.password);
      console.log("User created:", result.user);
    
      // 3. Update user profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: imageUrl,
      });
      // after uploading every think navgaate to home
      navigate("/");
      console.log("Profile updated");

      // Optional: redirect user or show toast here
    } catch (err) {
      console.error("Registration error:", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-4 border rounded-xl space-y-4"
        >
          <h1 className="text-center text-4xl font-bold">Register Form</h1>

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="image">
              Profile Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              {...register("image", { required: "Profile image is required" })}
              className="w-full border-1 py-2 rounded-sm px-2"
            />
            {errors.image && (
              <p className="text-red-600 text-sm mt-1">
                {errors.image.message}
              </p>
            )}

            {watchImage && watchImage.length > 0 && (
              <img
                src={URL.createObjectURL(watchImage[0])}
                alt="Preview"
                className="mt-2 h-24 w-24 object-cover rounded"
              />
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="password">
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
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
          >
            Register
          </button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
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

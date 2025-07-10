import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navber";
import Footer from "../shared/footer";
import GoogleLogin from "./GogleLogin";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // Call your login logic here (API or Firebase auth)
  };

  return (
    <>
      <Navbar />
      <div className="py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-4 border rounded-xl space-y-4"
        >
          <h1 className="text-center text-4xl font-bold">Login</h1>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
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
            Login
          </button>

          {/* Register Link */}
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </form>

        <GoogleLogin />
      </div>
      <Footer />
    </>
  );
}

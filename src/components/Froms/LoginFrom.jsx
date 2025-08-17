import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navber";
import Footer from "../shared/footer";
import GoogleLogin from "./GogleLogin";
import useAuth from "./../../Hooks/useAuth";
import Swal from "sweetalert2";

export default function LoginForm() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userCredential = await loginUser(data.email, data.password);
      console.log("Login successful:", userCredential.user);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${userCredential.user.email}`,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
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
        >
          <h1 className="text-center text-4xl font-bold text-orange-500 dark:text-orange-400 transition-colors duration-300">
            Login
          </h1>

          {/* Email */}
          <div>
            <label
              className="block mb-1 font-medium text-gray-600 dark:text-gray-300 transition-colors duration-300"
              htmlFor="email"
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
              className="block mb-1 font-medium text-gray-600 dark:text-gray-300 transition-colors duration-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full border px-3 py-2 rounded border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 transition-colors duration-300"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary dark:bg-orange-500 text-white py-2 rounded hover:bg-primary-dark dark:hover:bg-orange-400 transition-colors duration-300"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors duration-300"
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

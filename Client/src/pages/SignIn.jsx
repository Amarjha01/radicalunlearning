import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/signin", data);
      alert("Login Successful!");
      console.log(response.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10  text-white font-sans">
      <div className="relative w-full max-w-md bg-[#111827] p-8 rounded-2xl border border-white/10 shadow-lg glow-hover">
        <div className="absolute -top-5 -left-5 w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 blur-2xl rounded-full -z-10 opacity-50" />
        <h2 className="text-3xl anta-regular text-center mb-6">Sign In</h2>

        {errorMessage && (
          <p className="text-red-400 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="flex items-center gap-2 bg-[#1f2937] p-3 rounded-lg border border-gray-600 focus-within:border-blue-500">
            <FaUserAlt className="text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="bg-transparent outline-none text-white w-full"
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <div className="flex items-center gap-2 bg-[#1f2937] p-3 rounded-lg border border-gray-600 focus-within:border-blue-500">
            <RiLockPasswordFill className="text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="bg-transparent outline-none text-white w-full"
            />
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-semibold py-2 rounded-lg hover:brightness-110 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Redirect */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup/learner"
            className="text-blue-400 hover:underline transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

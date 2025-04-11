import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import API from "../common/apis/ServerBaseURL";
const SignIn = () => {
  const [submitting, isSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false)

  const handleShowPass = ()=>{
    setShowPass(!showPass);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      isSubmitting(true);
      const response = await axios.post(
        `API.signin.url`,
        data
      );
      alert("Login Successful!");
      console.log(response.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed.");
      console.log("errror: ", error);
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
          {/* role */}
          <div>
            <div className="flex items-center gap-2 bg-[#1f2937] p-3 rounded-lg border border-gray-600 focus-within:border-blue-500">
              <FaUserAlt className="text-gray-400" />
              <input
                placeholder="Role ex- ADMIN , LEARNER , EDUCATOR"
                {...register("role", {
                  required: "Role is required",
                  pattern: {
                    value: /^(ADMIN|LEARNER|EDUCATOR)$/i,
                    message: "Invalid role (must be admin, learner, or educator)",
                  },
                })}
                className="bg-transparent outline-none text-white w-full"
              />
            </div>
            {errors.role && (
              <p className="text-red-400 text-sm">{errors.role.message}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <div className="flex items-center gap-2 bg-[#1f2937] p-3 rounded-lg border border-gray-600 focus-within:border-blue-500">
              <FaUserAlt className="text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
                className="bg-transparent outline-none text-white w-full"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center gap-2 bg-[#1f2937] p-3 rounded-lg border border-gray-600 focus-within:border-blue-500">
              <RiLockPasswordFill className="text-gray-400" />
              <input
                type={`${showPass ? 'string' : 'password'}`}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Password too long",
                  },
                  validate: (value) => {
                    const hasScriptTag = /<script.*?>.*?<\/script>/i.test(value);
                    return !hasScriptTag || "No script tags allowed!";
                  }
                })}
                className="bg-transparent outline-none text-white w-full"
              />
               <button
      type="button"
      onClick={handleShowPass}
      className="text-xl text-gray-400 focus:outline-none cursor-pointer"
    >
      {showPass ?  <IoMdEye /> : <IoMdEyeOff />}
    </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-semibold py-2 rounded-lg hover:brightness-110 transition-all cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Redirect */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup/learner"
            className="text-blue-400 hover:underline transition cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

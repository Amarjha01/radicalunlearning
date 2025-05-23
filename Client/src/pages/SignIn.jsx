import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import API from "../common/apis/ServerBaseURL.jsx";
import { useDispatch } from 'react-redux';
import { userinfo } from "../store/slices/userSlice.jsx";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast, showNetworkErrorToast } from "../utils/Notification.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitting, isSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

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
        API.signIn.url,
        data,
        {
          withCredentials: true,
        }
      );

      if (response?.data?.success === true) {
        const responseData = response.data;
        const userData = responseData.userData;
        const statePayload = {
          userData,
        };
        dispatch(userinfo(statePayload));

        if (response?.status === 200) {
      showSuccessToast("Login successful.");
  }
        const timeout = setTimeout(() => {
          navigate(`/dashboard/${userData.role.toLowerCase()}`);
        }, 1000);

      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed.");
      console.log("error: ", error);
       if (error.message === "Network Error") {
              showNetworkErrorToast(
                "Your Network connection Is Unstable OR Disconected"
              );
            }
    }
  };

 

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 text-black font-sans">
         <ToastContainer
  position="top-right"
  autoClose={4000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
      <div className="relative w-full max-w-md bg-[#b4c0b2] p-8 rounded-2xl border border-white/10 shadow-lg glow-hover">
        <div className="" />
        <h2 className="text-3xl anta-regular text-center mb-6 ">Sign In</h2>

        {errorMessage && (
          <p className="text-red-400 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Role */}
{/* Role Dropdown */}
<div>
  <div className="flex items-center gap-2 bg-[#868674] p-3 rounded-lg border border-gray-600 focus-within:border-blue-500">
    <FaUserAlt className="text-black" />
    <select
      {...register("role", { required: "Role is required" })}
      className=" outline-none text-black bg-[#868674] w-full"
      defaultValue=""
    >
      <option value="" disabled className="text-black">
        Select Role
      </option>
      <option value="ADMIN" className="text-black">ADMIN</option>
      <option value="LEARNER" className="text-black">LEARNER</option>
      <option value="EDUCATOR" className="text-black">EDUCATOR</option>
    </select>
  </div>
  {errors.role && (
    <p className="text-red-400 text-sm">{errors.role.message}</p>
  )}
</div>


          {/* Email */}
          <div>
            <div className="flex items-center gap-2 bg-[#868674] p-3 rounded-lg border border-gray-600 focus-within:border-blue-500">
              <FaUserAlt className="text-black" />
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
                className="bg-transparent outline-none text-black w-full"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center gap-2 bg-[#868674] p-3 rounded-lg border border-gray-600 focus-within:border-blue-500">
              <RiLockPasswordFill className="text-black" />
              <input
                type={`${showPass ? "string" : "password"}`}
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
                  },
                })}
                className="bg-transparent outline-none text-black w-full"
              />
              <button
                type="button"
                onClick={handleShowPass}
                className="text-xl text-black focus:outline-none cursor-pointer"
              >
                {showPass ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#f2c078] text-black font-semibold py-2 rounded-lg hover:brightness-110 transition-all cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Redirect */}
        <p className="text-center text-sm text-black mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup/learner"
            className="text-blue-800 hover:underline transition cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

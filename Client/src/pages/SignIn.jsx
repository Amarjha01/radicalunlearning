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
import NotificationSystem from "../notification/NotificationSystem.jsx";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitting, isSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [notification, setNotification] = useState(null); // State for notification

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const [notificationTimeout, setNotificationTimeout] = useState(null);

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

        // Trigger success notification
        setNotification({
          type: "success",
          message: "You have logged in successfully!",
        });

        // Set a 5-second timeout for navigation
        const timeout = setTimeout(() => {
          navigate(`/dashboard/${userData.role.toLowerCase()}`);
        }, 1000);

        setNotificationTimeout(timeout); // Store the timeout ID to clear it if needed
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed.");
      console.log("error: ", error);

      // Trigger error notification
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Login failed.",
        duration: 5000,
      });
    }
  };

  const handleDismissNotification = () => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout); // Clear the timeout if the notification is dismissed
    }
    navigate("/"); // Immediately navigate when notification is dismissed
  };

  useEffect(() => {
    // Clean up timeout if the component is unmounted before navigation
    return () => {
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
      }
    };
  }, [notificationTimeout]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 text-white font-sans">
      <div className="relative w-full max-w-md bg-[#111827] p-8 rounded-2xl border border-white/10 shadow-lg glow-hover">
        <div className="absolute -top-5 -left-5 w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 blur-2xl rounded-full -z-10 opacity-50" />
        <h2 className="text-3xl anta-regular text-center mb-6">Sign In</h2>

        {errorMessage && (
          <p className="text-red-400 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Role */}
{/* Role Dropdown */}
<div>
  <div className="flex items-center gap-2 bg-[#1f2937] p-3 rounded-lg border border-gray-600 focus-within:border-blue-500">
    <FaUserAlt className="text-gray-400" />
    <select
      {...register("role", { required: "Role is required" })}
      className="bg-transparent outline-none text-white w-full"
      defaultValue=""
    >
      <option value="" disabled className="text-gray-500">
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
                className="bg-transparent outline-none text-white w-full"
              />
              <button
                type="button"
                onClick={handleShowPass}
                className="text-xl text-gray-400 focus:outline-none cursor-pointer"
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

      {/* Display Notifications */}
      {notification && (
        <NotificationSystem
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
          onDismiss={handleDismissNotification} // Add dismiss functionality
        />
      )}
    </div>
  );
};

export default SignIn;

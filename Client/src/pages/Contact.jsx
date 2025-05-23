import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaUserAlt, FaRegCommentDots } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import axios from "axios";
import API from "../common/apis/ServerBaseURL.jsx";
import { showNetworkErrorToast } from "../utils/Notification.jsx";
const ContactUs = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(API.querymail.url, data);
      if (response.status) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
       if (error.message === "Network Error") {
              showNetworkErrorToast(
                "Your Network connection Is Unstable OR Disconected"
              );
            }
    }
    reset();
  };

  return (
    <section className="min-h-screen w-full    flex items-center justify-center px-6 py-16 md:px-16 orbitron-regular bg">
      <div className="bg-[#b4c0b2] p-10 rounded-2xl  max-w-xl w-full border border-[#1e2a48]">
        <h2 className="text-3xl md:text-4xl mb-8 text-center  text-black tracking-wide orbitron-regular">
          Contact Us
        </h2>

        {isSubmitSuccessful && (
          <p className="text-black text-center mb-4 font-semibold">
            Thank you! We’ve received your message.
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <div className="flex items-center bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48]">
              <FaUserAlt className="text-black mr-3" />
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
                className="bg-transparent outline-none w-full text-black anta-regular"
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48]">
              <FaEnvelope className="text-black mr-3" />
              <input
                type="email"
                placeholder="Your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                className="bg-transparent outline-none w-full text-black anta-regular"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <div className="flex items-center bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48]">
              <MdSubject className="text-black mr-3" />
              <input
                type="text"
                placeholder="Subject"
                {...register("subject", { required: "Subject is required" })}
                className="bg-transparent outline-none w-full text-black anta-regular"
              />
            </div>
            {errors.subject && (
              <p className="text-red-400 text-sm">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <div className="flex bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48]">
              <FaRegCommentDots className="text-black mr-3 mt-1" />
              <textarea
                placeholder="Your Message"
                rows={4}
                {...register("message", { required: "Message is required" })}
                className="bg-transparent outline-none w-full text-black anta-regular resize-none"
              />
            </div>
            {errors.message && (
              <p className="text-red-400 text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 px-6 py-3 rounded-full ${
                isLoading
                  ? "bg-[#f2c078]/70 cursor-not-allowed"
                  : "bg-[#f2c078] cursor-pointer hover:opacity-90"
              } text-black font-semibold tracking-wide transition duration-300`}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;

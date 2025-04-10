import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaUserAlt, FaRegCommentDots } from "react-icons/fa";
import { MdSubject } from "react-icons/md";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <section className="min-h-screen w-full   flex items-center justify-center px-6 py-16 md:px-16 orbitron-regular bg">
      <div className="bg-[#0b0f19]/80 p-10 rounded-2xl shadow-[0_0_40px_#2b6bff40] backdrop-blur-lg max-w-xl w-full border border-[#1e2a48]">
        <h2 className="text-3xl md:text-4xl mb-8 text-center bg-gradient-to-r from-[#6f57ff] via-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent tracking-wide orbitron-regular">
          Contact Us
        </h2>

        {isSubmitSuccessful && (
          <p className="text-green-400 text-center mb-4 font-semibold">
            Thank you! We’ve received your message.
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
<div>
<div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
            <FaUserAlt className="text-[#85b8ff] mr-3" />
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
              className="bg-transparent outline-none w-full text-white anta-regular"
            />
          </div>
          {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
</div>

          {/* Email */}
<div>
<div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
            <FaEnvelope className="text-[#85b8ff] mr-3" />
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
              className="bg-transparent outline-none w-full text-white anta-regular"
            />
          </div>
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
</div>

          {/* Subject */}
<div>
<div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
            <MdSubject className="text-[#85b8ff] mr-3" />
            <input
              type="text"
              placeholder="Subject"
              {...register("subject", { required: "Subject is required" })}
              className="bg-transparent outline-none w-full text-white anta-regular"
            />
          </div>
          {errors.subject && <p className="text-red-400 text-sm">{errors.subject.message}</p>}
</div>

          {/* Message */}
<div>
<div className="flex bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
            <FaRegCommentDots className="text-[#85b8ff] mr-3 mt-1" />
            <textarea
              placeholder="Your Message"
              rows={4}
              {...register("message", { required: "Message is required" })}
              className="bg-transparent outline-none w-full text-white anta-regular resize-none"
            />
          </div>
          {errors.message && <p className="text-red-400 text-sm">{errors.message.message}</p>}
</div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-[#6f57ff] to-[#00f2fe] text-white font-semibold tracking-wide hover:opacity-90 transition duration-300 cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;

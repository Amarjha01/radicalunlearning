import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div>
          <input 
            type="email" 
            placeholder="Email" 
            {...register("email", { required: "Email is required" })} 
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div>
          <input 
            type="password" 
            placeholder="Password" 
            {...register("password", { required: "Password is required" })} 
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;

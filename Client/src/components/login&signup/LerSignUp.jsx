import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import Select from "react-select";
import "react-country-state-city/dist/react-country-state-city.css";
// import API from "../../common/apis/ServerBaseURL";
import axios from "axios";

const LerSignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const roleType = watch("role");
  const dob = watch("dob");
  const [isSubmitting , setIsSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);


const handleShowPass = () =>{
  setShowPass(!showPass);
}


  const countryList = [
    "United States",
    "India",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "China",
    "South Korea",
    "Russia",
    "Italy",
    "Spain",
    "Mexico",
    "Netherlands",
    "Turkey",
    "Sweden",
    "South Africa",
    "UAE",
  ];
  
  const languageList = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "Mandarin",
    "Arabic",
    "Bengali",
    "Portuguese",
    "Russian",
    "Urdu",
    "German",
    "Japanese",
    "Punjabi",
    "Korean",
    "Italian",
    "Turkish",
    "Vietnamese",
    "Persian",
    "Swahili",
    "Tamil",
    "Telugu",
    "Malay",
    "Javanese",
    "Marathi",
    "Thai",
    "Gujarati",
  ];

  const topicOptions = [
    { value: "Math", label: "Math" },
    { value: "Science", label: "Science" },
    { value: "Programming", label: "Programming" },
    { value: "Music", label: "Music" },
    { value: "Drawing", label: "Drawing" },
    { value: "History", label: "History" },
    { value: "Language", label: "Language" },
    { value: "Geography", label: "Geography" },
    { value: "Philosophy", label: "Philosophy" },
    { value: "Fitness", label: "Fitness" },
    { value: "Economics", label: "Economics" },
    { value: "Environment", label: "Environment" },
  ];

  const handleTopicChange = (selected) => {
    if (selected.length <= 10) {
      setSelectedTopics(selected);
      clearErrors("whatToLearn");
    }
  };

  const onSubmit = async (data) => {
    let hasError = false;
  
    if (!country) {
      setCountryError(true);
      hasError = true;
    } else {
      setCountryError(false);
    }
  
    if (!language) {
      setLanguageError(true);
      hasError = true;
    } else {
      setLanguageError(false);
    }
  
    if (hasError) return;
  
    try {
      setIsSubmitting(true);
  
      const response = await axios.post('http://localhost:3000/api/user/register-learner', {
        ...data,
        country,
        language,
        subjects: selectedTopics.map((s) => s.value),
      });
  
      alert("Registration Successful!");
      console.log(response.data);
      // reset(); // optional
    } catch (error) {
      console.log("Error in registration:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto  space-y-5 roboto-regular bg-[#0b0f19]/80 p-10 rounded-2xl shadow-[0_0_40px_#2b6bff40] backdrop-blur-lg  w-full border border-[#1e2a48]"
    >
      <h2 className="text-xl font-bold mb-4 orbitron-regular bg-gradient-to-r from-[#6f57ff] via-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent">Learner Registration</h2>

      <div>
        <label className="block font-medium text-sm w-full text-start text-white">
          Full Name
        </label>
        <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="bg-transparent outline-none w-full text-white anta-regular"
          />
        </div>
        {errors.name && (
          <span className="text-sm text-red-800">Please enter full name</span>
        )}
      </div>

      <div>
        <label className="block font-medium text-sm w-full text-start text-white">
          Email
        </label>
        <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <input
            {...register("email", { required: true })}
            placeholder="Enter Your mail id"
            className="bg-transparent outline-none w-full text-white anta-regular"
          />
        </div>
        {errors.email && (
          <span className="text-sm text-red-800">
            Please enter your mail Id.
          </span>
        )}
      </div>

     <div>
     <label className="block font-medium text-sm w-full text-start text-white ">
      Are you a learner or parent registering on behalf of learner?
      </label>
   <div className="bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
   <select {...register("role", { required: "Please select your role" })} className="w-full text-white outline-none bg-transparent rounded">
        <option value="">Select</option>
        <option value="Learner">Learner</option>
        <option value="Parent">Parent</option>
      </select>
      
   </div>
      {errors.role && <p className="text-red-600 text-sm">{errors.roleType.message}</p>}
     </div>

      {roleType === "Parent" && (
        <p className="text-blue-600 text-sm">Please provide details of the learner, not yourself.</p>
      )}


<div>
        <label className="block font-medium text-sm w-full text-start text-white">
          Select Your Country
        </label>

        <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setCountryError(false);
            }}
            className="w-full text-white bg-[#1e2a48] rounded outline-none"
          >
            <option value="">Select Country</option>
            {countryList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {countryError && (
          <span className="text-sm text-red-800">
            Please select your country.
          </span>
        )}
      </div>

      <div>
        <label className="block font-medium text-sm w-full text-start text-white">
          Select your Language
        </label>
        <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setLanguageError(false);
            }}
            className="w-full text-white bg-[#1e2a48] rounded outline-none"
          >
            <option value="">Select Language</option>
            {languageList.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        {languageError && (
          <span className="text-sm text-red-800">
            Please select your language.
          </span>
        )}
      </div>

      <div>
      <label className="block font-medium text-sm w-full text-start text-white">Date of Birth</label>
    <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
    <input
        type="date"
        {...register("dob", { required: "Date of birth is required" })}
        className="w-full text-white bg-transparent rounded"
      />
    </div>
      {errors.dob && <p className="text-red-600 text-sm">{errors.dob.message}</p>}
      {dob &&
        new Date().getFullYear() - new Date(dob).getFullYear() < 12 &&
        roleType !== "Parent" && (
          <p className="text-red-600 text-sm">
            Sorry, you're below 12. Please ask your parent to register.
          </p>
        )}
      </div>

   <div>
   <label className="block font-medium text-sm w-full text-start text-white">What do you want to learn?</label>
    <div className=" bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
    <Select
        options={topicOptions}
        isMulti
        value={selectedTopics}
        onChange={handleTopicChange}
        placeholder="Select up to 10 topics"
      />
    </div>
      {errors.whatToLearn && <p className="text-red-600 text-sm">{errors.whatToLearn.message}</p>}
   </div>
      {selectedTopics.length === 10 && (
        <p className="text-blue-600 text-sm">You’ve selected the maximum number of topics (10)</p>
      )}


<div>
<label className="block font-medium text-sm w-full text-start text-white">Do you need an Expert to help you out?</label>
      <span className="text-xs text-blue-600 block mb-1">
        *Expert is specialised in the learning area and has gained practical experience over several years of doing it
      </span>
  <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
  <select {...register("needExpert", { required: "Please select an option" })} className="w-full text-white bg-transparent outline-hidden rounded">
        <option value="">Select</option>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
  </div>
      {errors.needExpert && <p className="text-red-600 text-sm">{errors.needExpert.message}</p>}
</div>

    <div>
    <label className="block font-medium text-sm w-full text-start text-white">Do you need a Coach to help you out?</label>
      <span className="text-xs text-blue-600 block mb-1">
        *Coach is not specialised in the learning area but will help you with your overall wellbeing
      </span>
   <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
   <select {...register("needCoach", { required: "Please select an option" })} className="w-full text-white bg-transparent outline-hidden rounded">
        <option value="">Select</option>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
   </div>
      {errors.needCoach && <p className="text-red-600 text-sm">{errors.needCoach.message}</p>}
    </div>
<div>
<label className="block font-medium text-sm w-full text-start text-white">Write About Your Self</label>
<div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
<textarea
        {...register("bio", { required: "Please tell us about yourself" })}
        className="w-full text-white bg-transparent outline-hidden rounded"
        rows={5}
        placeholder="About me (500 words max)"
        
      />
</div>
      {errors.bio && <p className="text-red-600 text-sm">{errors.bio.message}</p>}
</div>

          {/* Password */}
          <div>
            <div className="flex items-center gap-2 bg-[#1f2937] p-3 rounded-lg border border-gray-600 focus-within:border-blue-500">
              <RiLockPasswordFill className="text-gray-400" />
              <input
                type={`${showPass ? 'text' : 'password'}`}
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

      <fieldset className="text-white bg-[#0e142a] rounded-lg p-4 border border-[#1e2a48]">
        <legend className="font-bold">Accept Terms</legend>
        <label className="block cursor-pointer ">
          <input type="checkbox" {...register("terms1", { required: true })} /> My parents are aware I'm using this site
        </label>
        {errors.terms1 && <p className="text-red-600 text-sm">Required</p>}

        <label className="block cursor-pointer">
          <input type="checkbox" {...register("terms2", { required: true })} /> This is not a social media site...
        </label>
        {errors.terms2 && <p className="text-red-600 text-sm">Required</p>}

        <label className="block cursor-pointer">
          <input type="checkbox" {...register("terms3", { required: true })} /> Respectful communication
        </label>
        {errors.terms3 && <p className="text-red-600 text-sm">Required</p>}
      </fieldset>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-[#6f57ff] to-[#00f2fe] text-white font-semibold tracking-wide hover:opacity-90 transition duration-300 cursor-pointer"
            >
              Send Message
            </button>
          </div>

    </motion.form>
  );
};

export default LerSignUp;

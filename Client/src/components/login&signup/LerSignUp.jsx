import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import Select from "react-select";
import API from '../../common/apis/ServerBaseURL.jsx'
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
    reset,
  } = useForm();

  const roleType = watch("roleType");
  const dob = watch("dob");
  const [isSubmitting , setIsSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);

  const Navigate = useNavigate();
const handleShowPass = () =>{
  setShowPass(!showPass);
}


 const countryList = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
  "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China",
  "Colombia", "Comoros", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
  "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
  "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
  "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Republic of the Congo",
  "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
  "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand",
  "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
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
  { value: "Science", label: "Science" },
  { value: "Technology", label: "Technology" },
  { value: "Engineering", label: "Engineering" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Art", label: "Art" },
  { value: "Humanities", label: "Humanities" },
  { value: "Psychology", label: "Psychology" },
  { value: "Social Sciences", label: "Social Sciences" },
  { value: "Health Science", label: "Health Science" },
  { value: "Economics", label: "Economics" },
  { value: "Business", label: "Business" },
  { value: "Software Development", label: "Software Development" },
  { value: "Web Design", label: "Web Design" },
  { value: "Finance", label: "Finance" },
  { value: "Accounting", label: "Accounting" },
  { value: "Event Planning", label: "Event Planning" },
  { value: "Content Writing", label: "Content Writing" },
  { value: "Creative Writing", label: "Creative Writing" },
  { value: "Languages", label: "Languages" },
  { value: "English Literature", label: "English Literature" },
  { value: "Computer Science", label: "Computer Science" },
];


  const handleTopicChange = (selected) => {
    if (selected.length <= 10) {
      setSelectedTopics(selected);
      clearErrors("whatToLearn");
    }
  };

  const onSubmit = async (data) => {
    let hasError = false;
  console.log("data:", data)
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
  
      const response = await axios.post(API.registerLearner.url, {
        ...data,
        country,
        language,
        role: "learner",
        subjects: selectedTopics.map((s) => s.value),
      });
      alert(response?.data?.message);
      console.log("response:", response)

  if(response?.ok){
    reset()
    Navigate('/signin')
  }
  
      
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
      className="max-w-3xl mx-auto  space-y-5 roboto-regular bg-[#b4c0b2] p-10 rounded-2xl  hover:shadow-[0_0_5px_#000] backdrop-blur-lg  w-full border duration-100 text-black"
    >
      <h2 className="text-2xl font-bold mb-4 orbitron-regular tracking-widest ">Learner Registration</h2>

      <div>
        <label className="block font-medium text-sm w-full text-start ">
          Full name
        </label>
        <div className="flex items-center bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500">
          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="bg-transparent outline-none w-full  anta-regular"
          />
        </div>
        {errors.name && (
          <span className="text-sm text-red-800">Please enter full name</span>
        )}
      </div>

      <div>
        <label className="block font-medium text-sm w-full text-start ">
          Email
        </label>
        <div className="flex items-center bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500">
          <input
            {...register("email", { required: true })}
            placeholder="Enter Your mail id"
            className="bg-transparent outline-none w-full  anta-regular"
          />
        </div>
        {errors.email && (
          <span className="text-sm text-red-800">
            Please enter your mail Id.
          </span>
        )}
      </div>

     <div>
     <label className="block font-medium text-sm w-full text-start  ">
      Are you a learner or parent registering on behalf of learner?
      </label>
   <div className="flex items-center bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500">
   <select {...register("roleType", { required: true , message: "Please select your roleType" })} className="w-full  bg-[#868674]  outline-none rounded py-1  cursor-pointer ">
        <option value="">Select</option>
        <option value="Learner">Learner</option>
        <option value="Parent">Parent</option>
      </select>
      
   </div>
      {errors.role && <p className="text-red-600 text-sm">{errors.roleType.message}</p>}
      {roleType === "Parent" && (
        <p className="text-blue-600 text-sm">Please provide details of the learner, not yourself.</p>
      )}
     </div>



<div>
        <label className="block font-medium text-sm w-full text-start ">
          Select Your Country
        </label>

        <div className="flex items-center bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500">
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setCountryError(false);
            }}
            className="w-full  bg-[#868674]  outline-none rounded py-1  cursor-pointer "
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
  <label className="block font-medium text-sm w-full text-start ">
    Select your language:
  </label>
  <div className="anta-regular flex items-center bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500">
    <input
      list="language-options"
      value={language}
      onChange={(e) => {
        setLanguage(e.target.value);
        setLanguageError(false);
      }}
      placeholder="Type or select a language"
      className="w-full  bg-[#868674] rounded outline-none py-1 cursor-text"
    />
    <datalist id="language-options">
      {languageList.map((lang) => (
        <option key={lang} value={lang} />
      ))}
    </datalist>
  </div>
  {languageError && (
    <span className="text-sm text-red-800">
      Please select or enter your language.
    </span>
  )}
</div>


      <div>
      <label className="block font-medium text-sm w-full text-start ">Date of Birth</label>
    <div className="flex items-center bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500">
    <input
        type="date"
        {...register("dob", { required: "Date of birth is required" })}
        className="w-full  bg-[#868674]  outline-none rounded py-1  cursor-pointer "
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
   <label className="block font-medium text-sm w-full text-start ">What do you want to learn?</label>
    <div className=" bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48]">
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
<label className="block font-medium text-sm w-full text-start ">Do you need an Expert to help you out?</label>
      <span className="text-xs text-blue-600 block mb-1">
        *Expert is specialised in the learning area and has gained practical experience over several years of doing it
      </span>
  <div className="flex items-center bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500">
  <select {...register("needExpert", { required: "Please select an option" })} className="w-full  bg-[#868674]  outline-none rounded py-1  cursor-pointer ">
        <option value="">Select</option>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
  </div>
      {errors.needExpert && <p className="text-red-600 text-sm">{errors.needExpert.message}</p>}
</div>

    <div>
    <label className="block font-medium text-sm w-full text-start ">Do you need a Coach to help you out?</label>
      <span className="text-xs text-blue-600 block mb-1">
        *Coach is not specialised in the learning area but will help you with your overall wellbeing
      </span>
   <div className="flex items-center bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500">
   <select {...register("needCoach", { required: "Please select an option" })} className="w-full  bg-[#868674]  outline-none rounded py-1  cursor-pointer ">
        <option value="">Select</option>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
   </div>
      {errors.needCoach && <p className="text-red-600 text-sm">{errors.needCoach.message}</p>}
    </div>
<div>
<label className="block font-medium text-sm w-full text-start ">Write About Your Self</label>
<div className="flex items-center bg-[#868674] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500">
<textarea
        {...register("bio", { required: "Please tell us about yourself" })}
        className="w-full  bg-transparent outline-hidden rounded"
        rows={5}
        placeholder="About me (500 words max)"
        
      />
</div>
      {errors.bio && <p className="text-red-600 text-sm">{errors.bio.message}</p>}
</div>

          {/* Password */}
          <div>
            <label className="block font-medium text-sm w-full text-start "> 
              Create sign in password for this site
            </label>
            <div className="flex items-center gap-2 bg-[#868674] p-3 rounded-lg border border-gray-600 focus-within:border-blue-500">
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
                className="w-full  bg-[#868674]  outline-none rounded py-1   "              />
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

      <fieldset className=" bg-[#868674] rounded-lg p-4 border border-[#1e2a48] focus-within:border-blue-500">
        <legend className="font-bold">Accept Terms</legend>
        <label className="block cursor-pointer ">
          <input type="checkbox" {...register("terms1", { required: true })} /> My parents are aware I'm using this site.
        </label>
        {errors.terms1 && <p className="text-red-600 text-sm">Required</p>}

        <label className="block cursor-pointer">
          <input type="checkbox" {...register("terms2", { required: true })} /> This is not a social media site.
        </label>
        {errors.terms2 && <p className="text-red-600 text-sm">Required</p>}

        <label className="block cursor-pointer">
          <input type="checkbox" {...register("terms3", { required: true })} /> Respectful communication.
        </label>
        {errors.terms3 && <p className="text-red-600 text-sm">Required</p>}
      </fieldset>

          {/* Submit Button */}
          <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-4 px-6 py-1 rounded-full bg-[#f2c078] font-semibold tracking-wide cursor-pointer ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
        } transition duration-300`}
      >
        <span className=" text-shadow-lg text-2xl orbitron-regular">
          {isSubmitting ? "Submitting..." : "Submit"}
        </span>
      </button>

    </motion.form>
  );
};

export default LerSignUp;

import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { CountrySelect, LanguageSelect } from "react-country-state-city";
import CreatableSelect from "react-select/creatable";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
const subjectOptions = [
  { value: "Math", label: "Math" },
  { value: "Science", label: "Science" },
  { value: "Programming", label: "Programming" },
  { value: "Music", label: "Music" },
  { value: "Art", label: "Art" },
  { value: "Writing", label: "Writing" },
  { value: "Language", label: "Language" },
  { value: "Philosophy", label: "Philosophy" },
  { value: "Economics", label: "Economics" },
  { value: "Health", label: "Health" },
];



// Add these arrays at the top of the documents
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

const EduSignUp = () => {
  const [isSubmitting , setIsSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [documentss, setdocumentss] = useState([]);

  const handleShowPass = () =>{
    setShowPass(!showPass);
  }

  // bio text area limit
  const [bio, setBio] = useState("");
  const [wordCount, setWordCount] = useState(0);
  
  // Count words in the bio and update the state
  const handleBioChange = (e) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/).filter(Boolean); // Split by spaces and filter out empty strings
    
    if (words.length <= 150) {
      setBio(value);
      setWordCount(words.length);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    control,
  } = useForm();

  const educatorType = watch("subrole");
  const payoutMethod = watch("payoutMethod");
  const serviceType = watch("serviceType")

  const onSubmit = async(data) => {
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

    console.log("Educator Form Submitted:", {
      ...data,
      country,
      language,
      subjects: data.subjects?.map((s) => s.value),
      documentss,
    });


    try {
      setIsSubmitting(true);
  
      const response = await axios.post('http://localhost:3000/api/user/register-educator', {
        ...data,
        country,
        language,
        subjects: data.subjects?.map((s) => s.value),
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

  const handledocumentsUpload = (e) => {
    const selected = Array.from(e.target.documentss).slice(0, 10);
    setdocumentss(selected);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl  mx-auto  space-y-5 roboto-regular bg-[#0b0f19]/80 p-10 rounded-2xl shadow-[0_0_40px_#2b6bff40] backdrop-blur-lg  w-full border border-[#1e2a48]"
    >
      <h2 className="text-xl font-bold mb-4 orbitron-regular bg-gradient-to-r from-[#6f57ff] via-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent">
        Educator Registration
      </h2>
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
        <label className="block font-medium text-sm w-full text-start text-white">
          Select Your Country:
        </label>

        <div className="anta-regular  flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setCountryError(false);
            }}
            className="w-full text-white bg-[#1e2a48] rounded outline-none py-2"
          >
            <option value="" >Select Country</option>
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
          Select your Language:
        </label>
        <div className=" anta-regular flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setLanguageError(false);
            }}
            className="w-full text-white bg-[#1e2a48] rounded outline-none py-2"
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
        <label className="block font-medium text-sm w-full text-start text-white">
        Are you interested in registering as:
        </label>
        <div className="anta-regular flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <select
            {...register("subrole", { required: true })}
            className="w-full text-white bg-[#1e2a48] rounded py-2 cursor-pointer"
          >
            <option value="">Select Sub Role</option>
            <option value="Expert">Expert</option>
            <option value="Coach">Coach</option>
            <option value="Both">Both</option>
          </select>
        </div>
        {errors.role && (
          <span className="text-sm text-red-800">Please enter role</span>
        )}
      </div>

      {(educatorType === "Expert" || educatorType === "Both") && (
        <>
          <div>
            <label className="block font-medium text-sm w-full text-start text-white">
              Which subject(s) are you an expert at?
            </label>
            <div className=" bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] text-white">
            <Controller
  className="text-white bg-black"
  name="subjects"
  control={control}
  rules={{ required: "Please select at least one subject." }}
  render={({ field }) => (
    <CreatableSelect
      {...field}
      isMulti
      options={subjectOptions}
      onChange={(selected) => {
        if (selected.length <= 10) field.onChange(selected);
      }}
      value={field.value}
      placeholder="Select or create up to 10 subjects"
      className="text-white bg-[#0e142a] anta-regular"  // Tailwind for base styling
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: '#0e142a', // Override background color
          color: 'white', // Override text color
          borderColor: 'black', // Override border color if needed
        }),
        option: (base) => ({
          ...base,
          color: 'white', // Change the color of options
          backgroundColor: '#0e142a', // Change option background color
          '&:hover': {
            backgroundColor: 'black', // Change option hover color
            color: 'white', // Hover text color
          },
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: 'black', // Background of selected values
          color: 'white', // Text color of selected values
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: 'white', // Label color of selected values
        }),
      }}
    />
  )}
/>

            </div>
            {errors.subjects && (
              <span className="text-sm text-red-800">
                {errors.subjects.message}
              </span>
            )}
          </div>
        </>
      )}

      {(educatorType === "Expert" || educatorType === "Both") && (
        <div>
          <label className="block font-medium text-sm w-full text-start text-white">
            Share Your Experience In Subjects You Choosen.
          </label>
          <div className=" bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
            <textarea
              {...register("experience", { required: true })}
              placeholder="Specify topics within subject area with practical experience (500 words)"
              className="w-full text-white rounded"
              rows={5}
            />
          </div>
          {errors.experience && (
            <span className="text-sm text-red-800">
              Please share your experience
            </span>
          )}
        </div>
      )}

<div>
      <label className="block font-medium text-sm w-full text-start text-white">
        Write About Yourself.
      </label>
      <div className="bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
        <textarea
          value={bio}
          onChange={handleBioChange}
          className="w-full text-white outline-none rounded"
          rows={5}
          placeholder="About me (150 words)"
        />
      </div>
      <div className="text-white text-sm">
        <span>{wordCount}/150 words</span>
      </div>
      {wordCount > 150 && (
        <span className="text-sm text-red-800">You have exceeded the word limit!</span>
      )}
    </div>

      <div>
        <label className="block font-medium text-sm w-full text-start text-white">
          Are you providing your services as:
        </label>
        <div className=" bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <select
            {...register("serviceType", { required: true })}
            className="w-full text-white bg-[#1e2a48] rounded py-2"
          >
            <option value="">Select</option>
            <option value="Paid">Paid</option>
            <option value="Free">Free</option>
            <option value="Both">Both</option>
          </select>
        </div>
        {errors.serviceType && (
          <span className="text-sm text-red-800">
            Please select a service type
          </span>
        )}
      </div>

{(serviceType === "Paid" || serviceType === "Both") && (
        <div>
        <label className="block font-medium text-sm w-full text-start text-white">
          Enter Your Payout Method
        </label>
        <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <select
            {...register("payoutMethod", { required: true })}
            className="w-full text-white bg-[#1e2a48] rounded py-2"
          >
            <option value="">-- Select Method --</option>
            <option value="upi">UPI</option>
            <option value="bank">Bank Transfer</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        {errors.payoutMethod && (
          <p className="text-red-500 text-sm">This field is required.</p>
        )}
      </div>
)}

      {payoutMethod === "upi" && (
        <div className="mt-2">
          <label className="block font-medium text-sm w-full text-start text-white">
            Enter UPI ID
          </label>
          <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
            <input
              {...register("upiId", { required: true })}
              className="w-full text-white bg-[#1e2a48] rounded py-2"
              placeholder="yourname@upi"
            />
          </div>
          {errors.upiId && (
            <p className="text-red-500 text-sm">UPI ID is required.</p>
          )}
        </div>
      )}

      {payoutMethod === "bank" && (
        <>
          <div className="mt-2">
            <label className="block font-medium text-sm w-full text-start text-white">
              Bank Account Number
            </label>
            <div className=" text-white bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
              <input
                {...register("bankAccount", { required: true })}
                className="w-full text-white bg-transparent outline-none rounded"
                placeholder="123456789012"
              />
            </div>
            {errors.bankAccount && (
              <p className="text-red-500 text-sm">
                Bank Account Number is required.
              </p>
            )}
          </div>
          <div className="mt-2">
            <label className="block font-medium text-sm w-full text-start text-white">
              IFSC Code
            </label>
            <div className=" text-white bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
              <input
                {...register("ifscCode", { required: true })}
                className="w-full text-white bg-transparent outline-none rounded"
                placeholder="SBIN0001234"
              />
            </div>
            {errors.ifscCode && (
              <p className="text-red-500 text-sm">IFSC Code is required.</p>
            )}
          </div>
        </>
      )}

      {payoutMethod === "paypal" && (
        <div className="mt-2">
          <label className="block font-medium text-sm w-full text-start text-white">
            PayPal Email
          </label>
          <div className=" bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
            <input
              type="email"
              {...register("paypalEmail", { required: true })}
              className="w-full outline-none text-white bg-transparent rounded"
              placeholder="you@example.com"
            />
          </div>
          {errors.paypalEmail && (
            <p className="text-red-500 text-sm">PayPal Email is required.</p>
          )}
        </div>
      )}

      
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

      <fieldset className="border p-2 text-sm rounded space-y-2 text-white">
        <legend className="font-bold">Accept Terms</legend>
        {[1, 2, 3, 4, 5].map((num) => (
          <label className="block cursor-pointer" key={num}>
            <input
              type="checkbox"
              {...register(`terms${num}`, { required: true })}
            />{" "}
            {
              [
                "I am 18+ years old",
                "I have cleared checks for teaching under 18 and have no criminal record",
                "I confirm all information is accurate",
                "I agree to respectful conduct and understand my access may be terminated for abuse",
                "I understand 10% of my fee will support Radical Unlearning. If paid outside, I will log it manually",
              ][num - 1]
            }
            {errors[`terms${num}`] && (
              <span className="text-red-500 text-sm ml-2">Required</span>
            )}
          </label>
        ))}
      </fieldset>

      <div>
        <label className="block font-medium text-sm w-full text-start text-white">
          Upload Documents pdf only (Max 20 MB )
        </label>
       <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] cursor-pointer ">
       <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={handledocumentsUpload}
          className="w-full text-white outline-none "
        />
       </div>
        {documentss.length > 0 && (
          <ul className="list-disc ml-5 text-sm text-gray-600">
            {documentss.map((documents, idx) => (
              <li key={idx}>{documents.name}</li>
            ))}
          </ul>
        )}
      </div>
          {/* Submit Button */}
          <button
  type="submit"
  disabled={isSubmitting}
  className={`mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-[#6f57ff] to-[#00f2fe] text-white font-semibold tracking-wide ${
    isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
  } transition duration-300`}
>
  {isSubmitting ? "Submitting..." : "Send Message"}
</button>

    </motion.form>
  );
};

export default EduSignUp;

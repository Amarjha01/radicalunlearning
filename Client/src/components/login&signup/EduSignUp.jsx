import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import API from '../../common/apis/ServerBaseURL.jsx'
const subjectOptions = [
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



// Add these arrays at the top of the documents
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

const EduSignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const [bio, setBio] = useState("");
  const [wordCount, setWordCount] = useState(0);


  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const educatorType = watch("subrole");
  const payoutMethod = watch("payoutMethod");
  const serviceType = watch("serviceType");

  const handleShowPass = () => setShowPass(!showPass);

  const handleBioChange = (e) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/).filter(Boolean);
    if (words.length <= 150) {
      setBio(value);
      setWordCount(words.length);
    }
  };

  const handleDocumentSelect = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      alert("PDF must be under 20MB.");
      return;
    }
    setDocumentFile(file);
  };

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "video/mp4") {
      alert("Only MP4 files are allowed.");
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      alert("Video must be under 100MB.");
      return;
    }
    setVideoFile(file);
  };

  const uploadToCloudinary = async (file, resourceType = "auto") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "radicalunlearning");
    formData.append("cloud_name", "dbnticsz8");

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dbnticsz8/${resourceType}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      return null;
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
  
      const [documentUrl, videoUrl] = await Promise.all([
        uploadToCloudinary(documentFile, "raw"),
        uploadToCloudinary(videoFile, "video"),
      ]);
  
      if (!documentUrl || !videoUrl) {
         documentUrl = null;
         videoUrl = null;
      }
  
      const payload = {
        ...data,
        country,
        language,
        subjects: data.subjects?.map((s) => s.value),
        role: "educator",
        bio,
        documentUrl,
        videoUrl,
      };
  
      const response = await axios.post(API.registerEducator.url, payload);
      
      alert("Registration Successful!");
      console.log("Server Response:", response.data);

      reset(); // This clears all controlled fields
      setBio(""); // manually clear bio state
      setWordCount(0);
      setCountry("");
      setLanguage("");
      setDocumentFile(null);
      setVideoFile(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      Navigate('/signin')

    } catch (error) {
      console.error("Error in registration:", error);
      // Show server-side error message from backend if available
      const message = error.response?.data?.message || "Something went wrong. Please try again.";
      alert(message);
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
      className="max-w-3xl  mx-auto  space-y-5 roboto-regular   bg-[#0b0f19]/80 p-10 rounded-2xl shadow-[0_0_40px_#2b6bff40] hover:shadow-[0_0_40px_#2b6bff90]  duration-100 backdrop-blur-lg  w-full border border-blue-500 "
    >
      <h2 className="text-2xl font-extrabold mb-4 orbitron-regular bg-gradient-to-r from-[#6f57ff] via-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent tracking-widest">
        Educator Registration
      </h2>
      <div>
        <label className="block font-medium text-sm w-full text-start text-white">
          Full name
        </label>
        <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500 ">
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
        <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500 ">
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
          Select your country:
        </label>

        <div className="anta-regular  flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500 ">
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setCountryError(false);
            }}
            className="w-full text-white bg-[#0e142a]  outline-none rounded py-1  cursor-pointer "
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
    Select your language:
  </label>
  <div className="anta-regular flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500">
    <input
      list="language-options"
      value={language}
      onChange={(e) => {
        setLanguage(e.target.value);
        setLanguageError(false);
      }}
      placeholder="Type or select a language"
      className="w-full text-white bg-[#0e142a] rounded outline-none py-1 cursor-text"
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
        <label className="block font-medium text-sm w-full text-start text-white">
        Are you interested in registering as:
        </label>
        <div className="anta-regular flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500 ">
          <select
            {...register("subrole", { required: true })}
            className="w-full text-white bg-[#0e142a] outline-none rounded py-1 cursor-pointer"
          >
            <option value="">Select Sub Role</option>
            <option value="Expert">Expert</option>
            <option value="Coach">Coach</option>
            <option value="Both">Both</option>
          </select>
        </div>
        {errors.role && (
          <span className="text-sm text-red-800">Please enter sub role</span>
        )}
      </div>

      {(educatorType === "Expert" || educatorType === "Both") && (
        <>
          <div>
            <label className="block font-medium text-sm w-full text-start text-white">
              Which subject(s) are you an expert at?
            </label>
            <div className=" bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500  text-white">
            <Controller
  className=""
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
      className="text-white outline-none bg-[#0e142a] anta-regular"  // Tailwind for base styling
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: '#0e142a', // Override background color
          color: 'white', // Override text color
          borderColor: 'blue', // Override border color if needed
        }),
        option: (base) => ({
          ...base,
          color: 'white', // Change the color of options
          backgroundColor: '#0e142a', // Change option background color
          '&:hover': {
            backgroundColor: 'black', // Change option hover color
            color: 'white', // Hover text color
            borderColor: 'blue',
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
            Please share your experience in teaching the subjects you have chosen.
          </label>
          <div className=" bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500 ">
            <textarea
              {...register("experience", { required: true })}
              placeholder="Specify topics within subject area with practical experience (500 words)"
              className="w-full text-white outline-none rounded"
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
        Please tell us about yourself - your background and what you’re looking for.
      </label>
      <div className="bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500 ">
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
        <div className=" bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500 ">
          <select
            {...register("serviceType", { required: true })}
            className="w-full text-white bg-[#0e142a] outline-none cursor-pointer rounded py-1"
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
        <p className=" text-blue-600 text-sm">*Please specify the method by which you would like us to pay you, your session fees</p>
        <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500 ">
          <select
            {...register("payoutMethod", { required: true })}
            className="w-full text-white bg-[#0e142a] outline-none cursor-pointer rounded py-1"
          >
            <option value="">-- Select Method --</option>
            <option  value="upi">UPI</option>
            <option value="bank">Bank Transfer</option>
            <option value="paypal">PayPal</option>
            <option value="other">Other</option>
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
          <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500 ">
            <input
              {...register("upiId", { required: true })}
              className="w-full text-white bg-[#0e142a] outline-none   rounded py-2"
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
            <div className=" text-white bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500 ">
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
            <div className=" text-white bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500  ">
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
        <div className="mt-2 ">
          <label className="block font-medium text-sm w-full text-start text-white">
            PayPal Email
          </label>
          <div className=" bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500  ">
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
  {payoutMethod === "other" && (
        <div className="mt-2">
          <label className="block font-medium text-sm w-full text-start text-white">
            Enter Your Payout details
          </label>
          <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500 ">
            <input
              {...register("otherPayout", { required: true })}
              className="w-full text-white bg-[#0e142a] outline-none   rounded py-2"
              placeholder="Enter Your Payout details"
            />
          </div>
          {errors.upiId && (
            <p className="text-red-500 text-sm">Payout details is required.</p>
          )}
        </div>
      )}
      
                {/* Password */}
                <div>
                  <label className="block font-medium text-sm w-full text-start text-white">
                   Create sign in password for this site
                  </label>
                  <div className="flex items-center gap-2 bg-[#0e142a]  p-3 rounded-lg border border-[#1e2a48] focus-within:border-blue-500  ">
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

      <fieldset className="border border-blue-500 p-2 text-sm rounded-lg space-y-2 text-white">
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
                "I agree to respectful conduct and understand my access will be terminated for abuse",
                "I understand 10% of my fee will support Radical Unlearning. If paid outside, I will log it manually",
              ][num - 1]
            }
            {errors[`terms${num}`] && (
              <span className="text-red-500 text-sm ml-2">Required</span>
            )}
          </label>
        ))}
      </fieldset>
 {/* PDF Upload */}
 <div>
        <label className="block font-medium text-sm w-full text-start text-white">
          Upload Documents pdf only (optional) (Max 20 MB )
        </label>
        <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500">
          <input
            type="file"
            accept=".pdf"
            onChange={handleDocumentSelect}
            className="w-full text-white outline-none cursor-pointer"
          />
        </div>
        {documentFile && (
          <p className="text-sm text-gray-400 mt-1">Selected: {documentFile.name}</p>
        )}
      </div>

      {/* Video Upload */}
      <div>
        <label className="block font-medium text-sm w-full text-start text-white">
          Upload Introduction Video (optional) (MP4 only, Max 100 MB)
        </label>
        <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48] focus-within:border-blue-500">
          <input
            type="file"
            accept="video/mp4"
            onChange={handleVideoSelect}
            className="w-full text-white outline-none cursor-pointer"
          />
        </div>
        {videoFile && (
          <p className="text-sm text-gray-400 mt-1">Selected: {videoFile.name}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-4 px-6 py-1 rounded-full bg-[#1e2a48] font-semibold tracking-wide cursor-pointer ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
        } transition duration-300`}
      >
        <span className="bg-gradient-to-r from-[#6f57ff] to-[#00f2fe] bg-clip-text text-transparent text-shadow-lg text-2xl orbitron-regular">
          {isSubmitting ? "Submitting..." : "Submit"}
        </span>
      </button>


    </motion.form>
  );
};

export default EduSignUp;

import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { CountrySelect, LanguageSelect } from "react-country-state-city";
import CreatableSelect from "react-select/creatable";
import "react-country-state-city/dist/react-country-state-city.css";

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

// Add these arrays at the top of the file
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
  const [countryError, setCountryError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    control,
  } = useForm();

  const educatorType = watch("role");
  const payoutMethod = watch("payoutMethod");

  const onSubmit = (data) => {
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
      files,
    });
  };

  const handleFileUpload = (e) => {
    const selected = Array.from(e.target.files).slice(0, 10);
    setFiles(selected);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto  space-y-5 roboto-regular bg-[#0b0f19]/80 p-10 rounded-2xl shadow-[0_0_40px_#2b6bff40] backdrop-blur-lg  w-full border border-[#1e2a48]"
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
            {...register("fullName", { required: true })}
            placeholder="Full Name"
            className="bg-transparent outline-none w-full text-white anta-regular"
          />
        </div>
        {errors.fullName && (
          <span className="text-sm text-red-800">Please enter full name</span>
        )}
      </div>

      <div>
        <label className="block font-medium text-sm w-full text-start text-white">
          Email
        </label>
        <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <input
            {...register("mail", { required: true })}
            placeholder="Enter Your mail id"
            className="bg-transparent outline-none w-full text-white anta-regular"
          />
        </div>
        {errors.mail && (
          <span className="text-sm text-red-800">
            Please enter your mail Id.
          </span>
        )}
      </div>

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
        <label className="block font-medium text-sm w-full text-start text-white">
          Select Your Role
        </label>
        <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <select
            {...register("role", { required: true })}
            className="w-full text-white bg-[#1e2a48] rounded"
          >
            <option value="">Select Role</option>
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
                    className="text-white bg-[#1e2a48]"
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
        <div className=" bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <textarea
            {...register("bio", { required: true })}
            className="w-full text-white outline-none rounded"
            rows={5}
            placeholder="About me (500 words)"
          />
        </div>
        {errors.bio && (
          <span className="text-sm text-red-800">Bio is required</span>
        )}
      </div>

      <div>
        <label className="block font-medium text-sm w-full text-start text-white">
          Are you providing your services as:
        </label>
        <div className=" bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <select
            {...register("serviceType", { required: true })}
            className="w-full text-white bg-[#1e2a48] rounded"
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

      <div>
        <label className="block font-medium text-sm w-full text-start text-white">
          Enter Your Payout Method
        </label>
        <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
          <select
            {...register("payoutMethod", { required: true })}
            className="w-full text-white bg-[#1e2a48] rounded"
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

      {payoutMethod === "upi" && (
        <div className="mt-2">
          <label className="block font-medium text-sm w-full text-start text-white">
            Enter UPI ID
          </label>
          <div className="flex items-center bg-[#0e142a] rounded-lg px-4 py-3 border border-[#1e2a48]">
            <input
              {...register("upiId", { required: true })}
              className="w-full text-white bg-[#1e2a48] rounded"
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
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={handleFileUpload}
          className="w-full text-white outline-none "
        />
       </div>
        {files.length > 0 && (
          <ul className="list-disc ml-5 text-sm text-gray-600">
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        )}
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
    </motion.form>
  );
};

export default EduSignUp;

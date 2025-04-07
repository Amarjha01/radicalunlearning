import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { CountrySelect, LanguageSelect } from "react-country-state-city";
import Select from "react-select";
import "react-country-state-city/dist/react-country-state-city.css";

const LerSignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const roleType = watch("roleType");
  const dob = watch("dob");

  const [country, setCountry] = useState(null);
  const [language, setLanguage] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);

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

  const onSubmit = (data) => {
    let hasError = false;

    if (!country) {
      setError("country", { type: "manual", message: "Country is required" });
      hasError = true;
    }

    if (!language) {
      setError("language", { type: "manual", message: "Language is required" });
      hasError = true;
    }

    if (selectedTopics.length === 0) {
      setError("whatToLearn", { type: "manual", message: "Please select at least one topic" });
      hasError = true;
    }

    if (!hasError) {
      console.log("Learner Form Submitted:", {
        ...data,
        whatToLearn: selectedTopics.map((t) => t.value),
        country: country?.name,
        language: language?.name,
      });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow space-y-5"
    >
      <h2 className="text-xl font-bold mb-4">Learner Registration</h2>

      <input
        {...register("fullName", { required: "Full Name is required" })}
        placeholder="Full Name"
        className="w-full p-2 border rounded"
      />
      {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName.message}</p>}

      <label className="block">Are you a learner or parent registering on behalf of learner?</label>
      <select {...register("roleType", { required: "Please select your role" })} className="w-full p-2 border rounded">
        <option value="">Select</option>
        <option value="Learner">Learner</option>
        <option value="Parent">Parent</option>
      </select>
      {errors.roleType && <p className="text-red-600 text-sm">{errors.roleType.message}</p>}
      {roleType === "Parent" && (
        <p className="text-blue-600 text-sm">Please provide details of the learner, not yourself.</p>
      )}

      <CountrySelect
        onChange={(e) => {
          setCountry(e);
          clearErrors("country");
        }}
        placeHolder="Select Country"
      />
      {errors.country && <p className="text-red-600 text-sm">{errors.country.message}</p>}

      <LanguageSelect
        onChange={(e) => {
          setLanguage(e);
          clearErrors("language");
        }}
        placeHolder="Select Main Language"
      />
      {errors.language && <p className="text-red-600 text-sm">{errors.language.message}</p>}

      <label className="block mt-4">Date of Birth</label>
      <input
        type="date"
        {...register("dob", { required: "Date of birth is required" })}
        className="w-full p-2 border rounded"
      />
      {errors.dob && <p className="text-red-600 text-sm">{errors.dob.message}</p>}
      {dob &&
        new Date().getFullYear() - new Date(dob).getFullYear() < 12 &&
        roleType !== "Parent" && (
          <p className="text-red-600 text-sm">
            Sorry, you're below 12. Please ask your parent to register.
          </p>
        )}

      <label className="block mt-4">What do you want to learn?</label>
      <Select
        options={topicOptions}
        isMulti
        value={selectedTopics}
        onChange={handleTopicChange}
        placeholder="Select up to 10 topics"
      />
      {errors.whatToLearn && <p className="text-red-600 text-sm">{errors.whatToLearn.message}</p>}
      {selectedTopics.length === 10 && (
        <p className="text-blue-600 text-sm">You’ve selected the maximum number of topics (10)</p>
      )}

      <label className="block mt-4">Do you need an Expert to help you out?</label>
      <span className="text-xs text-blue-600 block mb-1">
        *Expert is specialised in the learning area and has gained practical experience over several years of doing it
      </span>
      <select {...register("needExpert", { required: "Please select an option" })} className="w-full p-2 border rounded">
        <option value="">Select</option>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
      {errors.needExpert && <p className="text-red-600 text-sm">{errors.needExpert.message}</p>}

      <label className="block mt-4">Do you need a Coach to help you out?</label>
      <span className="text-xs text-blue-600 block mb-1">
        *Coach is not specialised in the learning area but will help you with your overall wellbeing
      </span>
      <select {...register("needCoach", { required: "Please select an option" })} className="w-full p-2 border rounded">
        <option value="">Select</option>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
      {errors.needCoach && <p className="text-red-600 text-sm">{errors.needCoach.message}</p>}

      <textarea
        {...register("bio", { required: "Please tell us about yourself" })}
        className="w-full p-2 border rounded"
        rows={5}
        placeholder="About me (500 words max)"
      />
      {errors.bio && <p className="text-red-600 text-sm">{errors.bio.message}</p>}

      <fieldset className="border p-4 rounded">
        <legend className="font-bold">Accept Terms</legend>
        <label className="block">
          <input type="checkbox" {...register("terms1", { required: true })} /> My parents are aware I'm using this site
        </label>
        {errors.terms1 && <p className="text-red-600 text-sm">Required</p>}

        <label className="block">
          <input type="checkbox" {...register("terms2", { required: true })} /> This is not a social media site...
        </label>
        {errors.terms2 && <p className="text-red-600 text-sm">Required</p>}

        <label className="block">
          <input type="checkbox" {...register("terms3", { required: true })} /> Respectful communication
        </label>
        {errors.terms3 && <p className="text-red-600 text-sm">Required</p>}
      </fieldset>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </motion.form>
  );
};

export default LerSignUp;

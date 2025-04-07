import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { CountrySelect, LanguageSelect } from "react-country-state-city";
import Select from "react-select";
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

const EduSignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [files, setFiles] = useState([]);

  const educatorType = watch("educatorType");

  const onSubmit = (data) => {
    console.log("Educator Form Submitted:", {
      ...data,
      country,
      language,
      subjects: subjects.map((s) => s.value),
      files,
    });
  };

  const handleSubjectChange = (selected) => {
    if (selected.length <= 10) setSubjects(selected);
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
      className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow space-y-5"
    >
      <h2 className="text-xl font-bold mb-4">Educator Registration</h2>

      <input
        {...register("fullName", { required: true })}
        placeholder="Full Name"
        className="w-full p-2 border rounded"
      />

      <CountrySelect onChange={(e) => setCountry(e.name)} placeHolder="Select Country" />
      <LanguageSelect onChange={(e) => setLanguage(e.name)} placeHolder="Select Main Language" />

      <select {...register("educatorType", { required: true })} className="w-full p-2 border rounded">
        <option value="">Select Role</option>
        <option value="Expert">Expert</option>
        <option value="Coach">Coach</option>
        <option value="Both">Both</option>
      </select>

      {(educatorType === "Expert" || educatorType === "Both") && (
        <>
          <label className="block font-medium">Which subject(s) are you an expert at?</label>
          <CreatableSelect
            isMulti
            options={subjectOptions}
            onChange={handleSubjectChange}
            value={subjects}
            placeholder="Select or create up to 10 subjects"
          />
        </>
      )}

      {(educatorType === "Expert" || educatorType === "Both") && (
        <textarea
          {...register("experience")}
          placeholder="Specify topics within subject area with practical experience (500 words)"
          className="w-full p-2 border rounded"
          rows={5}
        />
      )}

      <textarea
        {...register("bio")}
        className="w-full p-2 border rounded"
        rows={5}
        placeholder="About me (500 words)"
      />

      <label className="block font-medium">Are you providing your services as:</label>
      <select {...register("serviceType", { required: true })} className="w-full p-2 border rounded">
        <option value="">Select</option>
        <option value="Paid">Paid</option>
        <option value="Free">Free</option>
        <option value="Both">Both</option>
      </select>

      <textarea
        {...register("paymentDetails")}
        className="w-full p-2 border rounded"
        rows={4}
        placeholder="Payment details: fees, duration, format, method, frequency"
      />

      <fieldset className="border p-4 rounded space-y-2">
        <legend className="font-bold">Accept Terms</legend>
        <label className="block">
          <input type="checkbox" {...register("terms1", { required: true })} /> I am 18+ years old
        </label>
        <label className="block">
          <input type="checkbox" {...register("terms2", { required: true })} /> I have cleared checks for teaching under 18 and have no criminal record
        </label>
        <label className="block">
          <input type="checkbox" {...register("terms3", { required: true })} /> I confirm all information is accurate
        </label>
        <label className="block">
          <input type="checkbox" {...register("terms4", { required: true })} /> I agree to respectful conduct and understand my access may be terminated for abuse
        </label>
        <label className="block">
          <input type="checkbox" {...register("terms5", { required: true })} /> I understand 10% of my fee will support Radical Unlearning. If paid outside, I will log it manually
        </label>
      </fieldset>

      <label className="block font-medium">Upload Documents (Max 10 files, 5GB each)</label>
      <input
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.jpg,.png"
        onChange={handleFileUpload}
        className="w-full"
      />
      {files.length > 0 && (
        <ul className="list-disc ml-5 text-sm text-gray-600">
          {files.map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </motion.form>
  );
};

export default EduSignUp;

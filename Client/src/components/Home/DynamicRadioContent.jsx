import React, { useState } from "react";

const radioOptions = [
  {
    id: "dsa",
    label: "Data Structures and Algo.",
    title: "Master the Core",
    content:
      "Sharpen your foundation in algorithms and data structures. This module is your gateway to cracking top-tier interviews and building optimal systems.",
  },
  {
    id: "system-design",
    label: "System Design",
    title: "Design at Scale",
    content:
      "Understand the architecture behind large-scale systems. Dive deep into scalability, reliability, and design tradeoffs used in real-world systems.",
  },
  {
    id: "genai",
    label: "Generative AI",
    title: "Create with AI",
    content:
      "Explore how machines generate content—from images to music. Learn about LLMs, transformers, and practical use-cases of GenAI in the industry.",
  },
  {
    id: "mlops",
    label: "ML-Ops in Action",
    title: "Deploy with Confidence",
    content:
      "Go beyond notebooks. Learn real ML pipelines, CI/CD for models, and ML-Ops practices that power production-grade AI systems.",
  },
];

const DynamicRadioContent = () => {
  const [selected, setSelected] = useState("dsa");
  const current = radioOptions.find((opt) => opt.id === selected);

  return (
    <section className="w-full min-h-fit text-white flex flex-col md:flex-row items-center justify-between gap-28 px-8 py-20 my-20">
      {/* Left side - dynamic text */}
      <div className="max-w-xl text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{current.title}</h2>
        <p className="text-gray-300 text-lg">{current.content}</p>
      </div>

      {/* Right side - futuristic card with layered background */}
      <div className="relative w-[350px] h-[350px] md:w-[400px] md:h-[400px] flex items-center justify-center">
        {/* Background Image */}
        <img
  src="/circuit.png"
  alt="glow background"
  className="absolute inset-0 w-full h-full object-contain -z-10 scale-[1.7]"
/>


        {/* Foreground content (radio buttons) */}
        <div className="p-2 lg:p-4 rounded-2xl w-64 md:w-72 bg-[#0b0f1980] backdrop-blur-sm border border-white/10 shadow-lg -translate-x-4">
          {radioOptions.map((opt) => (
            <label
              key={opt.id}
              className={`flex items-center gap-3 p-3 mb-3 rounded-xl transition-all duration-300 cursor-pointer ${
                selected === opt.id
                  ? "bg-white/10 border border-[#4c8fff]"
                  : "hover:bg-white/5 border border-white/10"
              }`}
            >
              <input
                type="radio"
                name="topic"
                value={opt.id}
                checked={selected === opt.id}
                onChange={() => setSelected(opt.id)}
                className="form-radio text-purple-500 bg-transparent focus:ring-0"
              />
              <span className="text-white">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicRadioContent;
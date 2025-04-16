import React from "react";
import CircularText from './CircularText';
const About = () => {
  return (
    
    <section className="min-h-screen w-full  text-white px-6 md:px-20 py-20 flex flex-col items-center justify-center">
      {/* Glowing Main Title */}
      
      <CircularText
  text="REACT*BITS*COMPONENTS*"
  onHover="speedUp"
  spinDuration={20}
  className="custom-class"
/>
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-[#4facfe] via-[#6f57ff] to-[#00f2fe] bg-clip-text text-transparent orbitron-regular tracking-widest">
        🚀 About Us
      </h1>

      <div className="max-w-4xl w-full relative z-10 space-y-12 text-lg leading-relaxed roboto-regular">
        {/* Intro */}
        <div className="bg-[#0b0f19]/70 p-6 rounded-2xl border border-[#1e2a48] shadow-[0_0_40px_#2b6bff40] backdrop-blur-md">
          <p className="text-white anta-regular">
            <strong>RadicalUnlearning</strong> isn’t just another ed-tech platform — it’s a rebellion against outdated learning systems.
          </p>
          <p className="mt-4 text-gray-300">
            We’re here because too many smart people are stuck in loops: grinding through endless tutorials, memorizing syllabus checklists, and still not feeling ready. We believe learning shouldn't feel like a race — it should feel like a journey you're actually excited about.
          </p>
        </div>

        {/* Why We Exist */}
        <div className="bg-[#0b0f19]/70 p-6 rounded-2xl border border-[#1e2a48] shadow-[0_0_30px_#6b4fff40] backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-2 text-[#85b8ff] anta-regular">
            🧠 Why We Exist
          </h2>
          <p className="text-gray-300">
            Education needs a reset. We’re building a space where curiosity comes before curriculum. A place where questions matter more than grades. Where projects, growth, and exploration are valued above checkboxes and scores.
          </p>
          <p className="mt-4 text-white agdasima-bold">
            Our mission is simple: Help people learn what matters, how they want, and at their own pace.
          </p>
        </div>

        {/* What We’re Building */}
        <div className="bg-[#0b0f19]/70 p-6 rounded-2xl border border-[#1e2a48] shadow-[0_0_30px_#00c6ff40] backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-2 text-[#00f2fe] anta-regular">
            🛠️ What We’re Building
          </h2>
          <ul className="list-disc ml-6 text-gray-300 space-y-2">
            <li>A dynamic knowledge base with curated, high-quality content that cuts the noise.</li>
            <li>Practical guides and learning paths focused on doing, not just reading.</li>
            <li>Real-world skills like System Design, ML-Ops, and Generative AI taught the way pros actually use them.</li>
            <li>A community where learners support each other — no ranks, no tests, just growth.</li>
          </ul>
        </div>

        {/* Who We’re For */}
        <div className="bg-[#0b0f19]/70 p-6 rounded-2xl border border-[#1e2a48] shadow-[0_0_30px_#6f57ff40] backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-2 text-[#b69cff] anta-regular">
            🧑‍💻 Who We’re For
          </h2>
          <ul className="list-disc ml-6 text-gray-300 space-y-2">
            <li>The learner tired of traditional methods.</li>
            <li>The developer stuck between 100s of tabs.</li>
            <li>The curious mind who just wants to understand how things really work.</li>
            <li>The one who knows the future of learning is project-first, human-centered, and radically different.</li>
          </ul>
        </div>

        {/* Closing */}
        <div className="bg-[#0b0f19]/70 p-6 rounded-2xl border border-[#1e2a48] shadow-[0_0_30px_#ff3cac40] backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-2 text-[#ff77e9] anta-regular">
            🔮 We’re Just Getting Started
          </h2>
          <p className="text-gray-300">
            We're still new — and that’s what makes this exciting. The ground is fresh. The ideas are raw. And the community? Already powerful.
          </p>
          <p className="mt-4 text-white lufga-regular text-xl">
            If you’ve ever felt like traditional learning didn’t quite fit you — welcome home.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

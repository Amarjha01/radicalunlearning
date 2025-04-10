// components/TestimonialCarousel.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "I’ve been waiting for something like this. Finally, a platform that doesn’t treat learners like robots. Just one week in, and it already feels more personal than any course I’ve taken.",
    name: "Ravi T.",
    title: "CS Grad, Pune",
  },
  {
    quote:
      "It doesn’t feel like a typical learning site. It feels like someone actually gets how we want to learn now — fast, focused, and real. This is going to blow up.",
    name: "Mehak S.",
    title: "Self-taught Developer",
  },
  {
    quote:
      "Saw it on Twitter, signed up out of curiosity — and stayed because it felt raw and honest. You can tell the people behind this care more about impact than impressions.",
    name: "Karan M.",
    title: "Tech Intern @ Startup",
  },
  {
    quote:
      "The vibes? Insane. The roadmap? Actually exciting. If this is just the beginning, I can’t wait to see what RadicalUnlearning becomes in 6 months.",
    name: "Simran D.",
    title: "3rd Year Engineering Student",
  },
  {
    quote:
      "It's early, sure. But the vision is clear — finally, a space that doesn’t drown you in theory but actually prepares you to do stuff. Subscribed on day one.",
    name: "Aarav R.",
    title: "Aspiring ML Engineer",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="bg-[#0d0d1f] text-white py-10 px-4 md:px-16 rounded-2xl shadow-xl max-w-5xl mx-auto relative my-10">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Early User Testimonials
      </h2>
      <div className="flex justify-center items-center gap-4">
        <button onClick={prev}>
          <ArrowLeft className="w-6 h-6 text-gray-400 hover:text-white" />
        </button>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl px-4"
          >
            <p className="text-lg italic mb-4">“{testimonials[index].quote}”</p>
            <div className="text-sm font-medium text-gray-400">
              — {testimonials[index].name}, {testimonials[index].title}
            </div>
          </motion.div>
        </AnimatePresence>
        <button onClick={next}>
          <ArrowRight className="w-6 h-6 text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
}

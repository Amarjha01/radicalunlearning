import React, { useEffect, useState } from "react";

const loopCards = [
  {
    text: "You don’t need a syllabus to start learning — you need a question worth exploring. Real learning begins the moment curiosity leads the way, not when a curriculum dictates it. Education thrives on wonder, not memorization. In a world full of answers, it’s the questions that shape meaningful, personal discovery."
  },
  {
    text: "Real education doesn’t require permission. It starts when you stop waiting for approval and begin exploring on your own terms. Whether you’re building, experimenting, reading, or reflecting — learning happens best when it’s driven by you. Radical learning is about owning the process, not following someone else’s map to success."
  },
  {
    text: "Grades may measure performance, but they rarely reflect growth. Projects, passion, and purpose speak louder than numbers. When learners create, fail, and try again, that’s when transformation occurs. Let kids explore worms instead of worksheets, curiosity instead of conformity. Creativity and experience should always outweigh rigid marks and outdated methods."
  },
  {
    text: "Learning how to learn is the true superpower — not memorizing facts or scoring well on tests. When children and adults alike are allowed to follow their questions and chase their interests, they become resilient, adaptive thinkers. Forget marks. Build meaning. Chase depth. The best education is the one you shape yourself."
  },
  {
    text: "You are not a grade. You are not a rank. You are a learner, and every learner is different — that’s the beauty of it. Unlearning school doesn’t mean unlearning life. It means rebuilding it. You don’t need permission to grow. You just need space, guidance, and freedom to be curious again."
  },
];

const RediscoverCards = () => {
  const [current, setCurrent] = useState(0);

  // Rotate cards every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % loopCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-fit  text-white flex flex-col md:flex-row items-center justify-between gap-10 px-8 py-20 overflow-hidden">
      {/* Left side content */}
      <div className="max-w-xl text-left">
        <h2 className="text-4xl font-bold leading-snug mb-6">
          <span className="text-gray-400">Unlearn</span> to <strong>Rediscover</strong>
        </h2>
        <p className="text-gray-300 text-lg">
          Education isn’t about memorizing facts — it’s about becoming curious again.
          <br />
          RadicalUnlearning gives you the space to question, explore, and create without limits.
          <br />
          Whether you're a parent, a learner, or a mentor — it’s time to design your own journey.
        </p>
      </div>

      {/* Right side overlapping cards */}
      <div className="relative w-full max-w-md h-[300px]">
        {loopCards.map((card, index) => {
          const offset = (index - current + loopCards.length) % loopCards.length;
          const isActive = offset === 0;

          return (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full rounded-xl p-6 transition-all duration-700 ease-in-out
                ${
                  isActive
                    ? "z-30 scale-100 opacity-100 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
                    : offset === 1
                    ? "z-20 scale-95 opacity-60 translate-x-6 translate-y-4 bg-white/5 border border-white/10"
                    : "z-10 scale-90 opacity-40 translate-x-12 translate-y-8 bg-white/5 border border-white/5"
                }
              `}
            >
              <p className="text-gray-200 text-md mb-4">{card.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RediscoverCards;
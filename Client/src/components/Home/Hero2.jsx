import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Hero2 = () => {
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const text = "Radical Unlearning - A revolution in Education";
  const btnLabels = ["HOME", "COURSES", "ROADMAP"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideTest = [
    "MakerLab",
    "GrowMind",
    "LogicPlay",
    "SoulWork",
    "CodeCamp",
    "Worldview",
    "Mythology",
    "ArtFlow",
    "BodyMove",
    "ThinkLab",
    "StoryMap",
    "PlayTime",
    "MindHack",
    "LifeMath",
    "EcoTrack",
    "DreamLab",
    "ZenSpace",
    "GameDev",
    "Feelings",
    "SketchUp",
  ];

  // Animate main heading text on mount
  useEffect(() => {
    const chars = textRef.current.querySelectorAll("span");

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        scale: 2.5,
        y: 20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.03,
      }
    );
  }, []);

  // Animate button label when it changes
  const animateButton = () => {
    gsap.fromTo(
      buttonRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
    );
  };

  // Cycle button automatically
  useEffect(() => {
    const interval = setInterval(() => {
      changeIndex((currentIndex + 1) % btnLabels.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Update index and animate
  const changeIndex = (newIndex) => {
    setCurrentIndex(newIndex);
    animateButton();
  };

  // Manual controls
  const goNext = () => {
    changeIndex((currentIndex + 1) % btnLabels.length);
  };

  const goPrev = () => {
    changeIndex((currentIndex - 1 + btnLabels.length) % btnLabels.length);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      {/* Animated Heading */}
      <div className="my-5 text-sm lg:text-4xl 2xl:text-6xl codystar-regular text-white text-center overflow-hidden">
        <div ref={textRef} className="inline-block">
          {text.split("").map((char, index) => (
            <span
              key={index}
              className="inline-block whitespace-pre"
              style={{ display: "inline-block" }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Animated Button Section */}
      <div className="w-full flex justify-center items-center mt-4">
        <div className="w-[60%] flex justify-around items-center">
          {/* Prev Arrow */}
          <IoIosArrowRoundForward
            size={36}
            className="rotate-180 text-white cursor-pointer hover:scale-110 transition"
            onClick={goPrev}
          />

          {/* Animated Button Label */}
          <div
            ref={buttonRef}
            className="button-1 p-0.5 rounded-full transition-all duration-300 cursor-pointer"
          >
            <button className="px-6 py-2 bg-white text-black rounded-full shadow-lg transition-all duration-300 min-w-[120px] cursor-pointer">
              {btnLabels[currentIndex]}
            </button>
          </div>

          {/* Next Arrow */}
          <IoIosArrowRoundForward
            size={36}
            className="text-white cursor-pointer hover:scale-110 transition"
            onClick={goNext}
          />
        </div>
      </div>

      {/* Main Content with Smooth Scrolling */}
      <div className="relative w-full flex flex-col gap-5 items-center py-10 after">
        <div className="w-full text-center lufga-regular lg:text-2xl px-2">
          <p>
            Track your journey, reflect on progress, and showcase growth — all in one dynamic dashboard
          </p>
        </div>
        <div className="relative w-[80%] h-auto p-0.5 button-1 rounded-4xl">
          <div className="relative bg-[#000000] w-full h-auto z-20 p-5 flex justify-center items-center rounded-4xl">
            <div className="w-full h-60 lg:h-[80%] bottom-0 absolute bg-gradient-to-b from-transparent to-black z-30 rounded-b-4xl"></div>
            <img
              src="dashboard.svg"
              alt=""
              className="h-full w-full rounded-4xl"
            />
          </div>
          <div className="flex justify-center items-end absolute bottom-0 left-0 z-30 w-full h-full bg-gradient-to-b from-transparent to-[#020817] px-1">
<div className="w-[100%] h-auto overflow-x-hidden  ">
<div className="w-[100%] h-20 flex items-center gap-5 scroll-smooth animate-scroll"> 
              {slideTest.map((ele, index) => (
                <div key={index} className="h-fit w-fit ">
                  <ul className="">
                    <li className="md:px-5 md:py-1 px-1 py-0 text-sm font-semibold rounded-4xl bg-white shadow-md border">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        {ele}
                      </span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;

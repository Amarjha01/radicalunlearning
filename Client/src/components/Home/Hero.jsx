import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Hero = () => {
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const text = "Radical Unlearning ";
  const btnLabels = ["HOME", "COURSES", "ROADMAP"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userProfile , setUserProfile] = useState({})
  const user = useSelector((state) => state.user);



  useEffect(() => {
    if (user?.userData?.user) {
      setUserProfile(user.userData.user);
    }
  }, [user]); 



  const slideTest = [
    "MakerLab", "GrowMind", "LogicPlay", "SoulWork", "CodeCamp",
    "Worldview", "Mythology", "ArtFlow", "BodyMove", "ThinkLab",
    "StoryMap", "PlayTime", "MindHack", "LifeMath", "EcoTrack",
    "DreamLab", "ZenSpace", "GameDev", "Feelings", "SketchUp",
  ];


  const animateButton = () => {
    gsap.fromTo(
      buttonRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeIndex((currentIndex + 1) % btnLabels.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const changeIndex = (newIndex) => {
    setCurrentIndex(newIndex);
    animateButton();
  };

  const goNext = () => {
    changeIndex((currentIndex + 1) % btnLabels.length);
  };

  const goPrev = () => {
    changeIndex((currentIndex - 1 + btnLabels.length) % btnLabels.length);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-16">
    {/* Animated Heading */}

    {/* Animated Button Section */}
    <div className="w-full flex justify-center items-center mt-4">
      <div className="w-[60%] flex justify-around items-center">
        {/* Prev Arrow */}
        <IoIosArrowRoundForward
          size={36}
          className={`rotate-180  cursor-pointer hover:scale-110 transition text-black`}
          onClick={goPrev}
        />

        {/* Animated Button Label */}
        <div
          ref={buttonRef}
          className="button-1 button p-0.5 rounded-full transition-all duration-300 cursor-pointer"
        >
          <button className="px-6 py-2 bg-white text-black rounded-full shadow-lg transition-all duration-300 min-w-[120px] cursor-pointer">
            {btnLabels[currentIndex]}
          </button>
        </div>

        {/* Next Arrow */}
        <IoIosArrowRoundForward
          size={36}
          className={` cursor-pointer hover:scale-110 transition text-black`}
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
      <div className="relative w-[80%] h-auto p-0.5 button-1 button rounded-4xl">
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

export default Hero;

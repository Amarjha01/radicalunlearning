import React from "react";

const WhoWeAre = () => {
  return (
    <div className=" w-full bg-[#2b354a] rounded-4xl flex flex-col  items-center">
      <div className="flex flex-col  lg:flex-row gap-5 p-5 px-10   justify-around">
        <div className="  lg:h-[50vh] rounded-3xl overflow-hidden ">
          <img src="whoWeAre.jpg" alt="" className=" w-full h-full object-contain rounded-3xl bg-amber-300" />
        </div>
        <div className=" lg:w-[50%] w-[100%]">
          <p className=" text-5xl lg:text-7xl lg:font-bold font-semibold">Who We Are</p>
          <p className=" lg:text-2xl text-md">
            We are parents and were students who have experienced the drawbacks
            of mainstream education: too much emphasis on learning measurement,
            flawed measurement techniques, carrot/stick approach, focus on
            memorization, limited exploration through questioning, intense
            pressure of competition & many more…
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 p-5 px-10   justify-around ">
        <div className=" lg:w-[50%] w-[100%]">
          <p className=" lg:text-2xl text-md ">
          So, we have created a framework and platform for like-minded people mainly unschooling parents and homeschoolers in the learning community who would like to support our principles of open, enjoyable and effective learning. The framework offers essential principles of learning, tools to access resources, collaborate and contribute towards learning.
          </p>
        </div>
        <div className=" lg:h-[50vh] rounded-3xl overflow-hidden ">
          <img src="whoWeAre.jpg" alt="" className="  w-full h-full object-contain rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;

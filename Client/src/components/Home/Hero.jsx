import React from "react";

const Hero = () => {
  return (
    <div className=" w-full">
      <div className=" relative w-full lg:h-[60vh] flex z-30  p-4 gap-5 text-2xl font-semibold ">
        <div className="relative w-[50%] h-full  hidden overflow-hidden lg:flex justify-center items-center rounded-2xl cursor-pointer">
          <img
            src="/heroImg1.jpg"
            className="  object-fill bg-amber-500 hover:scale-125 transform duration-500 hover:opacity-70 rounded-4xl "
            alt=""
          />
          <div className=" absolute h-fit w-[70%] z-10 backdrop-blur-xl p-5 text-black rounded-2xl">
            <p>Radical Unlearning - A revolution in Education</p>
          </div>
        </div>
        <div className="w-[100%] lg:w-[50%] h-full overflow-hidden flex justify-center items-center rounded-2xl cursor-pointer">
          <img
            src="/heroImg2.jpg"
            className="  object-fill bg-amber-500 hover:scale-125  transform duration-500 hover:opacity-70 "
            alt=""
          />
          <div className=" absolute h-fit lg:w-[40%] w-[60%] z-10 backdrop-blur-xl p-5 text-black rounded-2xl">
            <p className=" hidden lg:block">
              Break free and adopt principles of unlearning.
            </p>
            <p className="  lg:hidden">
              Radical Unlearning - A revolution in Education Break free and
              adopt principles of unlearning.
            </p>
          </div>
        </div>
      </div>
      <div className=""></div>
      <div className=" w-full p-4">
        <p className=" text-2xl lg:text-4xl font-semibold lg:font-bold"> All the skills you need in one place</p>
        <p className=" text-xl">
          From critical skills to technical
          topics, Radical Unlearning supports your professional development.
        </p>
      </div>
    </div>
  );
};

export default Hero;

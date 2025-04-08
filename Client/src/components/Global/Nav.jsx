import { NavLink } from "react-router-dom";
import './global.css';
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
const Nav = () => {
    const [isOpen , setIsOpen] = useState(false);


    const handleMenue = ()=>{
        setIsOpen(!isOpen);
    }



    
  return (
    <div className=" relative w-full text-white flex justify-between items-center px-5  z-50">
      <div>
        {/* <img src="" alt="" /> */}
        <p className=" text-md md:text-xl lg:text-2xl font-semibold uppercase anta-regular">Radical Unlearning</p>
      </div>
      {/* Navbar */}
      <div className=" absolute w-full hidden lg:flex justify-center items-center">
        <ul className=" flex">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white px-3 py-2 rounded-xl"
                  : "text-gray-300 hover:text-white px-3 py-2"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white px-3 py-2 rounded-xl"
                  : "text-gray-300 hover:text-white px-3 py-2"
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white px-3 py-2 rounded-xl"
                  : "text-gray-300 hover:text-white px-3 py-2"
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
        {/* <div className="w-64 h-64 rounded-full bg-gradient-radial from-white via-indigo-400 to-transparent shadow-xl absolute"></div> */}
      </div>
     <div className=" absolute w-full h-auto -z-20 flex justify-center items-center">
     <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-56 w-56 rounded-full filter-1"></div>
     </div>
     <div className=" flex items-center gap-2">
     <div className=" relative button-2 p-0.5 rounded-4xl   ">
        <button className=" bg-black rounded-4xl px-6 py-2 border-2 border-gray-700">
            Join Now
        </button>
      </div>
      <div className=" block lg:hidden"  >
   {
        isOpen ? <IoMdClose onClick={handleMenue} /> : <CiMenuFries onClick={handleMenue} />
    }
   </div>
     </div>
 

     <div className={`absolute lg:hidden right-0 top-[10vh] rounded-2xl border bg-radial from-[#020817] to-[#4635a0]  uppercase w-auto p-10 ${isOpen ? '-translate-x-5' : 'translate-x-full'} transition duration-500`}>

    <ul className=" flex flex-col gap-5">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white px-3 py-2 rounded-xl"
              : "text-gray-300 hover:text-white px-3 py-2"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white px-3 py-2 rounded-xl"
              : "text-gray-300 hover:text-white px-3 py-2"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white px-3 py-2 rounded-xl"
              : "text-gray-300 hover:text-white px-3 py-2"
          }
        >
          Contact Us
        </NavLink>
      </li>
    </ul>
  </div>
 
 
    </div>
  );
};

export default Nav;

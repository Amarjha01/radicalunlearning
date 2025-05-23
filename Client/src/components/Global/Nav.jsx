import { Link, NavLink } from "react-router-dom";
import './global.css';
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../store/slices/userSlice.jsx";

import axios from "axios";
import API from "../../common/apis/ServerBaseURL.jsx";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

const isUser = !!user?.userData?.user;



  const handleSignOut = async() => {
    try {
      const response = await axios.post(API.signout.url , {
        withCredentials:true
      })
      if(response.status ===200){
        dispatch(clearUser());
      }
    } catch (error) {
      
    }
    
  };

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const navRoutes = ['/', '/contact'];

  return (
    <div className="relative w-full text-white flex justify-end md:justify-between md:items-center px-5 z-50 ">
      {/* Desktop Navbar */}
      <div className="   hidden lg:flex justify-center items-center">
  <ul className="flex">
    {navRoutes.map((path, idx) => (
      <li key={path}>
        <NavLink
          to={path}
          className={({ isActive }) =>
            isActive
              ? `border-b-2 border-[#D0E1D4] text-black px-3 py-2 rounded-xl font-semibold`
              : `text-[#575757] hover:text-black px-3 py-2 font-semibold`
          }
        >
          {["Home", "Contact Us"][idx]}
        </NavLink>
      </li>
    ))}
    {isUser && (
      <li>
        <NavLink
          to={`/dashboard/${user?.userData?.user?.role?.toLowerCase()}`}
          className={({ isActive }) =>
            isActive
              ? `border-b-2 border-[#D0E1D4] text-black px-3 py-2 rounded-xl font-semibold`
              : `text-[#575757] hover:text-black px-3 py-2 font-semibold`
          }
        >
          {user?.userData?.user?.role?.charAt(0).toUpperCase() + user?.userData?.user?.role?.slice(1).toLowerCase()} tools
        </NavLink>
      </li>
    )}
  </ul>
</div>

      
      <div className="  flex items-center gap-3">
        <div className="relative button button-2 p-0.5 rounded-4xl cursor-pointer">
  {isUser ? (
    <button
      onClick={handleSignOut}
      className={`bg-[#F2C078]  border-[#D0E1D4] text-black rounded-4xl px-6 py-2 border-2 cursor-pointer`}
    >
      signOut
    </button>
  ) : (
    <Link to="/signin">
      <button
        className={`bg-[#F2C078] text-[#000000] border-[#D0E1D4] rounded-4xl px-6 py-2 border-2 cursor-pointer`}
      >
        Join Now
      </button>
    </Link>
  )}
</div>
        <div className="block text-black font-bold lg:hidden ">
          {isOpen ? (
            <IoMdClose onClick={handleMenu} />
          ) : (
            <CiMenuFries onClick={handleMenu} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`absolute lg:hidden right-0 top-[10vh] rounded-2xl border 
          bg-[#b4c0b2] uppercase w-auto p-10 z-50
          ${isOpen ? "-translate-x-5" : "translate-x-full"} transition duration-500`}
      >
        <ul className="flex flex-col gap-5">
          {navRoutes.map((path, idx) => (
            <li key={path}>
              <NavLink
                to={path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  isActive
                    ? "text-black border-b-2 border-white px-3 py-2 rounded-xl"
                    : "text-black hover:text-white px-3 py-2"
                }
              >
                {["Home", "Contact Us"][idx]}
              </NavLink>
            </li>
          ))}
          {isUser && (
            <li>
              <NavLink
                to={`/dashboard/${user?.userData?.user?.role?.toLowerCase()}`}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  isActive
                    ? "text-black border-b-2 border-white px-3 py-2 rounded-xl"
                    : "text-black hover:text-white px-3 py-2"
                }
              >
                {user?.userData?.user?.role?.charAt(0).toUpperCase() + user?.userData?.user?.role?.slice(1).toLowerCase()} tools
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;

import { Link, NavLink } from "react-router-dom";
import './global.css';
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateTheme, clearUser } from "../../store/slices/userSlice.jsx";

import axios from "axios";
import API from "../../common/apis/ServerBaseURL.jsx";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const menuRef = useRef();
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const currentTheme = user?.userData?.user?.theme || 'dark'; // Get from Redux
  const [theme, setTheme] = useState(currentTheme); // Local UI theme

  const handleToggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    // 1. Update Redux immediately
    dispatch(updateTheme(newTheme));
    // 2. Update Local State
    setTheme(newTheme);

    // 3. Send Backend update
    try {
      await axios.post(
        API.toggleTheme.url,
        { theme: newTheme }, // send new theme
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Error toggling theme:", err.response?.data?.message || err.message);
      // Optional: rollback
      // setTheme(theme);
    }
  };
console.log(theme);

  useEffect(() => {
    if (user && user.userData) {
      setIsUser(true);
      setTheme(user?.userData?.user?.theme || 'light'); // Sync UI if user changes
    } else {
      setIsUser(false);
    }
  }, [user]);

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

  const navRoutes = ['/', '/about', '/contact'];

  return (
    <div className="relative w-full text-white flex justify-between items-center px-5 z-50">
      {/* Logo */}
      <Link to="/" className={`text-md md:text-xl lg:text-2xl font-semibold uppercase anta-regular cursor-pointer z-20 ${theme === 'dark' ? 'text-white' : 'text-[#575757]'}`}>
        Radical Unlearning
      </Link>
      
      {/* Desktop Navbar */}
      <div className="absolute w-full hidden lg:flex justify-center items-center">
  <ul className="flex">
    {navRoutes.map((path, idx) => (
      <li key={path}>
        <NavLink
          to={path}
          className={({ isActive }) =>
            isActive
              ? `border-b-2 ${theme === 'dark' ? 'border-white text-white' : 'border-[#D0E1D4] text-[#575757]'} px-3 py-2 rounded-xl`
              : `${theme === 'dark' ? 'text-gray-300' : 'text-[#575757] hover:text-white'} px-3 py-2`
          }
        >
          {["Home", "About Us", "Contact Us"][idx]}
        </NavLink>
      </li>
    ))}
    {isUser && (
      <li>
        <NavLink
          to={`/dashboard/${user?.userData?.user?.role?.toLowerCase()}`}
          className={({ isActive }) =>
            isActive
              ? `border-b-2 ${theme === 'dark' ? 'border-white text-white' : 'border-[#D0E1D4] text-[#575757]'} px-3 py-2 rounded-xl`
              : `${theme === 'dark' ? 'text-gray-300' : 'text-[#575757] hover:text-white'} px-3 py-2`
          }
        >
          {user?.userData?.user?.role?.charAt(0).toUpperCase() + user?.userData?.user?.role?.slice(1).toLowerCase()} tools
        </NavLink>
      </li>
    )}
  </ul>
</div>


      {/* Glowing Circle */}
      <div className="absolute w-full h-auto -z-20 flex justify-center items-center">
        <div className={`h-56 w-56 rounded-full filter-1 bg-gradient-to-r ${theme === 'dark' ? 'from-blue-500 to-purple-600' : 'from-[#FAD0C4] to-[#D0E1D4]'}`} />
      </div>

      {/* CTA & Hamburger */}
      <div className="flex items-center gap-3">
        <button 
          onClick={handleToggleTheme}
          className="relative w-12 h-6 flex items-center bg-gradient-to-r from-purple-500 to-pink-500 dark:from-gray-700 dark:to-gray-900 rounded-full p-1 cursor-pointer transition-all duration-500 shadow-lg"
        >
          <div className={`bg-white dark:bg-black w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : ''}`} />
        </button>
        <div className="relative button button-2 p-0.5 rounded-4xl cursor-pointer">
  {isUser ? (
    <button
      onClick={handleSignOut}
      className={`${
        theme === 'dark' ? 'bg-black text-white border-gray-700' : 'bg-[#FAD0C4]  border-[#D0E1D4] text-black'
      } rounded-4xl px-6 py-2 border-2 cursor-pointer`}
    >
      signOut
    </button>
  ) : (
    <Link to="/signin">
      <button
        className={`${
          theme === 'dark' ? 'bg-black text-white border-gray-700' : 'bg-[#FAD0C4] text-[#D0E1D4] border-[#D0E1D4]'
        } rounded-4xl px-6 py-2 border-2 cursor-pointer`}
      >
        Join Now
      </button>
    </Link>
  )}
</div>


        <div className="block lg:hidden">
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
          bg-radial from-[#020817] to-[#4635a0] uppercase w-auto p-10 
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
                    ? "text-white border-b-2 border-white px-3 py-2 rounded-xl"
                    : "text-gray-300 hover:text-white px-3 py-2"
                }
              >
                {["Home", "About Us", "Contact Us"][idx]}
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
                    ? "text-white border-b-2 border-white px-3 py-2 rounded-xl"
                    : "text-gray-300 hover:text-white px-3 py-2"
                }
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;

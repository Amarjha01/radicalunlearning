import { Link, NavLink } from "react-router-dom";
import './global.css';
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { clearUser } from "../../store/slices/userSlice.jsx";

const Nav = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isUser , setIsUser] = useState(false)
  const menuRef = useRef();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  
  useEffect(() => {
    if (!user || !user.userData) {
      setIsUser(false);
    } else {
      setIsUser(true);
    }
  }, [user]);
  

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu on outside click
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

  // Close menu on nav link click
  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Determine the routes
  const navRoutes = [
    '/',
    '/about',
    '/contact', 
  ];

 

  return (
    <div className="relative w-full text-white flex justify-between items-center px-5 z-50">
      {/* Logo */}
      <Link to={'/'} className="text-md md:text-xl lg:text-2xl font-semibold uppercase anta-regular cursor-pointer z-20">
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
                    ? "text-white border-b-2 border-white px-3 py-2 rounded-xl"
                    : "text-gray-300 hover:text-white px-3 py-2"
                }
              >
                {["Home", "About Us", "Contact Us"][idx]}
              </NavLink>
            </li>
          ))}
         {
           isUser && 
          <li>
          <NavLink to={`/dashboard/${user?.userData?.role.toLowerCase()}`}
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white px-3 py-2 rounded-xl"
              : "text-gray-300 hover:text-white px-3 py-2"
          }
          >
          Dashboard
          </NavLink>
        </li>
         }
        </ul>
      </div>

      {/* Glowing Circle */}
      <div className="absolute w-full h-auto -z-20 flex justify-center items-center">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-56 w-56 rounded-full filter-1" />
      </div>

      {/* CTA & Hamburger */}
      <div className="flex items-center gap-2">
        <div className="relative button-2 p-0.5 rounded-4xl cursor-pointer">
          {
            user && user.userData ?  <button onClick={handleLogout} className="bg-black rounded-4xl px-6 py-2 border-2 border-gray-700 cursor-pointer">
              LogOut
            </button> :   <Link to={'/signin'}>
              <button className="bg-black rounded-4xl px-6 py-2 border-2 border-gray-700 cursor-pointer">
                Join Now
              </button>
            </Link>
          }
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
          <li>
            <NavLink to="/" onClick={handleNavClick}
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
            <NavLink to="/about" onClick={handleNavClick}
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
            <NavLink to="/contact" onClick={handleNavClick}
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white px-3 py-2 rounded-xl"
                  : "text-gray-300 hover:text-white px-3 py-2"
              }
            >
              Contact Us
            </NavLink>
          </li>
          {/* Display Dashboard only if user is logged in */}
          {user && user.userData && (
            <li>
              <NavLink to={`/dashboard/${user.userData.role}`} onClick={handleNavClick}
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

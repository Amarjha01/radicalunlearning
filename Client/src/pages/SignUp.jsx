import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
const SignUp = () => {

  
  return (
    <div className="max-w-4xl min-h-screen mx-auto  p-6 rounded-lg shadow-md flex flex-col items-center z-50">
      <Link
        to={"/"}
        className="absolute top-6 left-6 flex items-center gap-2 text-black hover:text-[#f2c078] transition"
      >
        <AiFillHome className="text-2xl" />
        <span className="hidden sm:inline-block font-semibold">Home</span>
      </Link>

      <p className=" text-black text-2xl anta-regular ">SignUp As </p>
      <div className="w-full h-14 rounded-4xl flex justify-center items-center">
        <div className="bg-white text-center flex gap-5 font-bold uppercase rounded-4xl px-2 py-1 anta-regular">
          <NavLink
            to="/signup/learner"
            className={({ isActive }) =>
              `px-3 py-1 rounded-4xl ${
                isActive
                  ? "bg-black text-white font-extrabold"
                  : "hover:font-extrabold hover:bg-black hover:text-white"
              }`
            }
          >
            Learner
          </NavLink>

          <NavLink
            to="/signup/educator"
            className={({ isActive }) =>
              `px-3 py-1 rounded-4xl ${
                isActive
                  ? "bg-black text-white font-extrabold"
                  : "hover:font-extrabold hover:bg-black hover:text-white"
              }`
            }
          >
            Educator
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SignUp;

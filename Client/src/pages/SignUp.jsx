import { Outlet, NavLink } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="max-w-4xl min-h-screen mx-auto bg-gray-600 p-6 rounded-lg shadow-md flex flex-col justify-around items-center">
      <div className="w-full h-14 rounded-4xl flex justify-center items-center">
        <div className="bg-white text-center flex gap-5 font-bold uppercase rounded-4xl px-2 py-1">
          <NavLink
            to="/signup/learner"
            className={({ isActive }) =>
              `px-2 py-1 rounded-4xl ${
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
              `px-2 py-1 rounded-4xl ${
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

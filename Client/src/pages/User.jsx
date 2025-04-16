import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { clearUser } from "../store/slices/userSlice.jsx";
import { useEffect, useState } from "react";

const User = () => {
    const [isActive , setIsActive] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user); // assuming one user
  
    console.log("user data:", user);
  
    useEffect(() => {
        if (user && user.userData) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      }, [user]);
  const handeleLogout = () =>{
dispatch(clearUser());
console.log("logout successfully")
  }
    return (
      <div className=" text-white">
        <h1 className=" text-6xl text-white">{user?.userData?.Name}</h1> 
        <h1 className=" text-6xl text-white">{user?.userData?.Email}</h1> 
        <h1 className=" text-6xl text-white">{user?.userData?.Role}</h1> 
        {
            isActive ? <h1 className=" text-6xl text-white"> is active </h1>  : <h1 className=" text-6xl text-white"> not active </h1>
        }
        <button onClick={handeleLogout}>
            logout
        </button>
      </div>
    );
  };

  export default User
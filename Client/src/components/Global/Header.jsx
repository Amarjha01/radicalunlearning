import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className=' w-full h-auto flex p-4 backdrop-blur-xl fixed top-0 z-50 drop-shadow-2xl '>

    <div className=' lg:w-[4%]  '>
   <img src="https://img1.wsimg.com/isteam/ip/e5cb8394-fc78-49c7-933d-c7772dfc2379/Logo1.png/:/rs=h:70,cg:true,m/qt=q:95" alt="logo" className=' object-contain w-full'/>
    </div>

    <div className=' flex flex-col grow bg-amber-40'>
   <div className=' lg:text-5xl uppercase text-start px-4 font-bold'>
    <h1>Radical Unlearning</h1>
   </div>
   <div className=" hidden lg:block">
   <ul className='flex text-md cursor-pointer gap-7 px-4 pt-4 uppercase'>
      <Link to={'/'}><li>Home</li></Link>
      <Link to={'/aboutUs'} ><li>About Us</li></Link>
     <Link to={'/learner'}> <li>lerner</li></Link>
     <Link to={'/learner'}><li>Educator</li></Link>
     <Link to={'/dashboard'}><li>dashboard</li></Link>
     
    </ul>
   </div>
    </div>
 
 <div className=' hidden text-xl lg:flex items-center gap-5'>
      <Link to={'/signin'}><button className=' px-5 py-1 border rounded-full cursor-pointer uppercase bg-[#b4c0b2] '>Sign In</button></Link>
      <Link to={'/signup/learner'}><button className=' px-5 py-1 border rounded-full cursor-pointer uppercase bg-[#b4c0b2] '>Sign Up</button></Link>
    </div>
 </div>
  )
}

export default Header
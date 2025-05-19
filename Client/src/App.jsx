import { Outlet } from 'react-router-dom'
import React, { useEffect } from 'react';
import './App.css'
import Footer from './components/Global/Footer.jsx';
import Nav from './components/Global/Nav.jsx';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FloatingSocialIcons from './components/Global/FloatingSocialIcons.jsx';
function App() {

const user = useSelector((state) => state?.user);
const theme = user?.userData?.user?.theme
console.log(theme);

useEffect(() => {
  if (theme === 'dark' ) {
    document.body.style.backgroundColor = '#020817'; 
  } else {
    document.body.style.backgroundColor = '#faf3dd'; 
  }
}, [theme]);

  return (
    <>
   <div className={`relative min-h-screen  lg:pt-[1%] pt-[3%]  overflow-x-hidden  flex flex-col `}>
    <ToastContainer
  position="top-right"
  autoClose={4000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>
    <Nav />
    <FloatingSocialIcons />
    <Outlet />
    <Footer />
   </div>
    </>
  )
}

export default App

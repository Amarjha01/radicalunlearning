import { Outlet } from 'react-router-dom'
import React, { useEffect } from 'react';
import './App.css'
import Footer from './components/Global/Footer.jsx';
import Nav from './components/Global/Nav.jsx';
import { useState } from 'react';
import { useSelector } from "react-redux";

function App() {

const user = useSelector((state) => state?.user);
const theme = user?.userData?.user?.theme

useEffect(() => {
  if (theme === 'light') {
    document.body.style.backgroundColor = '#f0eee1'; 
  } else {
    document.body.style.backgroundColor = '#020817'; 
  }
}, [theme]);

  return (
    <>
   <div className='relative min-h-screen text-white lg:pt-[1%] pt-[3%]  overflow-x-hidden  flex flex-col '>
    <Nav />
    <Outlet />
    <Footer />
   </div>
    </>
  )
}

export default App

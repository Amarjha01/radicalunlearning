import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Global/Footer.jsx';
import Nav from './components/Global/Nav.jsx';
function App() {

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

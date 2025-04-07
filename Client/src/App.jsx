import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Global/Header.jsx';
import Footer from './components/Global/Footer.jsx';
function App() {

  return (
    <>
   <div className='relative min-h-[100vh] text-white lg:pt-[10%] pt-[30%] '>
    <Header />
    <Outlet />
    <Footer />
   </div>
    </>
  )
}

export default App

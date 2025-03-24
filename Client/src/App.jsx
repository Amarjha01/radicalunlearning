import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx'
function App() {

  return (
    <>
   <div className='relative min-h-[100vh] text-white'>
    <Header />
    <Outlet />
    <Footer />
   </div>
    </>
  )
}

export default App

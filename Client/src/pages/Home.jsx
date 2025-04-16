import Hero from '../components/Home/Hero'
import TestimonialCarousel from '../components/Global/TestimonialCarousel'
import RediscoverCards from '../components/Home/RediscoverCards'
import Features from '../components/Home/Features'
import DynamicRadioContent from '../components/Home/DynamicRadioContent'

const Home = () => {
  return (
    <div>
      <Hero />
      <RediscoverCards />
      <Features />
      <DynamicRadioContent />
      <TestimonialCarousel />
    
    </div>
  )
}

export default Home
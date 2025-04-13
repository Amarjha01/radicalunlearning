import React from 'react'
import Hero from '../components/Home/Hero'
import Video from '../components/Home/Video'
import WhoWeAre from '../components/Home/WhoWeAre'
import MissionTeamPolicy from '../components/Home/MissionTeamPolicy'
import Hero2 from '../components/Home/Hero2'
import TestimonialCarousel from '../components/Global/TestimonialCarousel'
import RediscoverCards from '../components/Home/RediscoverCards'
import Features from '../components/Home/Features'
import DynamicRadioContent from '../components/Home/DynamicRadioContent'

const Home = () => {
  return (
    // <div className=' text-white'>
    //   <Hero />
    //   <Video />
    //   <WhoWeAre />
    //   <MissionTeamPolicy />
    // </div>
    <div>
      <Hero2 />
   
      <RediscoverCards />
      <Features />
      <DynamicRadioContent />
      <TestimonialCarousel />
    
    </div>
  )
}

export default Home
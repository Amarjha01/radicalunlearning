import React from 'react'
import Hero from '../components/Home/Hero'
import Video from '../components/Home/Video'
import WhoWeAre from '../components/Home/WhoWeAre'
import MissionTeamPolicy from '../components/Home/MissionTeamPolicy'

const Home = () => {
  return (
    <div className=' text-white'>
      <Hero />
      {/* <Video /> */}
      <WhoWeAre />
      <MissionTeamPolicy />
    </div>
  )
}

export default Home
import React from 'react'

const Video = () => {
  return (
    <div className="  w-full flex justify-center items-center overflow-hidden opacity-100 scale-100">
    <video  className="w-full" autoPlay muted loop playsInline>
      <source
        // src="https://res.cloudinary.com/dkdyrgg3q/video/upload/v1741069458/Nifa%20Overseas/eylnzb8k1cnmjfbjxdcd.mp4"
        type="video/mp4"
      />
    </video>
  </div>
  )
}

export default Video
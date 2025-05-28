import React from 'react'

const Loader = () => {
  return (
    <div className="fixed top-0 flex items-center justify-center min-h-screen bg-black/40 z-50 w-full">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-20 h-20 border-4 border-orange-100 border-t-rose-300 rounded-full animate-spin"></div>
        
        {/* Middle ring */}
        <div className="absolute top-2 left-2 w-16 h-16 border-4 border-pink-100 border-t-orange-300 rounded-full animate-spin animate-reverse" style={{animationDuration: '1.5s'}}></div>
        
        {/* Inner ring */}
        <div className="absolute top-4 left-4 w-12 h-12 border-4 border-rose-100 border-t-pink-300 rounded-full animate-spin" style={{animationDuration: '2s'}}></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-rose-300 to-orange-300 rounded-full animate-pulse"></div>
        
        {/* Floating dots */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-2 h-2 bg-rose-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
      </div>
      
      {/* Loading text */}
      <div className="absolute mt-32 text-rose-400 font-light text-lg tracking-wider animate-pulse">
        Loading...
      </div>
      
      <style jsx>{`
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  )
}

export default Loader
import React from 'react'

const TopBar = (activeView , user) => {
  return (
    <div>
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-4 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold dark:text-white">
              {activeView === 'dashboard' && 'Dashboard'}
              {activeView === 'educators' && 'Educators Management'}
              {activeView === 'learners' && 'Learners Management'}
              {activeView === 'revenue' && 'Revenue Overview'}
              {activeView === 'settings' && 'Subscription Settings'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? 
                <Sun size={20} className="text-gray-300" /> : 
                <Moon size={20} className="text-gray-600" />
              }
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                A
              </div>
              <span className="text-sm font-medium hidden sm:block dark:text-white">{user.userData.user.name}</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TopBar
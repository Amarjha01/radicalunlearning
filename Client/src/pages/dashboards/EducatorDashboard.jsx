import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, Users, User, DollarSign, Settings, Bell, LogOut, Moon, Sun, Eye, MoreVertical, Edit, ChevronDown, Upload, Search, X } from 'lucide-react';
import axios from 'axios';
import API from '../../common/apis/ServerBaseURL.jsx'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { clearUser } from "../../store/slices/userSlice.jsx";

// Dummy data for scheduled sessions
const dummyScheduledSessions = [
  {
    id: 1,
    title: "Advanced Mathematics Tutoring",
    date: "2025-04-16",
    time: "14:00",
    learnerName: "Rahul Singh",
    duration: "60 min",
    status: "Confirmed"
  },
  {
    id: 2,
    title: "Physics Problem Solving",
    date: "2025-04-17",
    time: "16:30",
    learnerName: "Priya Patel",
    duration: "90 min",
    status: "Confirmed"
  },
  {
    id: 3,
    title: "Mathematics Exam Preparation",
    date: "2025-04-18",
    time: "10:00",
    learnerName: "Alex Johnson",
    duration: "120 min",
    status: "Pending"
  },
  {
    id: 4,
    title: "Physics Concept Review",
    date: "2025-04-15",
    time: "13:00",
    learnerName: "Sarah Williams",
    duration: "60 min",
    status: "Completed"
  },
  {
    id: 5,
    title: "Mathematics Quiz Preparation",
    date: "2025-04-19",
    time: "11:00",
    learnerName: "Michael Brown",
    duration: "45 min",
    status: "Confirmed"
  }
];

// Dummy data for educator profile
const dummyEducatorProfile = {
  name: "AMAR KUMAR JHA",
  email: "amarjha880@gmail.com",
  role: "educator",
  subrole: "Expert",
  country: "India",
  language: "Korean",
  bio: "Experienced mathematics and physics educator with over 8 years of teaching experience. Specialized in helping students prepare for competitive exams and building strong foundational knowledge.",
  experience: "8+ years of teaching experience in mathematics and physics at various levels. Worked with students from diverse backgrounds and learning needs.",
  subjects: ["Math", "Physics"],
  serviceType: "Paid",
  payoutMethod: "bank",
  bankAccount: "123123123123",
  ifscCode: "PUNB101213",
  password: "********",
  avatar: "/api/placeholder/150/150"
};

// Available subject options
const subjectOptions = ["Math", "Physics", "Chemistry", "Biology", "Computer Science", "English", "History", "Geography"];

// Main Component
export default function EducatorDashboard() {


  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // list or calendar
  const [profileData, setProfileData] = useState({});
  const [sessions, setSessions] = useState(dummyScheduledSessions);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  console.log("user",profileData);
  
useEffect(()=>{
  setProfileData(user.userData.user)
})

  const handleLogout = () => {
    dispatch(clearUser());
  };


  

  // For password change form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // Filter for upcoming sessions (not completed)
  const upcomingSessions = sessions.filter(session => session.status !== "Completed");
  
  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    // In a real app, you would send this data to your API
  };
  
  // Handle session cancellation
  const handleCancelSession = (sessionId) => {
    const updatedSessions = sessions.map(session => 
      session.id === sessionId ? {...session, status: "Cancelled"} : session
    );
    setSessions(updatedSessions);
  };
  
  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    // In a real app, you would validate and update the password via API
    alert("Password changed successfully!");
    setIsChangePasswordOpen(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    
    
      <div className={`${darkMode ? 'dark' : ''} min-h-screen `}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Sidebar - Desktop */}
     <div className=' flex'>
     <aside className="min-h-screen inset-y-0 left-0 z-10 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 md:translate-x-0 hidden md:block">
          <div className="flex flex-col h-full">
            <div className="px-4 py-6 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-indigo-100 dark:bg-indigo-900 mr-3">
                <img 
                  src={profileData.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Educator Portal</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{profileData.name}</p>
              </div>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-1">
              <button 
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === "dashboard" 
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200" 
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Calendar className="mr-3 h-5 w-5" />
                <span>Dashboard</span>
              </button>
              
              <button 
                onClick={() => setActiveTab("profile")}
                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === "profile" 
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200" 
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                <span>Profile</span>
              </button>
              
              <button 
                onClick={() => setActiveTab("payment")}
                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === "payment" 
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200" 
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <DollarSign className="mr-3 h-5 w-5" />
                <span>Payment Settings</span>
              </button>
            </nav>
            
            <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <button 
                  className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  <span>View as learner</span>
                </button>
              </div>
              <button 
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>
                {/* Main Content Area */}
                <div className=" p-4">
          {/* Top Bar with Notifications and Dark Mode Toggle */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {activeTab === "dashboard" && "My Scheduled Sessions"}
              {activeTab === "profile" && "My Profile"}
              {activeTab === "payment" && "Payment Settings"}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden bg-white dark:bg-gray-800 shadow-sm py-4 px-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
              <h1 className="ml-2 text-lg font-semibold text-gray-800 dark:text-white">Educator Portal</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </div>
            </div>
          </div>
        </div>
          
          {/* Mobile Content Title */}
          <div className="md:hidden mb-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              {activeTab === "dashboard" && "My Scheduled Sessions"}
              {activeTab === "profile" && "My Profile"}
              {activeTab === "payment" && "Payment Settings"}
            </h1>
          </div>
          
          {/* Dashboard Content */}
          {activeTab === "dashboard" && (
            <div className="space-y-4">
              {/* View Toggle and Search Bar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-4">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      viewMode === "list" 
                      ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    List View
                  </button>
                  <button 
                    onClick={() => setViewMode("calendar")}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      viewMode === "calendar" 
                      ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    Calendar View
                  </button>
                </div>
                
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search sessions..."
                    className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              {viewMode === "list" ? (
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Session</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date & Time</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Learner</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {sessions.map((session) => (
                          <tr key={session.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{session.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {new Date(session.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{session.time}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">{session.learnerName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">{session.duration}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                session.status === 'Confirmed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : session.status === 'Pending'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    : session.status === 'Completed'
                                      ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}>
                                {session.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {session.status !== "Completed" && session.status !== "Cancelled" && (
                                <div className="flex space-x-2">
                                  <button 
                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    onClick={() => alert(`Reschedule session: ${session.title}`)}
                                  >
                                    Reschedule
                                  </button>
                                  <button 
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    onClick={() => handleCancelSession(session.id)}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Calendar View</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Calendar integration coming soon. Your sessions will be displayed here in calendar format.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Upcoming Sessions Overview */}
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-indigo-700 dark:text-indigo-300">Today's Sessions</p>
                        <p className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">1</p>
                      </div>
                      <Calendar className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-green-700 dark:text-green-300">This Week</p>
                        <p className="text-2xl font-bold text-green-800 dark:text-green-200">4</p>
                      </div>
                      <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-blue-700 dark:text-blue-300">Total Learners</p>
                        <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">5</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Profile View */}
          {activeTab === "profile" && (
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
    <div className="flex flex-col md:flex-row md:space-x-8">
      {/* Avatar Section */}
      <div className="md:w-1/4 flex flex-col items-center mb-6 md:mb-0">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-4">
          <img 
            src={profileData.avatar} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 bg-white dark:bg-gray-800 rounded-full">
              
              
              
            </button>
          </div>
        </div>
        <div>
  <input 
    type="file" 
    accept=".jpg,.jpeg" 
    className="hidden" 
    id="fileUpload" 
    // onChange={handleFileChange} 
  />

  <label htmlFor="fileUpload">
    <button
      type="button"
      className="group px-4 py-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200 rounded-md text-sm font-medium flex items-center justify-center cursor-pointer"
    >
      <span className="group-hover:hidden">Upload new photo</span>
      <Upload className="hidden group-hover:block h-5 w-5 text-gray-700 dark:text-gray-300" />
    </button>
  </label>
</div>


      </div>
      
      {/* Profile Form */}
      <div className="md:w-3/4">
        <form onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input 
                type="text" 
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input 
                type="email" 
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role
              </label>
              <input 
                type="text" 
                value={profileData.role}
                onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Subrole */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subrole
              </label>
              <input 
                type="text" 
                value={profileData.subrole}
                onChange={(e) => setProfileData({...profileData, subrole: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Country
              </label>
              <input 
                type="text" 
                value={profileData.country}
                onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Language
              </label>
              <input 
                type="text" 
                value={profileData.language}
                onChange={(e) => setProfileData({...profileData, language: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Service Type
              </label>
              <input 
                type="text" 
                value={profileData.serviceType}
                onChange={(e) => setProfileData({...profileData, serviceType: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Payout Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Payout Method
              </label>
              <input 
                type="text" 
                value={profileData.payoutMethod}
                onChange={(e) => setProfileData({...profileData, payoutMethod: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* UPI ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                UPI ID
              </label>
              <input 
                type="text" 
                value={profileData.upiID}
                onChange={(e) => setProfileData({...profileData, upiID: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Approved */}
            <div className="flex items-center space-x-2 mt-4">
              <input 
                type="checkbox" 
                checked={profileData.Approved}
                onChange={(e) => setProfileData({...profileData, Approved: e.target.checked})}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700 dark:text-gray-300">Approved</label>
            </div>

            {/* Experience */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Experience
              </label>
              <textarea 
                value={profileData.experience}
                onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={2}
              />
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea 
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={4}
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="px-6 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  </div>
)}


          </div>
     </div>
        
        {/* Mobile Header with Menu Toggle */}
        
        
        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 md:hidden">
            <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="absolute inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300">
              <div className="flex flex-col h-full">
                <div className="px-4 py-6 flex items-center border-b border-gray-200 dark:border-gray-700">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-indigo-100 dark:bg-indigo-900 mr-3">
                    <img 
                      src={profileData.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Educator Portal</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{profileData.name}</p>
                  </div>
                </div>
                
                <nav className="flex-1 px-4 py-6 space-y-1">
                  <button 
                    onClick={() => {
                      setActiveTab("dashboard");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                      activeTab === "dashboard" 
                      ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Calendar className="mr-3 h-5 w-5" />
                    <span>Dashboard</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setActiveTab("profile");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                      activeTab === "profile" 
                      ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    <User className="mr-3 h-5 w-5" />
                    <span>Profile</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setActiveTab("payment");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                      activeTab === "payment" 
                      ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    <DollarSign className="mr-3 h-5 w-5" />
                    <span>Payment Settings</span>
                  </button>
                </nav>
                
                <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <button 
                      className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      <Eye className="h-5 w-5 mr-2" />
                      <span>View as learner</span>
                    </button>
                  </div>
                  <button 
                    className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        

          </div>
          </div> 
    )
}
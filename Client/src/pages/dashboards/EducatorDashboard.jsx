import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  User,
  Settings,
  Bell,
  LogOut,
  Moon,
  Sun,
  Eye,
  MoreVertical,
  Edit,
  ChevronDown,
  Upload,
  Search,
  X,
} from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { LuPoundSterling } from "react-icons/lu";
import { LuBotMessageSquare } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";
import {FaUserEdit } from 'react-icons/fa';
import axios from "axios";
import API from "../../common/apis/ServerBaseURL.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/slices/userSlice.jsx";
import GroupChat from "../../components/Chat/GroupChat.jsx";
import { MdHome } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import EducatorWallet from "../../components/Dashboard/Educator/EducatorWallet.jsx";
import AIChat from '../../components/ChatBot/Aichat.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Main Component
export default function EducatorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // list or calendar
  const [profileData, setProfileData] = useState({});
  const [sessions, setSessions] = useState({previous:[],upcoming:[]});
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  console.log(activeTab);
  
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.userData?.user) {
      setProfileData(user.userData.user);
    }
  }, ); 
  
  useEffect(()=>{
    const getEducatorSessions = async () =>{
      try {
        const response = await axios.get(API.getEducatorSessions.url, {
          withCredentials:true
        })
        
        if(response.status===200){
          setSessions(response.data)
          console.log('today');
        }
      } catch (error) {
        
      }
    }
    getEducatorSessions()
  },[])

  const handleLogout = () => {
    dispatch(clearUser());
  };

  // For password change form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });




  // Handle session cancellation
  const handleCancelSession = (sessionId) => {
    const updatedSessions = sessions.map((session) =>
      session.id === sessionId ? { ...session, status: "Cancelled" } : session
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
      confirmPassword: "",
    });
  };

  const handleProfileUpdate = () =>{
    console.log(profileData);
    alert("Currently We are not able to update your profile");
  }

    const [sessionFee, setSessionFee] = useState("1000");
  const [isEditing, setIsEditing] = useState(false);
  const [tempFee, setTempFee] = useState(sessionFee);

  const handleSave = () => {
    if (!isNaN(tempFee) && tempFee.trim() !== "") {
      setSessionFee(tempFee);
      setIsEditing(false);
    }
  };




  return (
    <div className="w-[100vw] min-h-screen flex max-w-[1680px] mx-auto">
         <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* sidebar desktop */}
      <div className="hidden md:flex relative left-0 min-h-screen w-64 bg-[#f2c078] shadow-md flex-col">
        <aside className="min-h-screen inset-y-0 left-0 z-10 w-64 shadow-lg transform transition-transform duration-300 md:translate-x-0 hidden md:block">
          <div className="flex flex-col h-full">
            <div className="px-4 py-6 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#e0e7ff]  mr-3">
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-black">
                  Educator Tools
                </h2>
                <p className="text-sm text-gray-600 -300">
                  {profileData.name}
                </p>
              </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === "dashboard"
                    ? "bg-[#e0e7ff] text-black "
                    : "text-black hover:bg-gray-100 "
                }`}
              >
                <Calendar className="mr-3 h-5 w-5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === "profile"
                    ? "bg-[#e0e7ff] text-black "
                    : "text-black hover:bg-gray-100 "
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setActiveTab("Community Chat")}
                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === "communityChat"
                    ? "bg-[#e0e7ff] text-black "
                    : "text-black hover:bg-gray-100 "
                }`}
              >
                <CiChat1 className="mr-3 h-5 w-5" />
                <span>Community Chat</span>
              </button>

              <button
                onClick={() => setActiveTab("payment")}
                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === "payment"
                    ? "bg-[#e0e7ff] text-black "
                    : "text-black hover:bg-gray-100 "
                }`}
              >
                <LuPoundSterling className="mr-3 h-5 w-5" />
                <span>Payment Settings</span>
              </button>

              <button
                onClick={() => setActiveTab("AIbot")}
                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === "AIbot"
                    ? "bg-[#e0e7ff] text-black "
                    : "text-black hover:bg-gray-100 "
                }`}
              >
                <LuBotMessageSquare className="mr-3 h-5 w-5" />
                <span>AI ChatBot</span>
              </button>

              <button
                onClick={() => setActiveTab("Wallet")}
                className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                  activeTab === "Wallet"
                    ? "bg-[#e0e7ff] text-black "
                    : "text-black hover:bg-gray-100 "
                }`}
              >
                <IoWalletOutline className="mr-3 h-5 w-5" />
                <span>Wallet</span>
              </button>
            </nav>

            <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
              </div>
              <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-black hover:text-red-600 dark:hover:text-red-400">
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
              {/* Mobile Sidebar */}
              {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 md:hidden">
            <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="absolute inset-y-0 left-0 w-64 bg-[#f2c078]  shadow-lg transform transition-transform duration-300">
              <div className="flex flex-col h-full">
                <div className="px-4 py-6 flex items-center border-b border-gray-200 dark:border-gray-700">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#e0e7ff]  mr-3">
                    <img 
                      src={profileData.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-black">Educator Portal</h2>
                    <p className="text-sm text-gray-600 -300">{profileData.name}</p>
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
                      ? "bg-[#e0e7ff] text-black " 
                      : "text-black hover:bg-gray-100 "
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
                      ? "bg-[#e0e7ff] text-black " 
                      : "text-black hover:bg-gray-100 "
                    }`}
                  >
                    <User className="mr-3 h-5 w-5" />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab("Community Chat");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                      activeTab === "Community Chat" 
                      ? "bg-[#e0e7ff] text-black " 
                      : "text-black hover:bg-gray-100 "
                    }`}
                  >
                    <CiChat1 className="mr-3 h-5 w-5" />
                    <span>Community Chat</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setActiveTab("payment");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                      activeTab === "payment" 
                      ? "bg-[#e0e7ff] text-black " 
                      : "text-black hover:bg-gray-100 "
                    }`}
                  >
                    <LuPoundSterling className="mr-3 h-5 w-5" />
                    <span>Payment Settings</span>
                  </button>

                  <button 
                    onClick={() => {
                      setActiveTab("AIbot");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                      activeTab === "AIbot" 
                      ? "bg-[#e0e7ff] text-black " 
                      : "text-black hover:bg-gray-100 "
                    }`}
                  >
                    <LuPoundSterling className="mr-3 h-5 w-5" />
                    <span>AI ChatBot</span>
                  </button>

                  <button 
                    onClick={() => {
                      setActiveTab("Wallet");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium ${
                      activeTab === "Wallet" 
                      ? "bg-[#e0e7ff] text-black " 
                      : "text-black hover:bg-gray-100 "
                    }`}
                  >
                    <IoWalletOutline className="mr-3 h-5 w-5" />
                    <span>Wallet</span>
                  </button>
                </nav>
                
                <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    className="flex items-center w-full px-3 py-2 text-sm font-medium text-black hover:text-red-600 dark:hover:text-red-400"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Main Content Area */}
      <div className=" grow-1 min-h-screen bg-[#faf3dd] p-5">
        <div className="  hidden md:flex justify-between items-center mb-6  px-6 py-3 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-black ">
            {activeTab === "dashboard" && "My Scheduled Sessions"}
            {activeTab === "profile" && "My Profile"}
            {activeTab === "Community Chat" && "Comunity Chat"}
            {activeTab === "AIbot" && "AI ChatBot"}
            {activeTab === "Wallet" && "Wallet"}
            {activeTab === "payment" && "Payment Settings"}
          </h1>

          <div className="flex items-center space-x-4">
            <div className="relative">
             <Link to={'/'}>
             <button className="p-2 rounded-full text-gray-600 -300 hover:bg-[#f2c078]">
                <MdHome className="h-7 w-7 cursor-pointer" />
              </button>
             </Link>
            </div>
          </div>
        </div>
        {/* Top Bar with Notifications and Dark Mode Toggle for mobile view */}
        <div className="md:hidden text-black bg-[#faf3dd] shadow-sm py-4 px-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 -300 hover:bg-[#f2c078]"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
              <h1 className="ml-2 text-lg font-semibold text-black">
                Educator Portal
              </h1>
            </div>
            <div className="flex items-center space-x-3">
            <Link to={'/'}>
              <div className="relative">
                <MdHome className="h-5 w-5 text-gray-600 -300" />
              </div>
            </Link>
            </div>
          </div>
        </div>

        {/* Mobile Content Title */}
        <div className="md:hidden mb-4">
          <h1 className="text-xl font-bold text-black ">
          {activeTab === "dashboard" && "My Scheduled Sessions"}
            {activeTab === "profile" && "My Profile"}
            {activeTab === "Community Chat" && "Comunity Chat"}
            {activeTab === "AIbot" && "AI ChatBot"}
            {activeTab === "Wallet" && "Wallet"}
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
                      ? "bg-[#e0e7ff] text-black "
                      : "text-black hover:bg-gray-100 "
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setViewMode("calendar")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    viewMode === "calendar"
                      ? "bg-[#e0e7ff] text-black "
                      : "text-black hover:bg-gray-100 "
                  }`}
                >
                  Calendar View
                </button>
              </div>

              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search sessions..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500 bg-[#b4c0b2] text-black"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {viewMode === "list" ? (
              <div className=" shadow-md rounded-lg overflow-hidden ">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#faf3dd] ">
                    <thead className="bg-[#b4c0b2] ">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Session
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Date & Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Learner
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#faf3dd] divide-y divide-[#faf3dd] ">
                      {sessions?.upcoming?.map((session) => (
                        <tr key={session._id} className="align-sub">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-black">
                              {session.topic}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-black">
                              {new Date(session.scheduledAt).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </div>
                            <div className="text-sm text-gray-500 -400">
                              {session.time}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-black">
                              {session.learnerId.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                session.status === "Confirmed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : session.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                  : session.status === "Completed"
                                  ? "bg-gray-100 text-gray-800 dark:bg-gray-700 -300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}
                            >
                              {session.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {session.status !== "Completed" &&
                              session.status !== "Cancelled" && (
                                <div className="flex space-x-2">
                                 <a href={session.zoomJoinUrl} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
                               Join
                                 </a>
                                  <button
                                    className="text-black hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    onClick={() =>
                                      alert(
                                        `Reschedule session: ${session.title}`
                                      )
                                    }
                                  >
                                    Reschedule
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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
              <div className="bg-[#b4c0b2] shadow-md rounded-lg p-4">
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black">
                    Calendar View
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 -400">
                    Calendar integration coming soon. Your sessions will be
                    displayed here in calendar format.
                  </p>
                </div>
              </div>
            )}

            {/* Upcoming Sessions Overview */}
            <div className="bg-[#faf3dd] shadow-lg rounded-lg p-4">
              <h2 className="text-lg font-medium text-black mb-4">
                 
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#b4c0b2]  p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-black">
                        Today's Sessions
                      </p>
                      <p className="text-2xl font-bold text-black">
                        
                      </p>
                    </div>
                    <Calendar className="h-8 w-8  dark:text-indigo-900" />
                  </div>
                </div>

                <div className="bg-[#b4c0b2] p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-black">
                        This Week
                      </p>
                      <p className="text-2xl font-bold text-black ">
                        4
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-green-800" />
                  </div>
                </div>

                <div className="bg-[#b4c0b2] p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-black">
                        Total Learners
                      </p>
                      <p className="text-2xl font-bold text-black">
                        5
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile View */}
        {activeTab === "profile" && (
          <div className="bg-[#b4c0b2] shadow-md rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Avatar Section */}
              <div className="md:w-1/4 flex flex-col items-center mb-6 md:mb-0">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-[#faf3dd] mb-4">
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white dark:bg-gray-800 rounded-full"></button>
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
                      className="group px-4 py-2 bg-indigo-50 text-black  rounded-md text-sm font-medium flex items-center justify-center cursor-pointer"
                    >
                      <span className="group-hover:hidden">
                        Upload new photo
                      </span>
                      <Upload className="hidden group-hover:block h-5 w-5 text-black" />
                    </button>
                  </label>
                </div>
              </div>

              {/* Profile Form */}
              <div className="md:w-3/4">
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 bg-[#faf3dd] text-black"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        readOnly
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-[#faf3dd] text-black"
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        value={profileData.role}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            role: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-[#faf3dd] text-black"
                      />
                    </div>

                    {/* Subrole */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        Subrole
                      </label>
                      <input
                        type="text"
                        value={profileData.subrole}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            subrole: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-[#faf3dd] text-black"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={profileData.country}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            country: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-[#faf3dd] text-black"
                      />
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        Language
                      </label>
                      <input
                        type="text"
                        value={profileData.language}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            language: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-[#faf3dd] text-black"
                      />
                    </div>

                    {/* Service Type */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        Service Type
                      </label>
                      <input
                        type="text"
                        value={profileData.serviceType}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            serviceType: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-[#faf3dd] text-black"
                      />
                    </div>

                    {/* Payout Method */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        Payout Method
                      </label>
                      <input
                        type="text"
                        value={profileData.payoutMethod}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            payoutMethod: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-[#faf3dd] text-black"
                      />
                    </div>

                    {/* UPI ID */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        value={profileData.upiID}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            upiID: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-[#faf3dd] text-black"
                      />
                    </div>

                    {/* Approved */}
                    <div className="flex items-center space-x-2 mt-4">
                      <input
                        type="checkbox"
                        checked={profileData.Approved}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            Approved: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-black border-gray-300 rounded"
                      />
                      <label className="text-sm text-black">
                        Approved
                      </label>
                    </div>

                    {/* Experience */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-black mb-1">
                        Experience
                      </label>
                      <textarea
                        value={profileData.experience}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            experience: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-[#faf3dd] text-black"
                        rows={2}
                      />
                    </div>

                    {/* Bio */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-black mb-1">
                        Bio
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            bio: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-[#faf3dd] text-black"
                        rows={4}
                      />
                    </div>
                  </div>
              <div className=" flex justify-end  item-center gap-5">
              <FaUserEdit className=" text-4xl cursor-pointer text-white" />
                  <button onSubmit={()=>{handleProfileUpdate(profileData)}}
                    type="submit"
                    disabled= {true}
                    className="px-6 py-2 bg-gray-500 cursor-not-allowed text-white rounded-md font-medium "
                  >
                    Save Profile
                  </button>
              </div>
                </form>
              </div>
            </div>
          </div>
        )}


{activeTab === "Community Chat" && (
          <div className=" w-[50%]">
            <GroupChat  className='w-[50%]'/>
          </div>
        )}

 {activeTab === "payment" && (
        <div className="p-4 md:p-6 max-w-md mx-auto bg-[#faf3dd] rounded-2xl shadow-md border mt-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Session Fee</h2>

          {!isEditing ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-lg font-medium">
                <LuPoundSterling className="text-gray-600 mr-1" />
                {sessionFee}
              </div>
              <button
                onClick={() => {
                  setTempFee(sessionFee);
                  setIsEditing(true);
                }}
                className="text-sm bg-[#f2c078] hover:bg-[#d0a871] text-black cursor-pointer px-4 py-2 rounded-lg transition"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                value={tempFee}
                onChange={(e) => setTempFee(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter new session fee"
              />
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-sm bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-800 px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="text-sm bg-green-900 hover:bg-green-950 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                  <FaCheck />
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}
        {activeTab === "AIbot" && (
          <div className="">
            <AIChat />
          </div>
        )}
        {activeTab === "Wallet" &&(
         <EducatorWallet wallet={profileData.wallet} />
        )}
      </div>
    </div>
  );
}

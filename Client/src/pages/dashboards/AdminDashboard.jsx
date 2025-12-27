import { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  BookOpen,
  Settings,
  Search,
  ChevronDown,
  Check,
  X,
  Trash2,
  Menu,
} from "lucide-react";
import { LuPoundSterling } from "react-icons/lu";
import { CreditCard, Clock, Filter,  MoreVertical, CheckCircle, XCircle } from 'lucide-react';
import { IoWalletOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";
import axios from "axios";
import API from "../../common/apis/ServerBaseURL.jsx";
import UserDetailsList from "../../components/Dashboard/admin/UserDetailsList.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/slices/userSlice.jsx";
import GroupChat from "../../components/Chat/GroupChat.jsx";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../components/Global/Loader.jsx";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../../utils/Notification.jsx";
import "react-toastify/dist/ReactToastify.css";

// Main App Component
export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const [educators, setEducators] = useState([]);
  const [pendingEducators, setPendingEducators] = useState([]);
  const [approvedEducators, setApprovedEducators] = useState([]);
  const [learners, setLearners] = useState([]);
  const [subscriptionFee, setSubscriptionFee] = useState(49.99);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [email , setEmail] = useState("");
  const [role , setRole] = useState("");
  const [loader , SetLoader] = useState(false)
const [expandedRequestId, setExpandedRequestId] = useState(null);
  const [withdrawalRequestsData , setWithdrawalRequestsData] = useState([])


  // State variables 
const [revenueData, setRevenueData] = useState([]);
const [completeRevenueData, setCompleteRevenueData] = useState([]);
const [totalRevenue, setTotalRevenue] = useState(0);
const [monthlyRevenue, setMonthlyRevenue] = useState(0);
const [revenueLoading, setRevenueLoading] = useState(true);
const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
const [availableYears, setAvailableYears] = useState([]);

const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [deleteTarget, setDeleteTarget] = useState({ email: '', role: '' });
  
  // Calculate stats
  const totalEducators = educators.length;
  const totalLearners = learners.length;
  

  const [viewUserDetails, setViewUserDetails] = useState(false);

  // filter educator
  useEffect(() => {
    const FilterEducators = () => {
      const filterPendingEducators = educators.filter(
        (educators) => educators.Approved === false
      );
      setPendingEducators(filterPendingEducators);

      const filterApprovedEducators = educators.filter(
        (educators) => educators.Approved === true
      );
      setApprovedEducators(filterApprovedEducators);
    };
    FilterEducators();
  }, [educators]);

  // Handle body overflow
  useEffect(() => {
  if (viewUserDetails) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  return () => {
    document.body.style.overflow = 'unset';
  };
}, [viewUserDetails]);



  const SidebarItem = ({ icon, label, active, onClick, }) => (
    <li
      onClick={onClick}
      className={`flex items-center p-2 cursor-pointer rounded-md transition 
        ${
          active
            ? "bg-indigo-100  text-indigo-800 "
            : "text-gray-700 "
        }
        hover:bg-indigo-200 `}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </li>
  );

  const StatCard = ({ title, value, icon, loading }) => (
  <div className="bg-[#b4c0b2] p-4 rounded-lg shadow flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-black">{title}</p>
      {loading ?  (
        <div className="animate-pulse h-8 w-20 bg-gray-300 rounded mt-1"></div>
      ) : (
        <p className="text-2xl font-bold text-black">{value}</p>
      )}
    </div>
    <div>{icon}</div>
  </div>
);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // fetching all educator data
  const fetchEducatorsData = async () => {
    try {
      const response = await axios.post(API.educatorsData.url, {},{
        withCredentials:true
      });

      if (response.status === 200) {
        setEducators(response.data.data);
      }
    } catch (error) {
      console.log("error in fetching data of educator:", error);
      showErrorToast(`${error.response.data.message}`)
    }
  };

  useEffect(() => {
  if (user?.userData?.user?._id) {
    fetchEducatorsData();
    fetchLearnersData();
    fetchRevenueData();  
  }
}, [user]);

  const fetchEducatorsDetailedData = async (email , role) => {
        setEmail(email);
        setRole(role);
        setViewUserDetails(true);
  };

  // fetching learner data
  const fetchLearnersData = async () => {
    try {
      const response = await axios.post(API.learnersData.url, {}, {
        
        withCredentials:true
      });
      if (response.status === 200) {
        setLearners(response.data.data);
      }
    } catch (error) {
      console.log("error in fetching data of educator:", error);
    }
  };
  useEffect(() => {
    if (user?.userData?.user?._id) {
      fetchLearnersData();
    }
  }, [user]);

  //  approve user
  const approveEducator = async (email) => {
    SetLoader(true)
    try {
      const response = await axios.patch(API.approveEducator.url, {email: email} , {
        withCredentials:true
      });

      if (response.status === 200) {
        SetLoader(false)
        showSuccessToast('Educator Approved successfully')
        fetchEducatorsData(); 
      }
      console.log("response approve", response);
    } catch (error) {
      SetLoader(false)
      showErrorToast(error.response.data.message)
      console.log("approve error", error);
    }
  };

  //  delete user
  const deleteUser = async (email, role) => {
    try {
      SetLoader(true)
      const response = await axios.delete(API.deleteUser.url, {
        params: {
          email: email,
          role: role,
        },
        withCredentials:true
      });

      if (response.status === 200) {
        SetLoader(false)
        showSuccessToast("user Deleted successfully")
        fetchEducatorsData();
        fetchLearnersData();
      }
    } catch (error) {
      SetLoader(false)
      showErrorToast(`${response.message}`)
      console.log(error);
    }
  };

  // getWithdrawelRequests
const getWithdrawelRequests = async() =>{
  try {
    const response = await axios.get(API.fetchWithdrawelRequests.url,{
      withCredentials:true
    })
    if(response.status === 200){
      console.log(response,"getWithdrawelRequests");
      setWithdrawalRequestsData(response.data)
    }
  } catch (error) {
    console.log(error);
  }
}


  // Generate complete 12 months data with 0 for missing months
  const generateCompleteRevenueData = (revenueData) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Create a map of existing revenue data
    const revenueMap = {};
    if (revenueData && Array.isArray(revenueData)) {
      revenueData.forEach(item => {
        revenueMap[item.month] = item.revenue || 0;
      });
    }
    
    // Generate complete 12 months array
    return months.map(month => ({
      month,
      revenue:  revenueMap[month] || 0
    }));
  };

 
  //  Fetch Revenue Data from Backend
  const fetchRevenueData = async (year = selectedYear) => {
    setRevenueLoading(true);
    try {
      const response = await axios.get(`${API.getRevenueData. url}?year=${year}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const { revenueChart, totalRevenue, monthlyRevenue, currentYear, availableYears } = response. data. data;
        
        // Set original data
        setRevenueData(revenueChart || []);
        
        // Generate complete 12 months data
        const completeData = generateCompleteRevenueData(revenueChart);
        setCompleteRevenueData(completeData);
        
        setTotalRevenue(totalRevenue || 0);
        setMonthlyRevenue(monthlyRevenue || 0);
        setSelectedYear(currentYear);
        setAvailableYears(availableYears || [new Date().getFullYear()]);
        
        console.log("✅ Revenue Data Loaded for year:", currentYear);
      }
    } catch (error) {
      console.error("Error fetching revenue:", error);
      showErrorToast("Failed to fetch revenue data");
      
      const emptyData = generateCompleteRevenueData([]);
      setRevenueData([]);
      setCompleteRevenueData(emptyData);
      setTotalRevenue(0);
      setMonthlyRevenue(0);
    } finally {
      setRevenueLoading(false);
    }
  };

// ✅ Handle Year Change
const handleYearChange = (year) => {
  setSelectedYear(year);
  fetchRevenueData(year);
};
  
   
   const handlePayout = async(requestId, action)=>{
  SetLoader(true);
  try {
    const response = await axios.post(
      API.processWithdrawRequest.url,
      {requestId, action},
      {withCredentials: true}
    );
    
    if (response.status === 200) {
      showSuccessToast(`Withdrawal request ${action}d successfully`);
      await getWithdrawalRequests();
      await fetchRevenueData(); 
    }
  } catch (error) {
    console.error(error);
    showErrorToast("Failed to process payout");
  } finally {
    SetLoader(false);
  }
}
  return (

    <div className=" w-[100vw] min-h-screen flex max-w-[1680px] mx-auto ">
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
      />
      {
        loader && (
          <Loader />
        )
      }
       
       {/* // User Details Modal */}
       {
          viewUserDetails && (
            <>
              {/* Overlay Background */}
              <div 
                className="fixed inset-0 z-40  bg-opacity-60 backdrop-blur-sm"
                onClick={() => setViewUserDetails(false)}
              />
              
              {/* Modal Content */}
              <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4">
                <div className="relative pb-4 w-full max-w-6xl my-8 bg-white rounded-xl shadow-2xl">
                  {/* Header with Actions */}
                  <div className="top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
                    {/* Title */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">User Details</h3>
                        <p className="text-sm text-gray-500 capitalize">{role}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {/* Delete Button */}
                      <button 
                        onClick={() => {
                          setDeleteTarget({ email, role });
                          setShowDeleteConfirm(true);
                        }}
                        className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border border-red-200 hover:border-red-300"
                        title="Delete User Permanently"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>

                      {/* Close Button */}
                      <button 
                        onClick={() => setViewUserDetails(false)} 
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Close
                      </button>
                    </div>
                  </div>
                  
                  {/* User Details */}
                  <div className="pb-6">
                    <UserDetailsList userEmail={email} role={role} />
                  </div>

                  {/* ✅ Modern Delete Confirmation Modal */}
                  {showDeleteConfirm && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20 rounded-xl p-4">
                      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all animate-slideUp">
                        {/* Warning Icon */}
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                          Delete User Permanently? 
                        </h3>
                        <p className="text-sm text-gray-600 text-center mb-6">
                          This action cannot be undone. All user data will be permanently removed.
                        </p>

                        {/* User Info Card */}
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <p className="text-sm font-semibold text-gray-800 capitalize">{deleteTarget.role}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <p className="text-sm text-gray-700 break-all">{deleteTarget.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => setShowDeleteConfirm(false)}
                            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              deleteUser(deleteTarget.email, deleteTarget.role);
                              setShowDeleteConfirm(false);
                              setViewUserDetails(false);
                            }}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )
        }
        
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex relative left-0 min-h-screen w-64 bg-[#f2c078] shadow-md flex-col">
        <div className="p-4 flex items-center space-x-2">
          <BookOpen className="h-8 w-8  " />
          <h1 className="text-xl font-bold ">Admin Tools</h1>
        </div>

        <nav className="flex-1 p-4 text-black">
          <ul className="space-y-2 text-bl">
            <SidebarItem
              icon={<BookOpen size={20} />}
              label="Dashboard"
              active={activeView === "dashboard"}
              onClick={() => setActiveView("dashboard")}

            />
            <SidebarItem
              icon={<Users size={20} />}
              label="Educators"
              active={activeView === "educators"}
              onClick={() => setActiveView("educators")}

            />
            <SidebarItem
              icon={<Users size={20} />}
              label="Learners"
              active={activeView === "learners"}
              onClick={() => setActiveView("learners")}

            />
            <SidebarItem
              icon={<LuPoundSterling size={20} />}
              label="Revenue"
              active={activeView === "revenue"}
              onClick={() => setActiveView("revenue")}

            />
            <SidebarItem
              icon={<IoWalletOutline size={20} />}
              label="Withdrawel Requests"
              active={activeView === "withdrawelRequests"}
              onClick={() => {
                setActiveView("withdrawelRequests") 
                getWithdrawelRequests()
              }}

            />
            <SidebarItem
              icon={<CiChat1 size={20} />}
              label="Community Chat"
              active={activeView === "communityChat"}
              onClick={() => setActiveView("communityChat")}

            />
            <SidebarItem
              icon={<Settings size={20} />}
              label="Settings"
              active={activeView === "settings"}
              onClick={() => setActiveView("settings")}

            />
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top- left-">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-gray-200 "
        >
            <Menu size={24} className="text-black " />
         
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 inset-0 z-20 bg-opacity-50 backdrop-blur-sm">
          <div className="h-full w-64 bg-[#f2c078] hadow-lg p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-black " />
                <h1 className="text-lg font-bold ">EduAdmin</h1>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} className="text-black" />
              </button>
            </div>

            <nav>
              <ul className="space-y-2">
                <SidebarItem
                  icon={<BookOpen size={20} />}
                  label="Dashboard"
                  active={activeView === "dashboard"}
                  onClick={() => {
                    setActiveView("dashboard");
                    setMobileMenuOpen(false);
                  }}

                />
                <SidebarItem
                  icon={<Users size={20} />}
                  label="Educators"
                  active={activeView === "educators"}
                  onClick={() => {
                    setActiveView("educators");
                    setMobileMenuOpen(false);
                  }}

                />
                <SidebarItem
                  icon={<Users size={20} />}
                  label="Learners"
                  active={activeView === "learners"}
                  onClick={() => {
                    setActiveView("learners");
                    setMobileMenuOpen(false);
                  }}

                />
                <SidebarItem
                  icon={<LuPoundSterling size={20} />}
                  label="Revenue"
                  active={activeView === "revenue"}
                  onClick={() => {
                    setActiveView("revenue");
                    setMobileMenuOpen(false);
                  }}

                />
                <SidebarItem
                  icon={<IoWalletOutline size={20} />}
                  label="Withdrawel Requests"
                  active={activeView === "withdrawelRequests"}
                  onClick={() => {
                    setActiveView("withdrawelRequests");
                    setMobileMenuOpen(false);
                  }}

                />
                <SidebarItem
                  icon={<CiChat1 size={20} />}
                  label="Community Chat"
                  active={activeView === "communityChat"}
                  onClick={() => {
                    setActiveView("communityChat");
                    setMobileMenuOpen(false);
                  }}

                />
                <SidebarItem
                  icon={<Settings size={20} />}
                  label="Settings"
                  active={activeView === "settings"}
                  onClick={() => {
                    setActiveView("settings");
                    setMobileMenuOpen(false);
                  }}

                />
              </ul>
            </nav>
          </div>
        </div>
      )}
      {/* top bar */}
      <div className=" grow-1 min-h-screen bg-[#faf3dd] p-5">
        <div className=" shadow rounded-lg mb-4 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold ">
              {activeView === "dashboard" && "Dashboard"}
              {activeView === "educators" && "Educators Management"}
              {activeView === "learners" && "Learners Management"}
              {activeView === "revenue" && "Revenue Overview"}
              {activeView === "settings" && "Subscription Settings"}
              {activeView === "withdrawelRequests" && "withdrawel Requests"}
              {activeView === "communityChat" && "Community Chat"}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 ">
             <Link to={'/'}>
             <MdHome  size={20} className="text-black  cursor-pointer" />
             </Link>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                A
              </div>
              <span className="text-sm font-medium hidden sm:block ">
                {user.userData.user.name}
              </span>
            </div>
          </div>
        </div>

        {/* dashboard */}

        {activeView === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Educators"
                value={totalEducators}
                icon={<Users className="h-8 w-8 text-indigo-500" />}
                loading={false}
              />
              <StatCard
                title="Pending Requests"
                value={pendingEducators. length}
                icon={<Users className="h-8 w-8 text-yellow-900" />}
                loading={false}
              />
              <StatCard
                title="Total Learners"
                value={totalLearners}
                icon={<Users className="h-8 w-8 text-green-900" />}
                loading={false}
              />
              <StatCard
                title="Monthly Revenue"
                value={`£${monthlyRevenue.toFixed(2)}`}
                icon={<LuPoundSterling className="h-8 w-8 text-blue-500" />}
                loading={revenueLoading}
              />
            </div>

            {/* Revenue Chart - Complete 12 Months */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              {/* Chart Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Annual Revenue Overview
                  </h3>
                  <p className="text-sm text-gray-500">
                    Complete 12-month revenue breakdown for {new Date().getFullYear()}
                  </p>
                </div>
                
                {/* Refresh Button */}
                <button
                  onClick={fetchRevenueData}
                  disabled={revenueLoading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    revenueLoading
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      :  'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:shadow-md'
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${revenueLoading ? 'animate-spin' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {revenueLoading ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              {/* Chart Content */}
              {revenueLoading ? (
                <div className="h-96 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <LuPoundSterling className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 font-medium">Loading revenue data...</p>
                </div>
              ) : (
                <>
                  {/* Summary Stats Above Chart */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                      <p className="text-xs font-medium text-green-600 uppercase tracking-wider mb-1">
                        Total Revenue
                      </p>
                      <p className="text-2xl font-bold text-green-700 flex items-center">
                        <LuPoundSterling className="h-5 w-5 mr-1" />
                        {totalRevenue.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                      <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">
                        This Month
                      </p>
                      <p className="text-2xl font-bold text-blue-700 flex items-center">
                        <LuPoundSterling className="h-5 w-5 mr-1" />
                        {monthlyRevenue.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                      <p className="text-xs font-medium text-purple-600 uppercase tracking-wider mb-1">
                        Average/Month
                      </p>
                      <p className="text-2xl font-bold text-purple-700 flex items-center">
                        <LuPoundSterling className="h-5 w-5 mr-1" />
                        {totalRevenue > 0 ? (totalRevenue / 12).toFixed(2) : '0.00'}
                      </p>
                    </div>
                  </div>

                  {/* Main Chart - Always Shows 12 Months */}
                  <div className="h-96 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={completeRevenueData}
                        margin={{ top: 10, right: 30, left:  10, bottom: 5 }}
                      >
                        {/* Gradient Definition */}
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05}/>
                          </linearGradient>
                        </defs>
                        
                        {/* Grid Lines */}
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        
                        {/* X Axis - All 12 Months */}
                        <XAxis 
                          dataKey="month" 
                          stroke="#6b7280"
                          style={{ fontSize: '12px', fontWeight: '600' }}
                          tickLine={false}
                          axisLine={{ stroke: '#d1d5db', strokeWidth: 2 }}
                          interval={0}
                          angle={0}
                          textAnchor="middle"
                        />
                        
                        {/* Y Axis */}
                        <YAxis 
                          stroke="#6b7280"
                          style={{ fontSize:  '12px', fontWeight: '500' }}
                          tickLine={false}
                          axisLine={{ stroke: '#d1d5db', strokeWidth: 2 }}
                          tickFormatter={(value) => `£${value}`}
                          domain={[0, 'auto']}
                        />
                        
                        {/* Enhanced Tooltip */}
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '2px solid #6366f1',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(99, 102, 241, 0.2)',
                            padding: '12px 16px',
                          }}
                          labelStyle={{
                            color: '#1f2937',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            marginBottom: '8px',
                          }}
                          itemStyle={{
                            color: '#6366f1',
                            fontSize: '16px',
                            fontWeight: '600',
                          }}
                          formatter={(value, name, props) => {
                            const hasRevenue = value > 0;
                            return [
                              `£${value.toFixed(2)}`,
                              hasRevenue ? 'Revenue' : 'No Revenue'
                            ];
                          }}
                          cursor={{ 
                            stroke: '#6366f1', 
                            strokeWidth: 2, 
                            strokeDasharray: '5 5',
                            fill: 'rgba(99, 102, 241, 0.05)'
                          }}
                        />
                        
                        {/* Legend */}
                        <Legend 
                          wrapperStyle={{
                            paddingTop: '20px',
                            fontSize: '14px',
                            fontWeight:  '500',
                          }}
                          iconType="circle"
                        />
                        
                        {/* Line with Area Fill */}
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#6366f1"
                          strokeWidth={3}
                          dot={(props) => {
                            const { cx, cy, payload } = props;
                            const hasRevenue = payload. revenue > 0;
                            return (
                              <circle
                                cx={cx}
                                cy={cy}
                                r={hasRevenue ? 6 : 4}
                                fill={hasRevenue ? '#6366f1' : '#d1d5db'}
                                stroke="#ffffff"
                                strokeWidth={3}
                              />
                            );
                          }}
                          activeDot={{ 
                            r: 8,
                            fill: '#6366f1',
                            stroke:  '#ffffff',
                            strokeWidth: 3,
                          }}
                          name="Revenue (£)"
                          connectNulls={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Chart Footer Info */}
                  <div className="mt-6 space-y-3">
                    {/* Month-wise breakdown */}
                    <div className="flex flex-wrap gap-2">
                      {completeRevenueData. map((item) => (
                        <div
                          key={item.month}
                          className={`px-3 py-1. 5 rounded-full text-xs font-medium ${
                            item.revenue > 0
                              ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                              : 'bg-gray-100 text-gray-500 border border-gray-200'
                          }`}
                        >
                          {item. month}:  £{item.revenue.toFixed(0)}
                        </div>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                          <span>Revenue Generated</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                          <span>No Revenue</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Last updated: {new Date().toLocaleString()}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeView === "withdrawelRequests" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Withdrawal Stats Summary */}
            <StatCard
              title="Pending Withdrawals"
              value={withdrawalRequestsData.length}
              icon={<Clock className="h-8 w-8 text-orange-500" />}
            />
            <StatCard
              title="Processing Time"
              value="24 hrs"
              icon={<Clock className="h-8 w-8 text-blue-500" />}
            />
            
            {/* Withdrawal Requests Table */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4  rounded-lg shadow mb-6">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 ">
                <h3 className="text-lg font-semibold ">Withdrawal Requests</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search requests..."
                      className="pl-8 pr-4 py-2 border border-gray-300  rounded-lg text-sm bg-gray-50  text-gray-900 "
                    />
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <button className="flex items-center gap-1 px-3 py-2 border border-gray-300  rounded-lg text-sm bg-white  text-gray-700 ">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`text-xs uppercase bg-gray-100 text-gray-700`}>
                    <tr>
                      <th className="px-4 py-3 text-left">Request ID</th>
                      <th className="px-4 py-3 text-left">Educator Name</th>
                      <th className="px-4 py-3 text-left">Amount</th>
                      <th className="px-4 py-3 text-left">Request Date</th>
                      <th className="px-4 py-3 text-left">payoutMethod</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 ">
                    {withdrawalRequestsData?.map((request) => (
                      <tr key={request.id} className={`hover:bg-[#b4c0b2]`}>
                        <td className="px-4 py-3 text-sm ">{request._id}</td>
                        <td className="px-4 py-3 text-sm ">{request.educator.name}</td>
                        <td className="px-4 py-3 text-sm font-medium  flex items-center">< LuPoundSterling />{request.amount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm "> {new Date(request.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-sm ">{request.educator.payoutMethod}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full  font-bold text-xl text-yellow-300 `}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <div className="flex justify-end items-center gap-2">
                            {request.status === 'pending' && (
                              <>
                                <button onClick={()=>{handlePayout(request?._id , "approve")}} className="p-1 rounded-full text-green-600 hover:bg-green-100 ">
                                  <CheckCircle className="h-5 w-5" />
                                </button>
                                <button className="p-1 rounded-full text-red-600 hover:bg-red-100 ">
                                  <XCircle className="h-5 w-5" />
                                </button>
                              </>
                            )}
        <button
                  onClick={() =>
                    setExpandedRequestId(expandedRequestId === request._id ? null : request._id)
                  }
                  className="p-1 rounded-full text-black hover:bg-gray-100"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>

                {expandedRequestId === request._id && (
                  <div className="absolute right-0 mt-2 z-10 flex flex-col w-40 bg-[#b4c0b2] rounded shadow-md p-4 space-y-2">
                    <button
                      onClick={() => setExpandedRequestId(null)}
                      className="text-xs text-red-600 self-end hover:underline cursor-pointer"
                    >
                      Close
                    </button>
                    <button className="cursor-pointer hover:text-[#2b7fff]">Mark As Paid</button>
                    <button className="cursor-pointer hover:text-[#2b7fff]"
                    onClick={() => fetchEducatorsDetailedData(request.educator.email , "educator")}
                    >View Details</button>
                  </div>
                )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center p-4 border-t border-gray-200 ">
                <p className="text-sm text-black ">
                  Showing <span className="font-medium">5</span> of{" "}
                  <span className="font-medium">42</span> requests
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border border-gray-300  rounded text-sm bg-white  text-gray-700 ">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-gray-300  rounded text-sm bg-indigo-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300  rounded text-sm bg-white  text-gray-700 ">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300  rounded text-sm bg-white  text-gray-700 ">
                    3
                  </button>
                  <button className="px-3 py-1 border border-gray-300  rounded text-sm bg-white  text-gray-700 ">
                    Next
                  </button>
                </div>
              </div>
            </div> 
          </div>
        )}

        {/* educator view */}

        {activeView === "educators" && (
          <div className=" flex flex-col gap-10 ">
          {/* approved educator */}
          <div className=" p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 ">
            Approved Educator
            </h3>
            <div className="overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-gray-200 ">
            <thead className="bg-gray-50 ">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider  w-1/5 break-words">Name</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider  w-1/5 break-words">Email</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider  w-1/5 break-words">Sub-Role</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider  w-1/5 break-words">Country</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider  w-1/5 break-words">Join Date</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider  w-1/5 break-words">Action</th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200 ">
              {approvedEducators.map((educator) => (
                <tr key={educator.id} className="align-top">
                  <td className="px-3 py-4 text-sm font-medium text-gray-900  break-words  text-start">{educator.name}</td>
                  <td className="px-3 py-4 text-sm text-black  break-words  text-start">{educator.email}</td>
                  <td className="px-3 py-4 text-sm text-black  break-words  text-start">{educator.subrole}</td>
                  <td className="px-3 py-4 text-sm text-black  break-words text-start">{educator.country}</td>
                  <td className="px-3 py-4 text-sm text-black  break-words text-start">{new Date(educator.createdAt).toLocaleDateString()}</td>
                  <td
                    onClick={() => fetchEducatorsDetailedData(educator.email , educator.role)}
                    className="px-3 py-4 text-sm text-green-700  cursor-pointer break-words"
                  >
                    View
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          </div>
          <div className=" p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 ">
              Pending Educator Requests
            </h3>
            <div className="overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-gray-200 ">
                <thead className="bg-gray-50 ">
                  <tr >
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider w-1/5 break-words"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider w-1/5 break-words"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider w-1/5 break-words"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider w-1/5 break-words"
                    >
                      Request Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider w-1/5 break-words"
                    >
                      Actions
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider w-1/5 break-words"
                    >
                      View Details
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200 ">
                  {pendingEducators && pendingEducators.length > 0 ? (
                    pendingEducators.map((educator) => (
                      <tr key={educator.id} className="align-top">
                        <td className="px-3 py-4 text-sm font-medium text-gray-900  break-words  text-start">
                          {educator.name}
                        </td>
                        <td className="px-3 py-4 text-sm font-medium text-gray-900  break-words  text-start">
                          {educator.email}
                        </td>
                        <td className="px-3 py-4 text-sm font-medium text-gray-900  break-words  text-start">
                          {educator.role}
                        </td>
                        <td className="px-3 py-4 text-sm font-medium text-gray-900  break-words  text-start">
                          {new Date(educator.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => approveEducator(educator.email)}
                              className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => deleteUser(educator.email, educator.role)}
                              className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                        <td
                          onClick={() => {
                            fetchEducatorsDetailedData(educator.email , educator.role);
                          }}
                          className="px-3 py-4 text-sm  text-green-500 cursor-pointer break-words  text-start"
                        >
                          View
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-center text-sm text-black "
                      >
                        No pending requests
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          </div>
        )}

        {/* learner view */}

        {activeView === "learners" && (
          <div className=" p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold ">
                Learners Management
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search learners..."
                  className="pl-8 pr-4 py-2 rounded-lg border border-gray-300    focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed divide-y divide-gray-200 ">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider  w-1/5 break-words"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider  w-1/5 break-words"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider  w-1/5 break-words"
                    >
                      Join Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider  w-1/5 break-words"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200 ">
                  {learners.map((learner) => (
                    <tr key={learner.id} className="align-top">
                      <td className="px-3 py-4 text-sm font-medium text-gray-900  break-words  text-start">
                        {learner.name}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-gray-900  break-words  text-start">
                        {learner.email}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-gray-900  break-words  text-start">
                        {new Date(learner.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-4 font-medium text-gray-900  break-words  text-start ">
                      <div className=" flex space-x-2">
                          <button
                          onClick={() => deleteUser(learner.email)}
                          className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition cursor-pointer "
                          title="Delete learner"
                        >
                          <Trash2 size={20} />
                        </button>
                        <button
                         onClick={() => fetchEducatorsDetailedData(learner.email, learner.role)}
                          className="p-1 text-green-800    transition cursor-pointer "
                          title="Delete learner"
                        >
                          view
                        </button>
                      </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Revenue View */}
      {activeView === "revenue" && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Total Revenue"
              value={`£${totalRevenue.toFixed(2)}`}
              icon={<LuPoundSterling className="h-8 w-8 text-green-500" />}
              loading={revenueLoading}
            />
            <StatCard
              title="Monthly Revenue"
              value={`£${monthlyRevenue.toFixed(2)}`}
              icon={<LuPoundSterling className="h-8 w-8 text-blue-500" />}
              loading={revenueLoading}
            />
            <StatCard
              title="Active Subscriptions"
              value={totalLearners}
              icon={<Users className="h-8 w-8 text-indigo-500" />}
              loading={false}
            />
          </div>

          {/* Main Revenue Chart */}
          <div className="p-6 rounded-xl shadow-lg bg-white border border-gray-100">
            {/* ✅ Simplified Header - Only Year Selector & Refresh */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Revenue Trend - {selectedYear}
                </h3>
                <p className="text-sm text-gray-500">
                  Complete 12-month breakdown
                </p>
              </div>

              {/* ✅ Year Selector & Refresh Only */}
              <div className="flex items-center gap-3">
                {/* Year Selector Dropdown */}
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => handleYearChange(parseInt(e.target.value))}
                    disabled={revenueLoading}
                    className={`appearance-none pl-4 pr-10 py-2. 5 rounded-lg text-sm font-semibold transition-all border-2 min-w-[120px] ${
                      revenueLoading
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 cursor-pointer'
                    }`}
                  >
                    {availableYears.length > 0 ? (
                      availableYears.map(year => (
                        <option key={year} value={year}>
                          Year {year}
                        </option>
                      ))
                    ) : (
                      <option value={selectedYear}>Year {selectedYear}</option>
                    )}
                  </select>
                  {/* Dropdown Icon */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={() => fetchRevenueData(selectedYear)}
                  disabled={revenueLoading}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    revenueLoading
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      :  'bg-green-50 text-green-600 hover:bg-green-100 hover:shadow-md border-2 border-green-200'
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${revenueLoading ?  'animate-spin' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {revenueLoading ? 'Loading...' : 'Refresh'}
                </button>
              </div>
            </div>
            
            {/* Chart Loading State */}
            {revenueLoading ?  (
              <div className="h-96 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LuPoundSterling className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600 font-medium">
                  Loading {selectedYear} revenue data...
                </p>
              </div>
            ) : (
              <>
                {/* Chart Area */}
                <div className="h-96 bg-gradient-to-br from-gray-50 to-green-50 rounded-lg p-4 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={completeRevenueData}
                      margin={{ top: 10, right: 30, left:  10, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="colorRevenue2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                      
                      <XAxis 
                        dataKey="month" 
                        stroke="#6b7280"
                        style={{ fontSize: '12px', fontWeight: '600' }}
                        tickLine={false}
                        axisLine={{ stroke: '#d1d5db', strokeWidth:  2 }}
                        interval={0}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        style={{ fontSize: '12px', fontWeight: '500' }}
                        tickLine={false}
                        axisLine={{ stroke: '#d1d5db', strokeWidth: 2 }}
                        tickFormatter={(value) => `£${value}`}
                        domain={[0, 'auto']}
                      />
                      
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '2px solid #10b981',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.2)',
                          padding: '12px 16px',
                        }}
                        labelStyle={{
                          color: '#1f2937',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        }}
                        itemStyle={{
                          color:  '#10b981',
                          fontSize: '16px',
                          fontWeight: '600',
                        }}
                        formatter={(value) => [`£${value. toFixed(2)}`, value > 0 ? 'Revenue' : 'No Revenue']}
                        cursor={{ 
                          stroke: '#10b981', 
                          strokeWidth: 2, 
                          strokeDasharray: '5 5',
                        }}
                      />
                      
                      <Legend />
                      
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={(props) => {
                          const { cx, cy, payload } = props;
                          const hasRevenue = payload.revenue > 0;
                          return (
                            <circle
                              cx={cx}
                              cy={cy}
                              r={hasRevenue ? 6 : 4}
                              fill={hasRevenue ? '#10b981' : '#d1d5db'}
                              stroke="#ffffff"
                              strokeWidth={3}
                            />
                          );
                        }}
                        activeDot={{ r: 8 }}
                        name="Revenue (£)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Footer - Month-wise Breakdown */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-700">
                      Monthly Breakdown - {selectedYear}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {completeRevenueData. filter(item => item.revenue > 0).length} / 12 months with revenue
                    </span>
                  </div>

                  {/* Month Chips */}
                  <div className="flex flex-wrap gap-2">
                    {completeRevenueData.map((item) => (
                      <div
                        key={item.month}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105 ${
                          item.revenue > 0
                            ? 'bg-green-100 text-green-700 border-2 border-green-200 shadow-sm'
                            : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                        }`}
                      >
                        <div className="font-bold">{item.month}</div>
                        <div className="text-xs mt-0.5">£{item.revenue.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Footer Legend */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
                        <span className="font-medium">Revenue Generated</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <span className="font-medium">No Revenue</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Last updated:  {new Date().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-200">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-100">
                      <p className="text-xs text-green-600 font-medium mb-1">Highest Month</p>
                      <p className="text-lg font-bold text-green-700">
                        {completeRevenueData.reduce((max, item) => 
                          item.revenue > max. revenue ? item : max
                        ).month}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        £{Math.max(...completeRevenueData.map(item => item. revenue)).toFixed(2)}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
                      <p className="text-xs text-blue-600 font-medium mb-1">Active Months</p>
                      <p className="text-lg font-bold text-blue-700">
                        {completeRevenueData. filter(item => item.revenue > 0).length}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">out of 12</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-100">
                      <p className="text-xs text-purple-600 font-medium mb-1">Avg Revenue</p>
                      <p className="text-lg font-bold text-purple-700">
                        £{totalRevenue > 0 ? (totalRevenue / 12).toFixed(2) : '0.00'}
                      </p>
                      <p className="text-xs text-purple-600 mt-1">per month</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-3 rounded-lg border border-orange-100">
                      <p className="text-xs text-orange-600 font-medium mb-1">Growth Rate</p>
                      <p className="text-lg font-bold text-orange-700">
                        {(() => {
                          const activeMonths = completeRevenueData.filter(item => item. revenue > 0);
                          if (activeMonths.length < 2) return 'N/A';
                          const first = activeMonths[0]. revenue;
                          const last = activeMonths[activeMonths.length - 1].revenue;
                          const growth = first > 0 ? ((last - first) / first * 100).toFixed(1) : 0;
                          return `${growth > 0 ? '+' : ''}${growth}%`;
                        })()}
                      </p>
                      <p className="text-xs text-orange-600 mt-1">vs start</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

        {activeView === "communityChat" && (
          <div className=" w-[100%]">
            <GroupChat />
          </div>
        )}
      </div>
    </div>
  );
}

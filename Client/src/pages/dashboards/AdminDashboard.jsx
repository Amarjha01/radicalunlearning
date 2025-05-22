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
  console.log('khsjhf', email , role);
  
  const [withdrawalRequestsData , setWithdrawalRequestsData] = useState([])
  
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

  const StatCard = ({ title, value, icon, }) => (
    <div className="bg-[#b4c0b2]  p-4 rounded-lg shadow flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-black ">
          {title}
        </p>
        <p className="text-2xl font-bold text-black ">
          {value}
        </p>
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
      console.log("response", user.userData.user._id);

      if (response.status === 200) {
        setEducators(response.data.data);
      }
    } catch (error) {
      console.log("error in fetching data of educator:", error);
    }
  };

  useEffect(() => {
    if (user?.userData?.user?._id) {
      fetchEducatorsData();
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
    console.log(email);
    try {
      const response = await axios.patch(API.approveEducator.url, {email: email} , {
        withCredentials:true
      });

      if (response.status === 200) {
        fetchEducatorsData(); // Refresh list after approval
      }
      console.log("response approve", response);
    } catch (error) {
      console.log("approve error", error);
    }
  };

  //  delete user
  const deleteUser = async (email, role) => {
    try {
      const response = await axios.delete(API.deleteUser.url, {
        params: {
          email: email,
          role: role,
        },
        withCredentials:true
      });

      if (response.status === 200) {
        fetchEducatorsData();
        fetchLearnersData();
      }
    } catch (error) {
      alirt(response.message);
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
      console.log(response);
      setWithdrawalRequestsData(response.data)
    }
  } catch (error) {
    console.log(error);
  }
}
   const [revenueData , setRevenueData] = useState()
 console.log('revenueData', revenueData);
 
   useEffect(()=>{
     setRevenueData(user.userData.user.revenue)
   })
  
   
  return (

    <div className=" w-[100vw] min-h-screen flex max-w-[1680px] mx-auto ">
           {
      viewUserDetails && (
        <div className={` w-[100vw] absolute z-50  flex justify-center`}><UserDetailsList userEmail={email} role={role}/>
        <span onClick={()=>{setViewUserDetails(false)}} className=' text-black absolute right-5 text-3xl top-0 cursor-pointer'>X</span>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Educators"
              value={totalEducators}
              icon={<Users className="h-8 w-8 text-indigo-500" />}

            />
            <StatCard
              title="Pending Requests"
              value={pendingEducators.length}
              icon={<Users className="h-8 w-8 text-yellow-900" />}

            />
            <StatCard
              title="Total Learners"
              value={totalLearners}
              icon={<Users className="h-8 w-8 text-green-900" />}

            />
            <StatCard
              title="Monthly Revenue"
              value={`${user.userData.user.revenue[0].revenue} `}
              icon={<LuPoundSterling className="h-8 w-8 text-blue-500" />}

            />

            <div className="col-span-1 md:col-span-2 lg:col-span-4  p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 ">
                Revenue Overview
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <XAxis
                      dataKey="month"
                      stroke={"#6b7280"}
                    />
                    <YAxis stroke={"#6b7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor:  "#ffffff",
                        color:  "#000000",
                        border: `1px solid  "#e5e7eb"`,
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Revenue ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
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
              <tr key={request.id} className={`hover:bg-black`}>
                <td className="px-4 py-3 text-sm ">{request._id}</td>
                <td className="px-4 py-3 text-sm ">{request.educator.name}</td>
                <td className="px-4 py-3 text-sm font-medium  flex items-center">< LuPoundSterling />{request.amount.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm "> {new Date(request.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-sm ">{request.educator.payoutMethod}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full  font-bold text-xl text-yellow-500 `}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  <div className="flex justify-end items-center gap-2">
                    {request.status === 'pending' && (
                      <>
                        <button className="p-1 rounded-full text-green-600 hover:bg-green-100 ">
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button className="p-1 rounded-full text-red-600 hover:bg-red-100 ">
                          <XCircle className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    <button className="p-1 rounded-full text-black hover:bg-gray-100 ">
                      <MoreVertical className="h-5 w-5" />
                    </button>
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
                  fetchEducatorsDetailedData(educator.email);
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Total Revenue"
                value={`${user.userData.user.revenue[0].revenue}`}
                icon={<LuPoundSterling className="h-8 w-8 text-green-500" />}

              />
              <StatCard
                title="Monthly Revenue"
                value={`${user.userData.user.revenue[0].revenue}`}
                icon={<LuPoundSterling className="h-8 w-8 text-blue-500" />}

              />
              <StatCard
                title="Active Subscriptions"
                value={totalLearners}
                icon={<Users className="h-8 w-8 text-indigo-500" />}

              />
            </div>

            <div className=" p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 ">
                Revenue Trend
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <XAxis
                      dataKey="month"
                      stroke={"#6b7280"}
                    />
                    <YAxis stroke={"#6b7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        border: `1px solid "#e5e7eb"`,
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Revenue ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
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

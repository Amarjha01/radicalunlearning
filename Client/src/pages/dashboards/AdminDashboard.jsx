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
  DollarSign,
  Settings,
  Bell,
  Moon,
  Sun,
  Search,
  ChevronDown,
  Check,
  X,
  Trash2,
  Menu,
} from "lucide-react";
import { MdHome } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";
import axios from "axios";
import API from "../../common/apis/ServerBaseURL.jsx";
import UserDetailsList from "../../components/Dashboard/UserDetailsList.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/slices/userSlice.jsx";
import GroupChat from "../../components/Chat/GroupChat.jsx";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
const dummyRevenueData = [
  { month: "Jan", revenue: 4500 },
  { month: "Feb", revenue: 5200 },
  { month: "Mar", revenue: 6800 },
  { month: "Apr", revenue: 7400 },
  { month: "May", revenue: 9100 },
  { month: "Jun", revenue: 8500 },
];

// Main App Component
export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [educators, setEducators] = useState([]);
  const [pendingEducators, setPendingEducators] = useState([]);
  const [approvedEducators, setApprovedEducators] = useState([]);
  const [learners, setLearners] = useState([]);
  const [subscriptionFee, setSubscriptionFee] = useState(49.99);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [educatorDetailedData, setEducatorDetailedData] = useState({});
  // Calculate stats
  const totalEducators = educators.length;
  const totalLearners = learners.length;
  const totalRevenue = dummyRevenueData.reduce(
    (sum, data) => sum + data.revenue,
    0
  );
  const monthlyRevenue = dummyRevenueData[dummyRevenueData.length - 1].revenue;

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

  const updateSubscriptionFee = (e) => {
    e.preventDefault();
    // This would normally send to API, but we're just updating state
    alert(`Subscription fee updated to $${subscriptionFee}`);
  };

  const SidebarItem = ({ icon, label, active, onClick, darkMode }) => (
    <li
      onClick={onClick}
      className={`flex items-center p-2 cursor-pointer rounded-md transition 
        ${
          active
            ? "bg-indigo-100 dark:bg-indigo-600 text-indigo-800 dark:text-white"
            : "text-gray-700 dark:text-gray-300"
        }
        hover:bg-indigo-200 dark:hover:bg-indigo-700`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </li>
  );

  const StatCard = ({ title, value, icon, darkMode }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">
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
      const response = await axios.post(API.educatorsData.url, {
        _id: user.userData.user._id,
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

  const fetchEducatorsDetailedData = async (email) => {
    
    try {
      const response = await axios.post(API.educatorsDetailedData.url, {
        email: email,
        _id: user.userData.user._id,
      });
console.log('hi log', response);

      if (response.status === 200) {
        setEducatorDetailedData(response.data.data);
        setViewUserDetails(true);
      }
    } catch (error) {
      console.error("Error fetching detailed data:", error);
    }
  };

  // fetching learner data
  const fetchLearnersData = async () => {
    try {
      const response = await axios.post(API.learnersData.url, {
        _id: user.userData.user._id,
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
      const response = await axios.patch(API.approveEducator.url, {
        email: email,
        _id: user.userData.user._id,
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
          _id: user.userData.user._id,
        },
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

  return (

    <div className=" w-[100vw] min-h-screen flex max-w-[1680px] mx-auto">
           {
      viewUserDetails && (
        <div className={` w-[100vw] absolute z-50 bg-black flex justify-center`}><UserDetailsList user={educatorDetailedData} />
        <span onClick={()=>{setViewUserDetails(false)}} className=' text-white absolute right-5 text-3xl top-0 cursor-pointer'>X</span>
        </div>
      )
     }
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex relative left-0 min-h-screen w-64 bg-white dark:bg-gray-800 shadow-md flex-col">
        <div className="p-4 flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-xl font-bold dark:text-white">EduAdmin</h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <SidebarItem
              icon={<BookOpen size={20} />}
              label="Dashboard"
              active={activeView === "dashboard"}
              onClick={() => setActiveView("dashboard")}
              darkMode={darkMode}
            />
            <SidebarItem
              icon={<Users size={20} />}
              label="Educators"
              active={activeView === "educators"}
              onClick={() => setActiveView("educators")}
              darkMode={darkMode}
            />
            <SidebarItem
              icon={<Users size={20} />}
              label="Learners"
              active={activeView === "learners"}
              onClick={() => setActiveView("learners")}
              darkMode={darkMode}
            />
            <SidebarItem
              icon={<DollarSign size={20} />}
              label="Revenue"
              active={activeView === "revenue"}
              onClick={() => setActiveView("revenue")}
              darkMode={darkMode}
            />
            <SidebarItem
              icon={<CiChat1 size={20} />}
              label="communityChat"
              active={activeView === "communityChat"}
              onClick={() => setActiveView("communityChat")}
              darkMode={darkMode}
            />
            <SidebarItem
              icon={<Settings size={20} />}
              label="Settings"
              active={activeView === "settings"}
              onClick={() => setActiveView("settings")}
              darkMode={darkMode}
            />
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-gray-800 dark:text-white" />
          ) : (
            <Menu size={24} className="text-gray-800 dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 inset-0 z-20 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="h-full w-64 bg-white dark:bg-gray-800 shadow-lg p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <h1 className="text-lg font-bold dark:text-white">EduAdmin</h1>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} className="text-gray-500 dark:text-gray-400" />
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
                  darkMode={darkMode}
                />
                <SidebarItem
                  icon={<Users size={20} />}
                  label="Educators"
                  active={activeView === "educators"}
                  onClick={() => {
                    setActiveView("educators");
                    setMobileMenuOpen(false);
                  }}
                  darkMode={darkMode}
                />
                <SidebarItem
                  icon={<Users size={20} />}
                  label="Learners"
                  active={activeView === "learners"}
                  onClick={() => {
                    setActiveView("learners");
                    setMobileMenuOpen(false);
                  }}
                  darkMode={darkMode}
                />
                <SidebarItem
                  icon={<DollarSign size={20} />}
                  label="Revenue"
                  active={activeView === "revenue"}
                  onClick={() => {
                    setActiveView("revenue");
                    setMobileMenuOpen(false);
                  }}
                  darkMode={darkMode}
                />
                <SidebarItem
                  icon={<CiChat1 size={20} />}
                  label="communityChat"
                  active={activeView === "communityChat"}
                  onClick={() => {
                    setActiveView("communityChat");
                    setMobileMenuOpen(false);
                  }}
                  darkMode={darkMode}
                />
                <SidebarItem
                  icon={<Settings size={20} />}
                  label="Settings"
                  active={activeView === "settings"}
                  onClick={() => {
                    setActiveView("settings");
                    setMobileMenuOpen(false);
                  }}
                  darkMode={darkMode}
                />
              </ul>
            </nav>
          </div>
        </div>
      )}
      {/* main content */}
      {/* top bar */}
      <div className=" grow-1 min-h-screen bg-white p-5">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-4 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold dark:text-white">
              {activeView === "dashboard" && "Dashboard"}
              {activeView === "educators" && "Educators Management"}
              {activeView === "learners" && "Learners Management"}
              {activeView === "revenue" && "Revenue Overview"}
              {activeView === "settings" && "Subscription Settings"}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
             <Link to={'/'}>
             <MdHome  size={20} className="text-gray-600 dark:text-gray-300 cursor-pointer" />
             </Link>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <Sun size={20} className="text-gray-300" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                A
              </div>
              <span className="text-sm font-medium hidden sm:block dark:text-white">
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
              darkMode={darkMode}
            />
            <StatCard
              title="Pending Requests"
              value={pendingEducators.length}
              icon={<Users className="h-8 w-8 text-yellow-500" />}
              darkMode={darkMode}
            />
            <StatCard
              title="Total Learners"
              value={totalLearners}
              icon={<Users className="h-8 w-8 text-green-500" />}
              darkMode={darkMode}
            />
            <StatCard
              title="Monthly Revenue"
              value={`$${monthlyRevenue}`}
              icon={<DollarSign className="h-8 w-8 text-blue-500" />}
              darkMode={darkMode}
            />

            <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">
                Revenue Overview
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dummyRevenueData}>
                    <XAxis
                      dataKey="month"
                      stroke={darkMode ? "#9ca3af" : "#6b7280"}
                    />
                    <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                        color: darkMode ? "#ffffff" : "#000000",
                        border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
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

        {/* educator view */}

        {activeView === "educators" && (
<div className=" flex flex-col gap-10 ">
{/* approved educator */}
<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
  <h3 className="text-lg font-semibold mb-4 dark:text-white">
  Approved Educator
  </h3>
  <div className="overflow-x-auto">
  <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700 rounded-lg">
  <thead className="bg-gray-50 dark:bg-gray-700">
    <tr>
      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words w-1/5 break-words">Name</th>
      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words w-1/5 break-words">Email</th>
      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words w-1/5 break-words">Sub-Role</th>
      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words w-1/5 break-words">Country</th>
      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words w-1/5 break-words">Join Date</th>
      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words w-1/5 break-words">View</th>
    </tr>
  </thead>
  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
    {approvedEducators.map((educator) => (
      <tr key={educator.id} className="align-top">
        <td className="px-3 py-4 text-sm font-medium text-gray-900 dark:text-white break-words  text-start">{educator.name}</td>
        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-300 break-words  text-start">{educator.email}</td>
        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-300 break-words  text-start">{educator.subrole}</td>
        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-300 break-words text-start">{educator.country}</td>
        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-300 break-words text-start">{new Date(educator.createdAt).toLocaleDateString()}</td>
        <td
          onClick={() => fetchEducatorsDetailedData(educator.email)}
          className="px-3 py-4 text-sm text-gray-500 dark:text-green-500 cursor-pointer break-words"
        >
          View
        </td>
      </tr>
    ))}
  </tbody>
</table>
  </div>
</div>



<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
  <h3 className="text-lg font-semibold mb-4 dark:text-white">
    Pending Educator Requests
  </h3>
  <div className="overflow-x-auto">
  <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr >
          <th
            scope="col"
            className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words"
          >
            Request Date
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words"
          >
            Actions
          </th>
          <th
            scope="col"
            className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words"
          >
            View Details
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {pendingEducators && pendingEducators.length > 0 ? (
          pendingEducators.map((educator) => (
            <tr key={educator.id} className="align-top">
              <td className="px-3 py-4 text-sm font-medium text-gray-900 dark:text-white break-words  text-start">
                {educator.name}
              </td>
              <td className="px-3 py-4 text-sm font-medium text-gray-900 dark:text-white break-words  text-start">
                {educator.email}
              </td>
              <td className="px-3 py-4 text-sm font-medium text-gray-900 dark:text-white break-words  text-start">
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
              className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-300"
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
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">
                Learners Management
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search learners..."
                  className="pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words w-1/5 break-words"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words w-1/5 break-words"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words w-1/5 break-words"
                    >
                      Join Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5 break-words w-1/5 break-words"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {learners.map((learner) => (
                    <tr key={learner.id} className="align-top">
                      <td className="px-3 py-4 text-sm font-medium text-gray-900 dark:text-white break-words  text-start">
                        {learner.name}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-gray-900 dark:text-white break-words  text-start">
                        {learner.email}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-gray-900 dark:text-white break-words  text-start">
                        {new Date(learner.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-4 font-medium text-gray-900 dark:text-white break-words  text-start ">
                        <button
                          onClick={() => deleteUser(learner.email)}
                          className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition cursor-pointer "
                          title="Delete learner"
                        >
                          <Trash2 size={20} />
                        </button>
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
                value={`$${totalRevenue}`}
                icon={<DollarSign className="h-8 w-8 text-green-500" />}
                darkMode={darkMode}
              />
              <StatCard
                title="Monthly Revenue"
                value={`$${monthlyRevenue}`}
                icon={<DollarSign className="h-8 w-8 text-blue-500" />}
                darkMode={darkMode}
              />
              <StatCard
                title="Active Subscriptions"
                value={totalLearners}
                icon={<Users className="h-8 w-8 text-indigo-500" />}
                darkMode={darkMode}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">
                Revenue Trend
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dummyRevenueData}>
                    <XAxis
                      dataKey="month"
                      stroke={darkMode ? "#9ca3af" : "#6b7280"}
                    />
                    <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                        color: darkMode ? "#ffffff" : "#000000",
                        border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
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

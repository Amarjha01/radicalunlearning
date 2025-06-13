import React, { useEffect, useState } from "react";
import {
  Home,
  Award,
  Folder,
  Calendar,
  Settings,
  Plus,
  Edit,
  CheckCircle,
  Moon,
  Sun,
  User,
  Clock,
  LogOut,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

import {
  FaGraduationCap,
  FaGlobeAmericas,
  FaUserTie,
  FaFileAlt,
  FaVideo,
  FaBookOpen,
  FaUserEdit,
} from "react-icons/fa";
import { LuPoundSterling } from "react-icons/lu";
import { LuBotMessageSquare } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import GroupChat from "../../components/Chat/GroupChat.jsx";
import { MdHome } from "react-icons/md";
import { CiChat1, CiMenuFries, CiLock } from "react-icons/ci";
import { TbUserSearch } from "react-icons/tb";
import { MdOutlineSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import AIChat from "../../components/ChatBot/Aichat.jsx";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51RPi0BI60AmMhjB7QXOsnO1d7vsWW7XVoYZnDe4Al7ZoQ7PIgSBdF1l9SE5AekRVZQ1LIFlebCoyrfvFF1vqqgsw00tA0b6Wy1");

import API from "../../common/apis/ServerBaseURL.jsx";
import TodoApp from "../../components/Dashboard/TodoApp.jsx";
import { Link } from "react-router-dom";
import { showNetworkErrorToast } from "../../utils/Notification.jsx";
// Dummy data for development
const dummyUser = {
  name: "Alex Thompson",
  email: "alex.t@example.com",
  country: "India",
  language: "English",
  bio: "Self-driven learner passionate about coding & design.",
  learningInterests: ["AI", "UX Design", "Entrepreneurship"],
  subscriptionStatus: "Active",
  avatarUrl: "/api/placeholder/150/150",
};

// Format date for display
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Format date and time for display
const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const dateOptions = { month: "short", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  return `${date.toLocaleDateString(
    "en-US",
    dateOptions
  )} at ${date.toLocaleTimeString("en-US", timeOptions)}`;
};

// Overview Tab Component
const OverviewTab = ({ darkMode, sessions }) => {
  const [todos, setTodos] = useState([]);

  const fetchtodos = async () => {
    try {
      const response = await axios.get(API.fetchtodos.url, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setTodos(response.data.data.todos);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError("Failed to load todos.");
       if (error.message === "Network Error") {
              showNetworkErrorToast(
                "Your Network connection Is Unstable OR Disconected"
              );
            }
    }
  };

  useEffect(() => {
    fetchtodos();
  }, []);

  return (
    <div className="bg-[#faf3dd]">
      <h1 className="text-2xl font-bold mb-6 ">Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className={`p-6 rounded-lg shadow-sm  `}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Learning Goals</h3>
            <Award className="text-blue-500" size={20} />
          </div>
          <p className="text-3xl font-bold">{todos.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {todos.filter((g) => g.completed === true).length} completed
          </p>
        </div>

        <div className={`p-6 rounded-lg shadow-sm  `}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
            <Calendar className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold">{sessions.upcoming.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            In the next 30 days
          </p>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className={`p-6 rounded-lg shadow-sm mb-8 `}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
        </div>
        <div className="space-y-4">
          {sessions?.upcoming?.map((session) => (
            <div
              key={session._id}
              className={`p-4 border border-amber-500 rounded-lg flex justify-between items-center `}
            >
              <div>
                <h3 className="font-medium">{session.topic}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {session.educatorName} · {formatDateTime(session.scheduledAt)}
                </p>
              </div>
              <a href={session.zoomJoinUrl}>
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-md cursor-pointer">
                  Join
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Search educator
const SearchTab = ({ darkMode, userData }) => {
  const [searchKey, setSearchKey] = useState("");
  const [allEducator, setAllEducator] = useState([]);
  const [loadingEducatorId, setLoadingEducatorId] = useState(null);

  const searcheducator = async () => {
    
    try {
      const response = await axios.get(API.searchEducator.url, {
        params: {
          searchKey: searchKey,
        },
      });

      if (response.status === 200) {
        setAllEducator(response.data.data); // Assuming the API returns an array of educators
      }
    } catch (error) {
      console.error("Error fetching educators:", error);
       if (error.message === "Network Error") {
              showNetworkErrorToast(
                "Your Network connection Is Unstable OR Disconected"
              );
            }
    }
  };

 const handlePay = async (educatorId, amount) => {
  try {
    setLoadingEducatorId(educatorId); // Start loading

    const res = await axios.post(
      API.createCheckoutSession.url,
      {
        learnerName: userData.name,
        amount,
        educatorId,
        topic: searchKey,
      },
      {
        withCredentials: true,
      }
    );

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
  } catch (error) {
    console.error("Payment error", error);
    if (error.message === "Network Error") {
      showNetworkErrorToast("Your Network connection Is Unstable OR Disconnected");
    }
  } finally {
    setLoadingEducatorId(null); // Reset loading state
  }
};


  return (
    <div className="w-full h-auto flex flex-col">
      {/* Search Input and Search Icon */}
      <div className="flex items-center space-x-2">
        <input
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searcheducator();
            }
          }}
          type="text"
          id="name"
          name="name"
          required
          size="10"
          className="border p-2 w-full outline-none rounded-lg"
          placeholder="Search by topic........"
        />
        <MdOutlineSearch
          onClick={searcheducator}
          className="text-5xl cursor-pointer"
        />
      </div>

      {/* Displaying Educator List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allEducator.length > 0 ? (
          allEducator.map((educator) => (
            <div
              key={educator.id}
              className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100"
            >
              {/* Header with gradient overlay */}
              <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
                <div className="absolute bottom-0 left-0 w-full p-4 flex items-end">
                  <div className="flex-shrink-0 mr-4">
                    <div className="rounded-full h-16 w-16 overflow-hidden border-2 border-white shadow-md bg-white flex items-center justify-center">
                      <img
                        src="https://amarjha.tech/assets/MyImg-BjWvYtsb.svg"
                        alt={educator.name}
                        className="h-12 w-12 object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-white truncate">
                      {educator.name}
                    </h3>
                    <div className="flex items-center text-gray-200 text-sm">
                      <FaGlobeAmericas className="mr-1" />
                      <span>{educator.country}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <FaUserTie className="text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">
                      Bio
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {educator.bio}
                  </p>
                </div>

                {/* Subjects/Topics */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <FaBookOpen className="text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">
                      Topics
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {educator.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <a
                    href={educator.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                  >
                    <FaFileAlt className="mr-2 text-blue-600" />
                    View Certificates
                  </a>
                  <a
                    href={educator.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                  >
                    <FaVideo className="mr-2 text-blue-600" />
                    Watch Video
                  </a>
                </div>

                {/* Price and booking */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <FaGraduationCap className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">
                        Session Fee
                      </span>
                    </div>
                    <span className="text-lg font-bold text-blue-600 flex justify-center items-center">
                      <LuPoundSterling />{educator?.sessionFee || 10}
                    </span>
                  </div>

                <button
  onClick={() => handlePay(educator._id, educator?.sessionFee || 10 )}
  disabled={loadingEducatorId === educator._id}
  className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg flex items-center justify-center transition-all 
    ${loadingEducatorId === educator._id ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'}`}
>
  {loadingEducatorId === educator._id ? (
    <>
      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      Processing...
    </>
  ) : (
    <>
      <CiLock className="mr-2 text-lg" />
      Pay to Book Session
    </>
  )}
</button>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center p-12 rounded-lg bg-[#b4c0b2]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <FaGraduationCap className="text-2xl text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No educators found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Goals Tab Component
const GoalsTab = ({}) => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  return (
    <div>
      <TodoApp />
    </div>
  );
};

// Sessions Tab Component
const SessionsTab = ({ darkMode, sessions }) => {
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleReschedule = (session) => {
    setSelectedSession(session);
    setShowRescheduleForm(true);
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-6">Upcoming Sessions</h1>

        {/* Sessions List */}
        <div className={`rounded-lg shadow-sm overflow-hidden `}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                className={`text-left ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <tr>
                  <th className="px-6 py-3 text-sm font-medium">Session</th>
                  <th className="px-6 py-3 text-sm font-medium">Educator</th>
                  <th className="px-6 py-3 text-sm font-medium">Date & Time</th>
                  <th className="px-6 py-3 text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sessions?.upcoming?.map((session) => (
                  <tr key={session._id}>
                    <td className="px-6 py-4">
                      <div className="font-medium">{session.topic}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {session.educatorId.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {formatDateTime(session.scheduledAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                        {session.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <a
                          href={session.zoomJoinUrl}
                          className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                        >
                          Join
                        </a>
                        <button
                          onClick={() => handleReschedule(session)}
                          className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
                        >
                          Reschedule
                        </button>
                        {/* <button className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-300 rounded-md">
                        Cancel
                      </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reschedule Form Modal */}
        {showRescheduleForm && selectedSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`w-full max-w-md p-6 rounded-lg `}>
              <h2 className="text-xl font-semibold mb-4">
                Reschedule: {selectedSession.title}
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Current Date & Time
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 rounded-md border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-gray-400"
                        : "bg-gray-100 border-gray-300 text-gray-500"
                    }`}
                    value={formatDateTime(selectedSession.dateTime)}
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    New Date
                  </label>
                  <input
                    type="date"
                    className={`w-full p-2 rounded-md border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    New Time
                  </label>
                  <input
                    type="time"
                    className={`w-full p-2 rounded-md border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowRescheduleForm(false)}
                    className={`px-4 py-2 rounded-md ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Reschedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-6">Previous Sessions</h1>

        {/* Sessions List */}
        <div className={`rounded-lg shadow-sm overflow-hidden `}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                className={`text-left ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <tr>
                  <th className="px-6 py-3 text-sm font-medium">Session</th>
                  <th className="px-6 py-3 text-sm font-medium">Educator</th>
                  <th className="px-6 py-3 text-sm font-medium">Date & Time</th>
                  <th className="px-6 py-3 text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sessions?.previous?.map((session) => (
                  <tr key={session._id}>
                    <td className="px-6 py-4">
                      <div className="font-medium">{session.topic}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {session.educatorId.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {formatDateTime(session.scheduledAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                        {session.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const ChatTab = ({ darkMode }) => {
  return <GroupChat />;
};
const ChatBot = ({ darkMode }) => {
  return <AIChat />;
};

// Settings Tab Component

const SettingsTab = ({ userData }) => {
  const [activeSection, setActiveSection] = useState("profile");
  const [editProfile, setEditProfile] = useState(false);
  const [changedData, setChangedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

 const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "radicalunlearning");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dbnticsz8/image/upload",
      formData
    );
    return res.data.secure_url;
  } catch (err) {
     if (err.message === "Network Error") {
        showNetworkErrorToast(
          "Your Network connection Is Unstable OR Disconected"
        );
      }
    console.error("Image upload failed", err);
    return null;
  }
};


const handleProfileUpdate = async (e) => {
  e.preventDefault();
  setLoading(true);

  let updatedData = { ...changedData };

 if (file) {
  const imageUrl = await handleImageUpload(file);
  if (imageUrl) {
    updatedData.avatar = imageUrl;
  }
  setFile(null); 
}


  try {
    const response = await axios.patch(
      API.updateUserDetails.url,
      updatedData,
      { withCredentials: true }
    );

    console.log(response);
    setEditProfile(false);
  } catch (error) {
    console.error("Update failed:", error);
     if (error.message === "Network Error") {
        showNetworkErrorToast(
          "Your Network connection Is Unstable OR Disconected"
        );
      }
  } finally {
    setLoading(false);
  }
};


  const handleChange = (field, value) => {
    setChangedData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      {/* Settings Navigation */}
      <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
        {[
          { id: "profile", name: "Profile" },
          { id: "account", name: "Account" },
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 border-b-2 font-medium text-sm ${
              activeSection === section.id
                ? "border-blue-500 text-blue-600 "
                : "border-transparent text-black hover:text-blue-500 "
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Profile Section */}
      {activeSection === "profile" && (
        <div className={`p-6 rounded-lg shadow-sm bg-[#b4c0b2]`}>
          <div className="flex flex-col md:flex-row">
            {/* Avatar */}
            <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src={
                    changedData.avatar ||
                    (file && URL.createObjectURL(file)) ||
                    userData.avatar || "/default_userFrofile.webp"
                  }
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
               disabled={!editProfile}
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className={`w-48 md:w-40 lg:w-52 bg-yellow-200 flex items-center justify-center px-4 py-2 rounded-md text-sm text-gray-700  ${editProfile ? "hover:bg-yellow-300 cursor-pointer" : "cursor-not-allowed"}`}
                id="avatarUpload"
              />
            </div>

            {/* Profile Form */}
            <div className="md:w-2/3">
              <form onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`w-full p-2 rounded-md border bg-[#faf3dd]`}
                      defaultValue={userData.name}
                      disabled={!editProfile}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`w-full p-2 rounded-md border bg-[#faf3dd]`}
                      defaultValue={userData.email}
                      disabled={!editProfile}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      className={`w-full p-2 rounded-md border bg-[#faf3dd]`}
                      defaultValue={userData.country}
                      disabled={!editProfile}
                      onChange={(e) => handleChange("country", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Language
                    </label>
                    <select
                      className={`w-full p-2 rounded-md border bg-[#faf3dd]`}
                      defaultValue={userData.language}
                      disabled={!editProfile}
                      onChange={(e) => handleChange("language", e.target.value)}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    className={`w-full p-2 rounded-md border bg-[#faf3dd]`}
                    rows="4"
                    defaultValue={userData.bio}
                    disabled={!editProfile}
                    onChange={(e) => handleChange("bio", e.target.value)}
                  />
                </div>

                <div className="flex justify-end items-center gap-5">
                  <FaUserEdit
                    className="text-3xl cursor-pointer"
                    onClick={() => setEditProfile(true)}
                  />

                  <button
                    type="submit"
                    disabled={!editProfile || loading}
                    className={`px-4 py-2 rounded-md text-black ${
                      editProfile
                        ? "bg-[#f2c078] hover:bg-[#d1ad7b] cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Account Section */}
      {activeSection === "account" && (
        <div className={`p-6 rounded-lg shadow-sm bg-[#b4c0b2]`}>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Password</h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className={`w-full p-2 rounded-md border bg-white border-gray-300`}
                    placeholder="••••••••"
                  />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      className={`w-full p-2 rounded-md border bg-white border-gray-300`}
                      placeholder="New password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className={`w-full p-2 rounded-md border bg-white border-gray-30`}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#f2c078] hover:bg-[#c5a271] text-black px-4 py-2 rounded-md"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
            <div
              className={`p-4 rounded-md border border-red-300 bg-red-50`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-red-600 dark:text-red-400">
                    Delete Account
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Once deleted, all your data will be permanently removed.
                  </p>
                </div>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main dashboard components
const LearnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [darkMode, setDarkMode] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [sessions, setSessions] = useState({ previous: [], upcoming: [] });

  useEffect(() => {
    const getLearnerSessions = async () => {
      try {
        const response = await axios.get(API.getLearnerSessions.url, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setSessions(response.data); // Will set { previous: [...], upcoming: [...] }
        }
      } catch (error) {
        console.error("Error fetching sessions", error);
      }
    };

    if (activeTab === "Sessions" || "Overview") {
      getLearnerSessions();
    }
  }, [activeTab]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user?.userData?.user) {
      setProfileData(user.userData.user);
    }
  });
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSignOut = async () => {
    try {
      const response = await axios.post(API.signout.url, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(clearUser());
      }
    } catch (error) {}
  };
  return (
    <div className={`min-h-screen  text-gray-800`}>
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 flex justify-between items-center  text-black">
        <h1 className="font-bold ">Radical Unlearning</h1>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className={`p-2 rounded-md hover:bg-blue-700 text-xl cursor-pointer transition-all duration-500 transform ${
            mobileSidebarOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          {mobileSidebarOpen ? <IoMdClose /> : <CiMenuFries />}
        </button>
      </div>

      <div className="flex flex-col md:flex-row bg-[#faf3dd]">
        <div
          className={`
          ${
            mobileSidebarOpen ? "block" : "hidden"
          } md:block w-64 h-[100vh] z-10 border-r border-gray-200 shadow-sm px-2 fixed bg-[#f2c078]`}
        >
          {/* Logo */}
          <div className="p-4 flex flex-col text-black">
            <Link to={"/"}>
              <h2 className="text-xl font-bold cursor-pointer">
                Radical Unlearning
              </h2>
            </Link>
            <p>Learner Tools</p>
          </div>

          {/* User Profile Card */}
          <div className="mx-4 mb-6 p-4 rounded-lg bg-[#faf3dd] flex items-center">
            <img
              src={
                profileData?.avatar ||
                "https://amarjha.tech/assets/MyImg-BjWvYtsb.svg"
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className=" flex flex-col">
              <p className="text-xs text-black ">
                {profileData?.name?.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-2">
            {[
              { name: "Overview", icon: <Home size={18} /> },
              { name: "Search For Expert", icon: <TbUserSearch size={18} /> },
              { name: "My Goals", icon: <Award size={18} /> },
              { name: "Sessions", icon: <Calendar size={18} /> },
              { name: "Community Chat", icon: <CiChat1 size={18} /> },
              { name: "AI Chat Bot", icon: <LuBotMessageSquare size={18} /> },
              { name: "Settings", icon: <Settings size={18} /> },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setMobileSidebarOpen(false);
                }}
                className={`flex items-center w-full p-2 rounded-md transition-colors cursor-pointer ${
                  activeTab === item.name
                    ? "bg-blue-100  "
                    : "hover:bg-gray-100 "
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Dark Mode Toggle & Logout */}
          <div className="absolute bottom-0 left-0 w-64 border-t border-gray-200 p-4">
            <button
              onClick={() => {
                handleSignOut();
              }}
              className="flex items-center text-red-500 hover:text-red-600 px-3 py-2 rounded-md w-full cursor-pointer"
            >
              <LogOut size={18} className="mr-2" />
              signOut
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-x-hidden p-4 md:p-8 md:pl-[35vw] lg:pl-[23vw]">
          {activeTab === "Overview" && (
            <OverviewTab
              darkMode={darkMode}
              sessions={sessions}
              userData={profileData}
            />
          )}
          {activeTab === "Search For Expert" && (
            <SearchTab darkMode={darkMode} userData={profileData} />
          )}
          {activeTab === "My Goals" && (
            <GoalsTab darkMode={darkMode} userData={profileData} />
          )}
          {activeTab === "Sessions" && (
            <SessionsTab
              darkMode={darkMode}
              sessions={sessions}
              userData={profileData}
            />
          )}
          {activeTab === "Community Chat" && <ChatTab darkMode={darkMode} />}
          {activeTab === "AI Chat Bot" && <ChatBot darkMode={darkMode} />}
          {activeTab === "Settings" && (
            <SettingsTab darkMode={darkMode} userData={profileData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;

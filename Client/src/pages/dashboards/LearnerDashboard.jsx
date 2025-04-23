import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';

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

const dummyGoals = [
  {
    id: 1,
    title: "Complete React Masterclass",
    startDate: "2025-03-15",
    targetDate: "2025-04-30",
    completion: 65,
    status: "In Progress"
  },
  {
    id: 2,
    title: "Build 5 UX Case Studies",
    startDate: "2025-02-01",
    targetDate: "2025-05-01",
    completion: 40,
    status: "In Progress"
  },
  {
    id: 3,
    title: "Learn Python Basics",
    startDate: "2025-01-10",
    targetDate: "2025-03-10",
    completion: 100,
    status: "Completed"
  }
];

const dummyPortfolio = [
  {
    id: 1,
    title: "Personal Website Redesign",
    description: "Redesigned my personal website with a focus on accessibility and modern design principles.",
    skillsLearned: ["React", "Tailwind CSS", "Responsive Design"],
    link: "https://github.com/example"
  },
  {
    id: 2,
    title: "Machine Learning Image Classifier",
    description: "Built an image classification system using TensorFlow and Python.",
    skillsLearned: ["Python", "TensorFlow", "Machine Learning"],
    link: "https://github.com/example"
  },
  {
    id: 3,
    title: "E-commerce UI Prototype",
    description: "Created a high-fidelity prototype for an e-commerce platform.",
    skillsLearned: ["Figma", "UI Design", "User Testing"],
    link: "https://figma.com/example"
  }
];

const dummySessions = [
  {
    id: 1,
    title: "Weekly Progress Review",
    educatorName: "Dr. Sarah Johnson",
    dateTime: "2025-04-25T14:00:00",
    status: "Scheduled", 
    joinLink: "#"
  },
  {
    id: 2,
    title: "UX Design Workshop",
    educatorName: "Michael Chen",
    dateTime: "2025-04-27T10:30:00",
    status: "Scheduled",
    joinLink: "#"
  },
  {
    id: 3,
    title: "Career Guidance Session",
    educatorName: "Priya Patel",
    dateTime: "2025-05-02T16:00:00",
    status: "Scheduled",
    joinLink: "#"
  }
];

const dummyCommunityFeed = [
  {
    id: 1,
    userName: "Sophia Lee",
    avatar: "/api/placeholder/40/40",
    content: "Just completed my first AI project! Check it out in my portfolio.",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    userName: "Ryan Garcia",
    avatar: "/api/placeholder/40/40",
    content: "Looking for study partners for the upcoming Web Security course. Anyone interested?",
    timestamp: "Yesterday"
  },
  {
    id: 3,
    userName: "Emma Wilson",
    avatar: "/api/placeholder/40/40",
    content: "Shared a new resource on blockchain development in the Resource Hub.",
    timestamp: "2 days ago"
  }
];

// Format date for display
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format date and time for display
const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const dateOptions = { month: 'short', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  return `${date.toLocaleDateString('en-US', dateOptions)} at ${date.toLocaleTimeString('en-US', timeOptions)}`;
};

// Main dashboard components
const LearnerDashboard = () => {

  const [activeTab, setActiveTab] = useState('Overview');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 flex justify-between items-center bg-blue-600 text-white">
        <h1 className="font-bold">RadicalUnlearning</h1>
        <button 
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-md hover:bg-blue-700"
        >
          {mobileSidebarOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className={`
          ${mobileSidebarOpen ? 'block' : 'hidden'} 
          md:block md:w-64 md:min-h-screen 
          ${darkMode ? 'bg-gray-800' : 'bg-white'} 
          border-r border-gray-200 shadow-sm
        `}>
          {/* Logo */}
          <div className="p-4 flex justify-center md:justify-start">
            <h2 className="text-xl font-bold text-blue-600">RadicalUnlearning</h2>
          </div>

          {/* User Profile Card */}
          <div className="mx-4 mb-6 p-4 rounded-lg bg-blue-50 dark:bg-gray-700 flex items-center">
            <img 
              src={dummyUser.avatarUrl} 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{dummyUser.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">{dummyUser.subscriptionStatus} Plan</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-2">
            {[
              { name: 'Overview', icon: <Home size={18} /> },
              { name: 'My Goals', icon: <Award size={18} /> },
              { name: 'Portfolio', icon: <Folder size={18} /> },
              { name: 'Sessions', icon: <Calendar size={18} /> },
              { name: 'Settings', icon: <Settings size={18} /> }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setMobileSidebarOpen(false);
                }}
                className={`flex items-center w-full p-3 mx-2 my-1 rounded-md transition-colors ${
                  activeTab === item.name
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Dark Mode Toggle & Logout */}
          <div className="absolute bottom-0 left-0 w-64 border-t border-gray-200 p-4">
            <div className="flex justify-between mb-4">
              <button 
                onClick={toggleDarkMode}
                className={`flex items-center px-3 py-2 rounded-md ${
                  darkMode ? 'text-blue-300' : 'text-gray-600'
                }`}
              >
                {darkMode ? <Sun size={18} className="mr-2" /> : <Moon size={18} className="mr-2" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
            <button className="flex items-center text-red-500 hover:text-red-600 px-3 py-2 rounded-md w-full">
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-x-hidden p-4 md:p-8">
          {activeTab === 'Overview' && <OverviewTab darkMode={darkMode} />}
          {activeTab === 'My Goals' && <GoalsTab darkMode={darkMode} goals={dummyGoals} />}
          {activeTab === 'Portfolio' && <PortfolioTab darkMode={darkMode} portfolio={dummyPortfolio} />}
          {activeTab === 'Sessions' && <SessionsTab darkMode={darkMode} sessions={dummySessions} />}
          {activeTab === 'Settings' && <SettingsTab darkMode={darkMode} user={dummyUser} />}
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ darkMode }) => {
  // Filter upcoming sessions (next 3)
  const upcomingSessions = dummySessions.slice(0, 2);
  
  // Filter in-progress goals
  const inProgressGoals = dummyGoals.filter(goal => goal.status === "In Progress").slice(0, 2);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Learning Goals</h3>
            <Award className="text-blue-500" size={20} />
          </div>
          <p className="text-3xl font-bold">{dummyGoals.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {dummyGoals.filter(g => g.status === "Completed").length} completed
          </p>
        </div>
        
        <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Portfolio Items</h3>
            <Folder className="text-indigo-500" size={20} />
          </div>
          <p className="text-3xl font-bold">{dummyPortfolio.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Projects showcased</p>
        </div>
        
        <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
            <Calendar className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold">{dummySessions.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">In the next 30 days</p>
        </div>
      </div>
      
      {/* Upcoming Sessions */}
      <div className={`p-6 rounded-lg shadow-sm mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
          <button 
            onClick={() => {}} 
            className="text-blue-500 hover:text-blue-600 text-sm flex items-center"
          >
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-4">
          {upcomingSessions.map(session => (
            <div 
              key={session.id} 
              className={`p-4 border rounded-lg flex justify-between items-center ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div>
                <h3 className="font-medium">{session.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {session.educatorName} · {formatDateTime(session.dateTime)}
                </p>
              </div>
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-md">
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* In Progress Goals */}
      <div className={`p-6 rounded-lg shadow-sm mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Current Goals</h2>
          <button 
            onClick={() => {}} 
            className="text-blue-500 hover:text-blue-600 text-sm flex items-center"
          >
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-4">
          {inProgressGoals.map(goal => (
            <div 
              key={goal.id} 
              className={`p-4 border rounded-lg ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{goal.title}</h3>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                  {goal.status}
                </span>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{goal.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${goal.completion}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Target: {formatDate(goal.targetDate)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Community Feed */}
      <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Community Feed</h2>
        <div className="space-y-4">
          {dummyCommunityFeed.map(post => (
            <div 
              key={post.id} 
              className={`p-4 border rounded-lg ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex items-center mb-2">
                <img 
                  src={post.avatar} 
                  alt={post.userName}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{post.userName}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                </div>
              </div>
              <p className="text-sm">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Goals Tab Component
const GoalsTab = ({ darkMode, goals }) => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Learning Goals</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <Plus size={18} className="mr-1" /> Add Goal
        </button>
      </div>
      
      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map(goal => (
          <div 
            key={goal.id}
            className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`font-semibold ${goal.status === "Completed" ? "text-green-500" : ""}`}>
                {goal.title}
              </h3>
              <span 
                className={`px-2 py-1 text-xs rounded-full ${
                  goal.status === "Completed" 
                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" 
                    : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                }`}
              >
                {goal.status}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{goal.completion}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                <div 
                  className={`h-2.5 rounded-full ${
                    goal.status === "Completed" ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${goal.completion}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div>Start: {formatDate(goal.startDate)}</div>
              <div>Target: {formatDate(goal.targetDate)}</div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setSelectedGoal(goal)}
                className="text-blue-500 hover:text-blue-600 flex items-center text-sm"
              >
                <Edit size={16} className="mr-1" /> Edit
              </button>
              {goal.status !== "Completed" && (
                <button 
                  className="text-green-500 hover:text-green-600 flex items-center text-sm"
                >
                  <CheckCircle size={16} className="mr-1" /> Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Add New Goal Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Add New Goal</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Goal Title</label>
                <input 
                  type="text" 
                  className={`w-full p-2 rounded-md border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Enter goal title" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input 
                    type="date" 
                    className={`w-full p-2 rounded-md border ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Target Date</label>
                  <input 
                    type="date" 
                    className={`w-full p-2 rounded-md border ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className={`px-4 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Portfolio Tab Component
const PortfolioTab = ({ darkMode, portfolio }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <Plus size={18} className="mr-1" /> Add Project
        </button>
      </div>
      
      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map(project => (
          <div 
            key={project.id}
            className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h3 className="font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {project.description}
            </p>
            
            <div className="mb-4">
              <h4 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                Skills Learned
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.skillsLearned.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 text-sm flex items-center"
              >
                View Project <ArrowRight size={14} className="ml-1" />
              </a>
              <button 
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <Edit size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Project Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Project Title</label>
                <input 
                  type="text" 
                  className={`w-full p-2 rounded-md border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Enter project title" 
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  className={`w-full p-2 rounded-md border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  rows="3"
                  placeholder="Describe your project" 
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Skills Learned</label>
                <input 
                  type="text" 
                  className={`w-full p-2 rounded-md border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Enter skills (comma separated)" 
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Project Link (Optional)</label>
                <input 
                  type="url" 
                  className={`w-full p-2 rounded-md border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  placeholder="https://..." 
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className={`px-4 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
    <div>
      <h1 className="text-2xl font-bold mb-6">Upcoming Sessions</h1>
      
      {/* Sessions List */}
      <div className={`rounded-lg shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`text-left ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-sm font-medium">Session</th>
                <th className="px-6 py-3 text-sm font-medium">Educator</th>
                <th className="px-6 py-3 text-sm font-medium">Date & Time</th>
                <th className="px-6 py-3 text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sessions.map(session => (
                <tr key={session.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium">{session.title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {session.educatorName}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {formatDateTime(session.dateTime)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <a 
                        href={session.joinLink}
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
                      <button className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-300 rounded-md">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Schedule New Session Button */}
      <button className="mt-6 flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
        <Plus size={18} className="mr-1" /> Schedule New Session
      </button>
      
      {/* Reschedule Form Modal */}
      {showRescheduleForm && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">
              Reschedule: {selectedSession.title}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Current Date & Time</label>
                <input 
                  type="text" 
                  className={`w-full p-2 rounded-md border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-500'
                  }`}
                  value={formatDateTime(selectedSession.dateTime)}
                  disabled
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">New Date</label>
                <input 
                  type="date" 
                  className={`w-full p-2 rounded-md border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">New Time</label>
                <input 
                  type="time" 
                  className={`w-full p-2 rounded-md border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowRescheduleForm(false)}
                  className={`px-4 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-200 hover:bg-gray-300'
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
  );
};

// Settings Tab Component
const SettingsTab = ({ darkMode, user }) => {
  const [activeSection, setActiveSection] = useState('profile');
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      
      {/* Settings Navigation */}
      <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'profile', name: 'Profile' },
          { id: 'account', name: 'Account' },
          { id: 'notifications', name: 'Notifications' },
          { id: 'privacy', name: 'Privacy & Security' }
        ].map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 border-b-2 font-medium text-sm ${
              activeSection === section.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>
      
      {/* Profile Settings */}
      {activeSection === 'profile' && (
        <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row">
            {/* Avatar Section */}
            <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src={user.avatarUrl} 
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
                Change Avatar
              </button>
            </div>
            
            {/* Profile Form */}
            <div className="md:w-2/3">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text" 
                      className={`w-full p-2 rounded-md border ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                      defaultValue={user.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className={`w-full p-2 rounded-md border ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                      defaultValue={user.email}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input 
                      type="text" 
                      className={`w-full p-2 rounded-md border ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                      defaultValue={user.country}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <select
                      className={`w-full p-2 rounded-md border ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                      defaultValue={user.language}
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
                    className={`w-full p-2 rounded-md border ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                    rows="4"
                    defaultValue={user.bio}
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Learning Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {["AI", "UX Design", "Entrepreneurship", "Frontend", "Backend", "Mobile Dev", "Data Science", "Cloud Computing"].map((interest) => (
                      <label 
                        key={interest} 
                        className={`px-3 py-2 text-sm rounded-md flex items-center ${
                          user.learningInterests.includes(interest)
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          className="mr-2"
                          defaultChecked={user.learningInterests.includes(interest)}
                        />
                        {interest}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Account Settings */}
      {activeSection === 'account' && (
        <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-6">Account Information</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Subscription</h3>
            <div className={`p-4 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{user.subscriptionStatus} Plan</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Renews on May 23, 2025
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
                  Manage Plan
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Password</h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Current Password</label>
                  <input 
                    type="password" 
                    className={`w-full p-2 rounded-md border ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <input 
                      type="password" 
                      className={`w-full p-2 rounded-md border ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                      placeholder="New password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      className={`w-full p-2 rounded-md border ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
            <div className={`p-4 rounded-md border border-red-300 ${darkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-50'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-red-600 dark:text-red-400">Delete Account</p>
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
      
      {/* Notifications Settings */}
      {activeSection === 'notifications' && (
        <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Email Notifications</h3>
              <div className="space-y-3">
                {[
                  "Session reminders",
                  "New messages",
                  "Learning goal updates",
                  "Community updates",
                  "Platform news and features"
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <label className="flex-1">{item}</label>
                    <div className="relative inline-block w-12 h-6 rounded-full">
                      <input 
                        type="checkbox" 
                        defaultChecked 
                        className="sr-only peer"
                      />
                      <span className={`
                        absolute inset-0 rounded-full cursor-pointer transition-colors
                        peer-checked:bg-blue-600 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}
                      `}></span>
                      <span className={`
                        absolute h-4 w-4 left-1 top-1 bg-white rounded-full transition-transform
                        peer-checked:translate-x-6
                      `}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Push Notifications</h3>
              <div className="space-y-3">
                {[
                  "Session reminders",
                  "New messages",
                  "Learning goal deadlines",
                  "Achievement unlocked"
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <label className="flex-1">{item}</label>
                    <div className="relative inline-block w-12 h-6 rounded-full">
                      <input 
                        type="checkbox" 
                        defaultChecked 
                        className="sr-only peer"
                      />
                      <span className={`
                        absolute inset-0 rounded-full cursor-pointer transition-colors
                        peer-checked:bg-blue-600 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}
                      `}></span>
                      <span className={`
                        absolute h-4 w-4 left-1 top-1 bg-white rounded-full transition-transform
                        peer-checked:translate-x-6
                      `}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Privacy & Security Settings */}
      {activeSection === 'privacy' && (
        <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-6">Privacy & Security</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Privacy Options</h3>
              <div className="space-y-3">
                {[
                  "Show my profile to other learners",
                  "Share my learning goals publicly",
                  "Allow my portfolio to be visible to non-members",
                  "Include me in the community directory"
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <label className="flex-1">{item}</label>
                    <div className="relative inline-block w-12 h-6 rounded-full">
                      <input 
                        type="checkbox" 
                        defaultChecked={item === "Show my profile to other learners"}
                        className="sr-only peer"
                      />
                      <span className={`
                        absolute inset-0 rounded-full cursor-pointer transition-colors
                        peer-checked:bg-blue-600 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}
                      `}></span>
                      <span className={`
                        absolute h-4 w-4 left-1 top-1 bg-white rounded-full transition-transform
                        peer-checked:translate-x-6
                      `}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Security</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p>Two-Factor Authentication</p>
                    <div className="relative inline-block w-12 h-6 rounded-full">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                      />
                      <span className={`
                        absolute inset-0 rounded-full cursor-pointer transition-colors
                        peer-checked:bg-blue-600 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}
                      `}></span>
                      <span className={`
                        absolute h-4 w-4 left-1 top-1 bg-white rounded-full transition-transform
                        peer-checked:translate-x-6
                      `}></span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Secure your account by requiring a second form of authentication when logging in.
                  </p>
                </div>
                
                <div>
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                    Active Sessions &amp; Devices
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    View and manage your active sessions and connected devices.
                  </p>
                </div>
                
                <div>
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                    Login History
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Review recent login attempts and activities.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default LearnerDashboard;

  

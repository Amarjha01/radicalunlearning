import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, Calendar, Globe, Shield, Ban, ShieldCheck, ExternalLink, Clock, MapPin, BookOpen, Award, Users, Star } from 'lucide-react';
import API from '../../../common/apis/ServerBaseURL';
import axios from 'axios';
import { LuLoader } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';

const UserDetails = ({ userEmail, role , deleteUser }) => {
  const [user, setUserData] = useState({});
  console.log(user);
  
  const [loading , setLoading] = useState(false)
  const fetchUserData = async (userEmail, role) => {
    try {
      if (role === "educator") {
        const response = await axios.post(API.educatorsDetailedData.url, { email: userEmail }, {
          withCredentials: true
        });
        if (response.status === 200) {
          setUserData(response.data.data);
        }
      } else {
        const response = await axios.post(API.getlearnerDataDetails.url, { email: userEmail }, {
          withCredentials: true
        });
        if (response.status === 200) {
          setUserData(response.data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching detailed data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(userEmail, role);
    // eslint-disable-next-line
  }, []);

  if (!user || Object.keys(user).length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-green-50 text-center border border-amber-200 shadow-lg">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-green-100 flex items-center justify-center">
          <User className="w-8 h-8 text-amber-600" />
        </div>
        <p className="text-gray-700 font-medium text-lg">No user data available.</p>
        <p className="text-gray-500 text-sm mt-2">Please try refreshing or check your connection.</p>
      </div>
    );
  }

  const handleSuspendUser = async () => {
    setLoading(true)
    try {
      const response = await axios.post(API.suspendUser.url, { role: user.role, _id: user._id },
        { withCredentials: true }
      );
      if (response.status === 200) {
        const updatedUser = response.data.data;
        setUserData(updatedUser); 
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
   const handleDeleteUser = async()=>{
    try {
      setLoading(true)
     await deleteUser(user.email , user.role)
     setLoading(false)
    } catch (error) {
      
    }
   }
  const getFieldIcon = (key) => {
    const iconMap = {
      email: Mail,
      phone: Phone,
      phoneNumber: Phone,
      dateOfBirth: Calendar,
      dob: Calendar,
      website: Globe,
      role: Shield,
      suspended: user.suspended === "YES" ? Ban : ShieldCheck,
      createdAt: Clock,
      updatedAt: Clock,
      location: MapPin,
      address: MapPin,
      education: BookOpen,
      experience: Award,
      skills: Star,
      courses: BookOpen,
      students: Users,
      default: User
    };
    const IconComponent = iconMap[key.toLowerCase()] || iconMap.default;
    return <IconComponent className="w-4 h-4" />;
  };

  const getStatusColor = (key, value) => {
    if (key === 'suspended') {
      return value === "YES" ? 'bg-red-100 text-red-800 border-red-200' : 'bg-green-100 text-green-800 border-green-200';
    }
    if (typeof value === 'boolean') {
      return value ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200';
    }
    return 'bg-amber-50 text-amber-800 border-amber-200';
  };

  // Helper: What property to show for object arrays? Customize as needed:
  const renderObjectItem = (item) => {
    if (!item || typeof item !== "object") return String(item || "N/A");
    if ('text' in item) return item.text;
    if ('name' in item) return item.name;
    if ('title' in item) return item.title;
    if ('email' in item) return item.email;
    return JSON.stringify(item);
  };

  return (
    <div className="p-1 w-full max-w-5xl mx-auto min-h-screen sticky top-1 ">
      {/* Header */}
      <div className="px-8 py-1 bg-gradient-to-r from-amber-100 to-green-100 border-b-2 border-amber-200 rounded-t-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-green-200 flex items-center justify-center mr-4 shadow-lg">
              <User className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                User Details
              </h2>
              <p className="text-gray-600 text-sm mt-1">Comprehensive user information</p>
            </div>
          </div>
  <actionButtom className=" flex justify-center gap-10">
  <button disabled={loading} onClick={()=>(handleDeleteUser())} className={`text-3xl text-red-600 `}>
      
      {loading ? <LuLoader className={`animate-spin`} /> : <MdDelete className=' cursor-pointer' /> }
    </button>
          <button
          // disabled={}
            onClick={handleSuspendUser}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
              user.suspended === "YES"
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              {user.suspended === "YES" ? <ShieldCheck className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
              {user.suspended === "YES" ? 'Unsuspend User' : 'Suspend User'}
            </div>
          </button>
  </actionButtom>
        </div>
      </div>
      <div className='h-[80vh] overflow-y-scroll'>
        <div className="overflow-hidden shadow-2xl bg-gradient-to-br from-amber-50 via-yellow-50 to-green-50 border-2 border-amber-200">
          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(user).map(([key, value]) => {
                if (key === 'password' || key === 'otp') return null;

                let displayValue;
                // Array (could be of primitives or objects)
                if (Array.isArray(value)) {
                  // Filter out null or undefined items before rendering
                  const safeArrayItems = value.filter(item => item != null);
                  displayValue = safeArrayItems.length ? (
                    <div className="flex flex-wrap gap-2">
                      {safeArrayItems.map((item, index) => (
                        <span key={(item && item._id) || index}
                          className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium border border-amber-200">
                          {renderObjectItem(item)}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 italic">No items</span>
                  );
                } else if (typeof value === 'boolean') {
                  displayValue = (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(key, value)}`}>
                      {value ? 'Yes' : 'No'}
                    </span>
                  );
                } else if (typeof value === 'string' && value.startsWith('http')) {
                  displayValue = (
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700 underline decoration-2 underline-offset-2 transition-colors flex items-center gap-1 group"
                    >
                      <span className="truncate max-w-xs">{value}</span>
                      <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform" />
                    </a>
                  );
                } else if (typeof value === 'object' && value !== null) {
                  // Common date format
                  if (value.day && value.month && value.year) {
                    displayValue = (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{value.day}/{value.month}/{value.year}</span>
                      </div>
                    );
                  } else {
                    // fallback: show JSON object pretty
                    displayValue = (
                      <pre className="text-sm bg-gray-100 p-2 rounded-lg overflow-x-auto">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    );
                  }
                } else {
                  displayValue = value !== undefined && value !== null && value !== "" 
                    ? value 
                    : <span className="text-gray-500 italic">Not provided</span>;
                }

                const formattedKey = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase());

                return (
                  <div key={key} className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-green-200 flex items-center justify-center">
                        {getFieldIcon(key)}
                      </div>
                      <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        {formattedKey}
                      </div>
                    </div>
                    <div className="text-gray-800 font-medium text-lg leading-relaxed">
                      {displayValue}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="px-8 py-4 bg-gradient-to-r from-amber-100 to-green-100 border-t-2 border-amber-200 rounded-b-3xl">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Clock className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

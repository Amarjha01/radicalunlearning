import React, { use, useEffect, useState } from 'react';
import API from '../../../common/apis/ServerBaseURL';
import axios from 'axios';

const UserDetails = ({ userEmail , role }) => {
  const [user, setUserData] = useState({});


const fetchUserData = async (userEmail , role) => {
  
  try {
    if(role === "educator"){
const fetchEducatorsDetailedData = async () => {
    try {
      const response = await axios.post(API.educatorsDetailedData.url, {email: userEmail, }, {
        withCredentials:true
      });

      if (response.status === 200) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching detailed data:", error);
    }
  };
  fetchEducatorsDetailedData();
}else{
  const fetchLearnerDetailedData = async () => {
    try {
      const response = await axios.post(API.getlearnerDataDetails.url, {email: userEmail,}, {
        withCredentials:true
      });

      if (response.status === 200) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching detailed data:", error);
    }
  };
  fetchLearnerDetailedData();
}
  } catch (error) {
    console.log(error);
    
  }
}

  

  useEffect(() => {
fetchUserData(userEmail , role)
  },[])

  if (!user || Object.keys(user).length === 0) {
    return (
      <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-center">
        <p className="text-gray-300 font-medium">No user data available.</p>
      </div>
    );
  }

const handleSuspendUser = async() => {
try {
  const response = await axios.post(API.suspendUser.url, {role:user.role , _id:user._id},
  {withCredentials:true}
)
  if (response.status === 200) {
    const updatedUser = response.data.data;
    console.log("Updated user data:", updatedUser);
    
  }
} catch (error) {
  console.log(error);
  
}
}
  return (
    <div className="p-4 w-full max-w-4xl">
      <div className="rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 backdrop-blur-sm">
        <div className="px-6 py-4 border-b border-indigo-500/30">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" className="text-indigo-400" />
            </svg>
            User Details
          </h2>
          <button onClick={handleSuspendUser} className=' text-white px-2 py-0.5 bg-red-700 rounded-2xl cursor-pointer'>
            {user.suspended === "YES"? 'Unsuspend' : 'Suspend'}
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {Object.entries(user).map(([key, value]) => {
              if (key === 'password' || key === 'otp') return null;
              
              let displayValue;
              
              if (Array.isArray(value)) {
                displayValue = value.length ? value.join(', ') : 'N/A';
              } else if (typeof value === 'boolean') {
                displayValue = value ? 
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Yes</span> : 
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">No</span>;
              } else if (typeof value === 'string' && value.startsWith('http')) {
                displayValue = (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
                  >
                    {value}
                  </a>
                );
              } else {
                displayValue = value || 'N/A';
              }
              
              const formattedKey = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase());
              
              return (
                <div key={key} className="bg-indigo-900/20 p-3 rounded-lg border border-indigo-500/20 backdrop-blur-sm">
                  <div className="text-xs font-medium text-indigo-300 mb-1">{formattedKey}</div>
                  <div className="text-gray-200 font-medium">{displayValue}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
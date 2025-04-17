import React from 'react';

const UserDetails = ({ user }) => {
  if (!user || Object.keys(user).length === 0) {
    return <p className="p-4">No user data available.</p>;
  }

  return (
    <div className="p-4 h-fit">
      <div className="h-fit border rounded-lg p-4 mb-6 shadow bg-white">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">User Details</h2>
        <div className="flex flex-col gap-4 text-sm text-gray-800">
          {Object.entries(user).map(([key, value]) => {
            if (key === 'password' || key === 'otp') return null;

            let displayValue;

            if (Array.isArray(value)) {
              displayValue = value.length ? value.join(', ') : 'N/A';
            } else if (typeof value === 'boolean') {
              displayValue = value ? 'Yes' : 'No';
            } else if (typeof value === 'string' && value.startsWith('http')) {
              displayValue = (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
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
              <div key={key} className="text-start">
                <span className="font-medium">{formattedKey} : </span>
                <span className="text-gray-600">{displayValue}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

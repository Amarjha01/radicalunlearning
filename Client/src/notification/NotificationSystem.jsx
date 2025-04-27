import { useState, useEffect } from 'react';
import { 
  FiAlertCircle, 
  FiCheckCircle, 
  FiLock, 
  FiInfo, 
  FiX,
  FiWifi,
  FiShield
} from 'react-icons/fi';

// Notification types with their properties
const notificationTypes = {
  success: {
    icon: <FiCheckCircle className="text-green-400" size={24} />,
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-400',
    pulseColor: 'bg-green-400',
    title: 'Success'
  },
  error: {
    icon: <FiAlertCircle className="text-red-400" size={24} />,
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-400',
    pulseColor: 'bg-red-400',
    title: 'Error'
  },
  unauthorized: {
    icon: <FiLock className="text-yellow-400" size={24} />,
    bgColor: 'bg-yellow-900/20',
    borderColor: 'border-yellow-400',
    pulseColor: 'bg-yellow-400',
    title: 'Access Denied'
  },
  info: {
    icon: <FiInfo className="text-blue-400" size={24} />,
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-400',
    pulseColor: 'bg-blue-400',
    title: 'Information'
  },
  network: {
    icon: <FiWifi className="text-purple-400" size={24} />,
    bgColor: 'bg-purple-900/20',
    borderColor: 'border-purple-400',
    pulseColor: 'bg-purple-400',
    title: 'Network Status'
  },
  security: {
    icon: <FiShield className="text-cyan-400" size={24} />,
    bgColor: 'bg-cyan-900/20',
    borderColor: 'border-cyan-400',
    pulseColor: 'bg-cyan-400',
    title: 'Security Alert'
  }
};

// Individual Notification Component
const Notification = ({ id, type, message, onClose, duration = 5000 }) => {
  const notificationType = notificationTypes[type] || notificationTypes.info;
  
  useEffect(() => {
    // Auto-close notification after duration
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);
  
  return (
    <div 
      className={`w-full overflow-hidden rounded-lg backdrop-blur-md bg-gray-900/70 border-l-4 ${notificationType.borderColor} ${notificationType.bgColor} shadow-lg transform transition-all duration-500 ease-out`}
      style={{animation: 'slideIn 0.5s forwards'}}
    >
      <div className="flex items-center p-4">
        <div className="relative flex-shrink-0">
          {notificationType.icon}
          <span className={`absolute inset-0 rounded-full ${notificationType.pulseColor} opacity-30`} style={{animation: 'pulse 2s infinite'}}></span>
        </div>
        
        <div className="ml-4 flex-grow">
          <h4 className="text-sm font-medium text-white mb-1">
            {notificationType.title}
          </h4>
          <p className="text-xs text-gray-300">
            {message}
          </p>
        </div>
        
        <button 
          onClick={() => onClose(id)}
          className="ml-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <FiX size={18} />
        </button>
      </div>
      
      <div className="h-1 w-full bg-gray-800">
        <div 
          className={`h-full ${notificationType.borderColor.replace('border', 'bg')}`}
          style={{
            width: '100%', 
            animation: `shrink ${duration/1000}s linear forwards`
          }}
        ></div>
      </div>
    </div>
  );
};

// Notification Container/Manager
export default function NotificationSystem() {
  const [notifications, setNotifications] = useState([]);

  // Add a new notification
  const addNotification = (type, message, duration = 5000) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message, duration }]);
    return id;
  };

  // Remove a notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // For demo purposes - adding example notifications
  const showExampleNotification = (type) => {
    const messages = {
      success: "Operation completed successfully!",
      error: "Something went wrong. Please try again.",
      unauthorized: "You don't have permission to access this resource.",
      info: "System maintenance scheduled for tonight.",
      network: "Your connection has been restored.",
      security: "Your account has unusual login activity."
    };
    
    addNotification(type, messages[type]);
  };

  // Add global CSS for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.3; }
        50% { transform: scale(1.1); opacity: 0.2; }
        100% { transform: scale(1); opacity: 0.3; }
      }
      @keyframes shrink {
        from { width: 100%; }
        to { width: 0%; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Demo controls - you can remove this in production */}
      <div className="mb-12 w-full max-w-md p-6 bg-gray-800/70 backdrop-blur-md rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-white text-xl font-bold mb-4 text-center">Notification Demo</h2>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => showExampleNotification('success')}
            className="bg-green-900/50 hover:bg-green-800/70 text-green-400 py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            Success
          </button>
          <button 
            onClick={() => showExampleNotification('error')}
            className="bg-red-900/50 hover:bg-red-800/70 text-red-400 py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            Error
          </button>
          <button 
            onClick={() => showExampleNotification('unauthorized')}
            className="bg-yellow-900/50 hover:bg-yellow-800/70 text-yellow-400 py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            Unauthorized
          </button>
          <button 
            onClick={() => showExampleNotification('info')}
            className="bg-blue-900/50 hover:bg-blue-800/70 text-blue-400 py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            Info
          </button>
          <button 
            onClick={() => showExampleNotification('network')}
            className="bg-purple-900/50 hover:bg-purple-800/70 text-purple-400 py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            Network
          </button>
          <button 
            onClick={() => showExampleNotification('security')}
            className="bg-cyan-900/50 hover:bg-cyan-800/70 text-cyan-400 py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            Security
          </button>
        </div>
      </div>
      
      {/* Notification container - fixed position */}
      <div className="fixed top-4 right-4 z-50 flex flex-col space-y-3 w-80 max-w-full">
        {notifications.map(({ id, type, message, duration }) => (
          <Notification
            key={id}
            id={id}
            type={type}
            message={message}
            duration={duration}
            onClose={removeNotification}
          />
        ))}
      </div>
    </div>
  );
}
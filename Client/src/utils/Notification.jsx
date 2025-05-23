import { toast } from 'react-toastify';
import { 
  FiAlertCircle, 
  FiCheckCircle, 
  FiLock, 
  FiInfo, 
  FiX,
  FiWifi,
  FiShield
} from 'react-icons/fi';
import { FaShieldAlt } from 'react-icons/fa';
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
export const showSuccessToast = (message) => {
  toast.success(
    <div className="flex items-center">
      <div>
        <FiCheckCircle className="text-green-500 text-2xl mr-3 icon1" />
      </div>
      <div>
        <p className="font-semibold text-green-600">Success</p>
        <p className="text-sm text-green-800">{message}</p>
      </div>
    </div>,
    {
      className: 'custom-toast custome-toast-border-success',
      progressClassName: '',
      closeButton: true,
      icon: false,
    }
  );
};

export const showErrorToast = (message) => {
  toast.error(
    <div className="flex items-center">
      <FiAlertCircle className="text-red-500 text-xl mr-3 icon2" />
      <div>
        <p className="font-semibold text-red-600">Error</p>
        <p className="text-sm text-red-800">{message}</p>
      </div>
    </div>,
    {
      className: 'custom-toast custome-toast-border-error',
      progressClassName: '',
      closeButton: true,
      icon: false,
    }
  );
};
export const showAccessDeniedToast = (message) => {
  toast.warn(
    <div className="flex items-center">
      <FiLock className="text-yellow-500 text-xl mr-3 icon3" />
      <div>
        <p className="font-semibold text-yellow-600">Access Denied</p>
        <p className="text-sm text-yellow-800">{message}</p>
      </div>
    </div>,
    {
      className: 'custom-toast custome-toast-border-warn',
      progressClassName: '',
      closeButton: true,
      icon: false,
    }
  );
};
export const showSecurityAlertToast = (message) => {
  toast.warn(
    <div className="flex items-center">
      <FiShield className="text-cyan-500 text-xl mr-3 icon4" />
      <div>
        <p className="font-semibold text-cyan-600">Security Alert</p>
        <p className="text-sm text-cyan-800">{message}</p>
      </div>
    </div>,
    {
      className: 'custom-toast custome-toast-security-alert',
      progressClassName: 'cyan',
      closeButton: true,
      icon: false,
    }
  );
};
export const showNetworkErrorToast = (message) => {
  toast.warn(
    <div className="flex items-center">
      <FiWifi className="text-purple-500 text-2xl mr-3 icon5" />
      <div>
        <p className="font-semibold text-purple-600">Network Status</p>
        <p className="text-sm text-purple-800">{message}</p>
      </div>
    </div>,
    {
      className: 'custom-toast custome-toast-network-alert',
      progressClassName: 'purple',
      closeButton: true,
      icon: false,
    }
  );
};



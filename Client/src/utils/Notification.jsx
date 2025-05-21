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
    <div className="flex items-center ">
      <div className=''>
        <FiCheckCircle className="text-green-500 text-2xl mr-2" />
      </div>
      <div>
        <p className="font-semibold text-green-600">Success</p>
        <p className="text-sm text-green-800">{message}</p>
      </div>
    </div>,
    {
      className: 'custom-toast',
      progressClassName: 'progressClassNam',
      closeButton: true,
      icon: false,
    }
  );
};

export const showErrorToast = (message) => {
  toast.error(
    <div className="flex items-center">
      <FiAlertCircle className="text-red-500 text-xl mr-3" />
      <div>
        <p className="font-semibold text-red-600">Error</p>
        <p className="text-sm text-red-800">{message}</p>
      </div>
    </div>,
    {
      className: 'custom-toast',
      progressClassName: '',
      closeButton: true,
      icon: false,
    }
  );
};

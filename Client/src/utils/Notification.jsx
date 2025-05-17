import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const showSuccessToast = (message) => {
  toast.success(
    <div className="flex items-center">
      <FaCheckCircle className="text-green-500 text-xl mr-3" />
      <div>
        <p className="font-semibold text-white">Success</p>
        <p className="text-sm text-gray-200">{message}</p>
      </div>
    </div>,
    {
      className: 'custom-toast custom-toast.pulse',
      progressClassName: 'custom-toast-progress',
      closeButton: true,
      icon: false,
    }
  );
};

export const showErrorToast = (message) => {
  toast.error(
    <div className="flex items-center">
      <FaTimesCircle className="text-red-500 text-xl mr-3" />
      <div>
        <p className="font-semibold text-white">Error</p>
        <p className="text-sm text-gray-200">{message}</p>
      </div>
    </div>,
    {
      className: 'custom-toast',
      progressClassName: 'custom-toast-progress',
      closeButton: true,
      icon: false,
    }
  );
};

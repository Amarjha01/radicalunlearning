import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const showSuccessToast = (message) => {
  toast.success(
    <div className="flex items-center">
      <FaCheckCircle className="text-green-500 text-xl mr-3" />
      <div>
        <p className="font-semibold text-green-600">Success</p>
        <p className="text-sm text-green-800">{message}</p>
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

export const showErrorToast = (message) => {
  toast.error(
    <div className="flex items-center">
      <FaTimesCircle className="text-red-500 text-xl mr-3" />
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

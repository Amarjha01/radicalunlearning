import { useState } from 'react';
import NotificationSystem from './NotificationSystem'; // Adjust the path based on your file structure
import './c.css'
export default function Noti() {
  const [notification, setNotification] = useState(null);

  const showSuccess = () => {
    setNotification({
      type: 'success',
      message: 'The operation was successful!'
    });
  };

  const showError = () => {
    setNotification({
      type: 'error',
      message: 'Something went wrong!'
    });
  };

  const showUnauthorized = () => {
    setNotification({
      type: 'unauthorized',
      message: 'You do not have permission to access this resource.'
    });
  };

  const showInfo = () => {
    setNotification({
      type: 'info',
      message: 'This is some information for you.'
    });
  };

  const showNetwork = () => {
    setNotification({
      type: 'network',
      message: 'Your network connection is unstable.'
    });
  };

  const showSecurityAlert = () => {
    setNotification({
      type: 'security',
      message: 'Your account security has been updated.'
    });
  };

  return (
    <div className="App">
      {/* NotificationSystem listens for changes in notifications state */}
      <NotificationSystem 
        type={notification?.type} 
        message={notification?.message} 
        duration={5000} 
      />

      {/* Example buttons to trigger notifications */}
      <div className="flex flex-col space-y-4 p-4 h-[100vh] w-full justify-center items-center bg-blue-950">
        <button onClick={()=>{
            showSuccess()
            showError()
            showUnauthorized()
            showInfo()
        }}>all</button>
        <button onClick={showSuccess} className="btn-success">Show Success</button>
        <button onClick={showError} className="btn-error">Show Error</button>
        <button onClick={showUnauthorized} className="btn-unauthorized">Show Unauthorized</button>
        <button onClick={showInfo} className="btn-info">Show Info</button>
        <button onClick={showNetwork} className="btn-network">Show Network</button>
        <button onClick={showSecurityAlert} className="btn-security">Show Security Alert</button>
      </div>
    </div>
  );
}

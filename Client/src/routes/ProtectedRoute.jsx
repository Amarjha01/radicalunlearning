// src/routes/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const user = useSelector((state) => state.user);

  if (!user || !user.userData) {
    return <Navigate to="/signin" replace />;
  }

  if (role && user.userData.role.toLowerCase() !== role.toLowerCase()) {
    return <h2 className="text-center text-2xl mt-10 text-red-500">Unauthorized Access</h2>;
  }

  return children;
};

export default ProtectedRoute;

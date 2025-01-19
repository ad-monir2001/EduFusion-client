import useRole from '../hooks/useRole';
import LoadingSpinner from '../Components/Shared/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (role === 'admin') return children;

  return <Navigate to="/dashboard" replace="true"></Navigate>;
};

export default AdminRoute;

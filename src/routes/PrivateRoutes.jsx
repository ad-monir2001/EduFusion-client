import LoadingSpinner from '../Components/Shared/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner></LoadingSpinner>;

  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoutes;

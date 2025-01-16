import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../Components/Shared/LoadingSpinner';
import useRole from '../hooks/useRole';

const StudentRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (role === 'student') return children;

  return <Navigate to="/dashboard" replace="true"></Navigate>;
};

export default StudentRoute;

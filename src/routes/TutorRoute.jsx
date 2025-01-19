import React from 'react';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../Components/Shared/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const TutorRoute = ({children}) => {
    const [role, loading] = useRole()
    if(loading) return <LoadingSpinner></LoadingSpinner>
    if(role === 'tutor') return children
    return <Navigate to="/dashboard" replace="true"></Navigate>;
};

export default TutorRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.userDetails);

  if (!user.isActive) {
    return <Navigate to="/user/auth" />;
  }

  return children;
};

export default ProtectedRoute;

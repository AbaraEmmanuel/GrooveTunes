import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { currentUser } = useAuth();

  // Redirect to login page if user is not authenticated
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;

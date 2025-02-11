// src/components/ProtectedAdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Redirect to login if no token found
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Decode the token
    const decodedToken = jwtDecode(token);

    // Check if the role is admin
    if (decodedToken.role !== 'admin') {
      return <Navigate to="/unauthorized" />;
    }

    // If the role is admin, allow access
    return children;

  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedAdminRoute;

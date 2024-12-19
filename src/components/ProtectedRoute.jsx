// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// ProtectedRoute will handle redirection based on authentication and roles
const ProtectedRoute = ({ element: Element, isLoggedIn, isAdmin, requiredRole, ...rest }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && requiredRole !== (isAdmin ? 'admin' : 'user')) {
    return <Navigate to="/" />;
  }

  // If the user is logged in and has the correct role, render the element
  return <Element {...rest} />;
};

export default ProtectedRoute;

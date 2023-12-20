// Checks if the user has a valid JWT and if not, redirects to login page

import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    }
    return false;
  };

  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

export default PrivateRoute;

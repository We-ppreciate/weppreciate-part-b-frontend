// Checks if a user is authorised before accessing a page restricted to logged in users, redirects to login if invalid

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/Authentication/AuthContext';


const PrivateRoute = ({ element }) => {
  const { authenticated } = useAuth();

  return authenticated ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

export default PrivateRoute;

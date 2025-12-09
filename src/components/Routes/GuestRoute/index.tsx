import React from 'react';
import useAuthStatus from '@hooks/useAuthStatus';
import { Navigate } from 'react-router-dom';

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const { isLoggedIn } = useAuthStatus();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;

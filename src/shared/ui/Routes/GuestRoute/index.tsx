import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '@/features/auth/model/useAuthStatus';

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

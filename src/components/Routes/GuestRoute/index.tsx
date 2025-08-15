import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserInfoQuery from '@hooks/queries/useUserInfoQuery';

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const { data: userInfo, isError } = useUserInfoQuery();

  const hasToken = !!localStorage.getItem('accessToken');
  const isLoggedIn = hasToken && !!userInfo && !isError;

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '@/features/auth/model/useAuthStatus';
import { eventManager } from '@/shared/lib';

interface ClientRouteProps {
  children: React.ReactNode;
}

const ClientRoute = ({ children }: ClientRouteProps) => {
  const { isLoggedIn, isProvider, isLoading } = useAuthStatus();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      eventManager.emit('openLoginModal');
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading || !isLoggedIn) {
    return null;
  }

  if (isProvider) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default ClientRoute;

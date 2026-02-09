import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '@/features/auth/hooks/useAuthStatus';
import { eventManager } from '@/shared/utils';

interface ProviderRouteProps {
  children: React.ReactNode;
}

const ProviderRoute = ({ children }: ProviderRouteProps) => {
  const { isLoggedIn, isProvider, isLoading } = useAuthStatus();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      eventManager.emit('openLoginModal');
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading || !isLoggedIn) {
    return null;
  }

  if (!isProvider) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default ProviderRoute;

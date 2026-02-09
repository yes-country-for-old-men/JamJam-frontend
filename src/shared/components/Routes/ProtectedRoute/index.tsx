import React, { useEffect } from 'react';
import { useAuthStatus } from '@/features/auth/hooks/useAuthStatus';
import { eventManager } from '@/shared/utils';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, isLoading } = useAuthStatus();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      eventManager.emit('openLoginModal');
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading || !isLoggedIn) {
    return null;
  }

  return children;
};

export default ProtectedRoute;

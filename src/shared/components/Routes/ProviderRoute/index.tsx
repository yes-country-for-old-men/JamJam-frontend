import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LoginModal from '@/features/auth/components/LoginModal';
import { useAuthStatus } from '@/features/auth/hooks/useAuthStatus';
import { useModal } from '@/shared/hooks/useModal';

interface ProviderRouteProps {
  children: React.ReactNode;
}

const ProviderRoute = ({ children }: ProviderRouteProps) => {
  const { openModal } = useModal();
  const { isLoggedIn, isProvider, isLoading } = useAuthStatus();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      openModal({
        id: 'login-modal',
        content: <LoginModal />,
      });
    }
  }, [isLoggedIn, isLoading, openModal]);

  if (isLoading || !isLoggedIn) {
    return null;
  }

  if (!isProvider) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default ProviderRoute;

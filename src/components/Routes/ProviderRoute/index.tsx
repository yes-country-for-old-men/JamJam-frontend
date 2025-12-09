import React, { useEffect } from 'react';
import LoginModal from '@components/Modal/LoginModal';
import useAuthStatus from '@hooks/useAuthStatus';
import useModal from '@hooks/useModal';
import { Navigate } from 'react-router-dom';

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

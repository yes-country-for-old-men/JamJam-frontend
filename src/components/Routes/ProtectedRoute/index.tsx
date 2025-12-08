import React, { useEffect } from 'react';
import useModal from '@hooks/useModal';
import useAuthStatus from '@hooks/useAuthStatus';
import LoginModal from '@components/Modal/LoginModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { openModal } = useModal();
  const { isLoggedIn, isLoading } = useAuthStatus();

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

  return children;
};

export default ProtectedRoute;

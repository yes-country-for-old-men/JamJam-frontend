import React, { useEffect } from 'react';
import LoginModal from '@/features/auth/components/LoginModal';
import useAuthStatus from '@/features/auth/hooks/useAuthStatus';
import useModal from '@/shared/hooks/useModal';

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

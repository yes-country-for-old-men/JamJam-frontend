import React, { useEffect } from 'react';
import useModal from '@hooks/useModal';
import useUserInfoQuery from '@hooks/queries/useUserInfoQuery';
import LoginModal from '@components/Modal/LoginModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { openModal } = useModal();
  const { data: userInfo, isError, isLoading } = useUserInfoQuery();

  const hasToken = !!localStorage.getItem('accessToken');
  const isLoggedIn = hasToken && !!userInfo && !isError;

  useEffect(() => {
    if (!hasToken || (hasToken && isError)) {
      openModal({
        id: 'login-modal',
        content: <LoginModal />,
      });
    }
  }, [hasToken, isError, openModal]);

  if (isLoading || !isLoggedIn) {
    return null;
  }

  return children;
};

export default ProtectedRoute;

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useModal from '@hooks/useModal';
import useUserInfoQuery from '@hooks/queries/useUserInfoQuery';
import LoginModal from '@components/Modal/LoginModal';

interface ProviderRouteProps {
  children: React.ReactNode;
}

const ProviderRoute = ({ children }: ProviderRouteProps) => {
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

  if (userInfo.role !== 'PROVIDER') {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default ProviderRoute;

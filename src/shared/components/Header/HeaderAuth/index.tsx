import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '@/features/auth/hooks/useAuthStatus';
import UserMenu from '@/shared/components/Header/UserMenu';
import { eventManager } from '@/shared/utils';
import * as S from './HeaderAuth.styles';

const HeaderAuth = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, userInfo } = useAuthStatus();

  const handleLoginClick = () => {
    eventManager.emit('openLoginModal');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  if (isLoading) {
    return null;
  }

  if (isLoggedIn && userInfo) {
    return <UserMenu userInfo={userInfo} />;
  }

  return (
    <S.HeaderContent>
      <S.SignInButton onClick={handleLoginClick}>로그인</S.SignInButton>
      <S.SignUpButton onClick={handleSignupClick}>회원가입</S.SignUpButton>
    </S.HeaderContent>
  );
};

export default HeaderAuth;

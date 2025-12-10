import UserMenu from '@components/Header/UserMenu';
import LoginModal from '@components/Modal/LoginModal';
import useAuthStatus from '@hooks/useAuthStatus';
import useModal from '@hooks/useModal';
import { useNavigate } from 'react-router-dom';
import * as S from './HeaderAuth.styles';

const HeaderAuth = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { isLoggedIn, isLoading, userInfo } = useAuthStatus();

  const handleLoginClick = () => {
    openModal({
      id: 'login-modal',
      content: <LoginModal />,
    });
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

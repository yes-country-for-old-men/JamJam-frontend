import UserMenu from '@components/Header/UserMenu';
import LoginModal from '@components/Modal/LoginModal';
import styled from '@emotion/styled';
import useAuthStatus from '@hooks/useAuthStatus';
import useModal from '@hooks/useModal';
import { useNavigate } from 'react-router-dom';

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const SignInButton = styled.button`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 12px;
  margin-right: 12px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const SignUpButton = styled.button`
  display: flex;
  background-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  color: white;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 12px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

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
    <HeaderContent>
      <SignInButton onClick={handleLoginClick}>로그인</SignInButton>
      <SignUpButton onClick={handleSignupClick}>회원가입</SignUpButton>
    </HeaderContent>
  );
};

export default HeaderAuth;

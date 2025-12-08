import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import useModal from '@hooks/useModal';
import useAuthStatus from '@hooks/useAuthStatus';
import LoginModal from '@components/Modal/LoginModal';
import UserMenu from '@components/Header/UserMenu';

const ANIMATION_VARIANTS = {
  button: {
    rest: { opacity: 1 },
    hover: { opacity: 0.7 },
  },
} as const;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const SignInButton = styled(motion.button)`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 12px;
  margin-right: 12px;
`;

const SignUpButton = styled(motion.button)`
  display: flex;
  background-color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
  color: white;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 12px;
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
      <SignInButton
        variants={ANIMATION_VARIANTS.button}
        initial="rest"
        whileHover="hover"
        transition={{ type: 'tween', duration: 0.2 }}
        onClick={handleLoginClick}
      >
        로그인
      </SignInButton>
      <SignUpButton
        variants={ANIMATION_VARIANTS.button}
        initial="rest"
        whileHover="hover"
        transition={{ type: 'tween', duration: 0.2 }}
        onClick={handleSignupClick}
      >
        회원가입
      </SignUpButton>
    </HeaderContent>
  );
};

export default HeaderAuth;

import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import useModal from '@hooks/useModal';
import LoginModal from '@components/Modal/LoginModal';
import LogoSVG from '@assets/logo.svg?react';

const ANIMATION_VARIANTS = {
  button: {
    rest: { opacity: 1 },
    hover: { opacity: 0.7 },
  },
} as const;

const Container = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
  height: 80px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  padding: 0 24px;
  z-index: 11;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LogoButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  cursor: pointer;
`;

const SignInButton = styled(motion.button)`
  display: flex;
  color: ${(props) => props.theme.COLORS.LABEL_PRIMARY};
  font-size: 14px;
  font-weight: 600;
  padding: 8px 12px;
  cursor: pointer;
`;

const SignUpButton = styled(motion.button)`
  display: flex;
  background-color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
  color: white;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    openModal({
      id: 'login-modal',
      content: <LoginModal />,
    });
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <HeaderContent>
        <LogoButton onClick={handleLogoClick}>
          <LogoSVG />
        </LogoButton>
      </HeaderContent>
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
    </Container>
  );
};

export default Header;

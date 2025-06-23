import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import useModal from '@hooks/useModal';
import useUserInfoQuery from '@hooks/queries/useUserInfoQuery';
import useLogoutMutation from '@hooks/mutations/useLogoutMutation';
import LoginModal from '@components/Modal/LoginModal';
import theme from '@styles/theme';
import LogoSVG from '@assets/logo.svg?react';
import UserProfileImageIcon from '@assets/icons/user-profile-image.svg?react';
import ArrowDownIcon from '@assets/icons/arrow-down.svg?react';

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
  cursor: pointer;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  aspect-ratio: 1;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 16px;
  margin-right: 8px;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  object-fit: cover;
  object-position: center;
`;

const Nickname = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  margin-right: 12px;
`;

const UserMenuContainer = styled.div`
  position: relative;
`;

const UserMenuButton = styled.button`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.COLORS.LABEL_PRIMARY};
  cursor: pointer;
  padding: 0;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 12px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[3]};
  border-radius: 8px;
  overflow: hidden;
  min-width: 120px;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.COLORS.LABEL_PRIMARY};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { data: userInfo, isError, isLoading } = useUserInfoQuery();
  const { mutate: logout } = useLogoutMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasToken = !!localStorage.getItem('accessToken');
  const isLoggedIn = hasToken && !!userInfo && !isError;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleUserMenuClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMyPageClick = () => {
    navigate('/my');
    setIsDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    const confirmed = window.confirm('정말 로그아웃 하시겠습니까?');
    if (!confirmed) return;

    logout();
    setIsDropdownOpen(false);
  };

  const renderAuthSection = () => {
    if (hasToken && isLoading) {
      return null;
    }

    if (isLoggedIn) {
      return (
        <UserMenuContainer ref={dropdownRef}>
          <UserMenuButton onClick={handleUserMenuClick}>
            <HeaderContent>
              <ProfileImageWrapper>
                {userInfo.profileUrl ? (
                  <ProfileImage src={userInfo.profileUrl} alt="profile" />
                ) : (
                  <UserProfileImageIcon />
                )}
              </ProfileImageWrapper>
              <Nickname>{userInfo.nickname} 님</Nickname>
              <motion.div
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              >
                <ArrowDownIcon width={12} fill={theme.COLORS.LABEL_PRIMARY} />
              </motion.div>
            </HeaderContent>
          </UserMenuButton>

          {isDropdownOpen && (
            <DropdownMenu
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownItem onClick={handleMyPageClick}>
                마이페이지
              </DropdownItem>
              <DropdownItem onClick={handleLogoutClick}>로그아웃</DropdownItem>
            </DropdownMenu>
          )}
        </UserMenuContainer>
      );
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

  return (
    <Container>
      <HeaderContent>
        <LogoButton onClick={handleLogoClick}>
          <LogoSVG />
        </LogoButton>
      </HeaderContent>
      {renderAuthSection()}
    </Container>
  );
};

export default Header;

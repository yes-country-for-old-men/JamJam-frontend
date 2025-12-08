import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import useModal from '@hooks/useModal';
import useLogoutMutation from '@hooks/mutations/useLogoutMutation';
import theme from '@styles/theme';
import UserProfileImageIcon from '@assets/icons/user-profile-image.svg?react';
import ArrowDownIcon from '@assets/icons/arrow-down.svg?react';

interface UserMenuProps {
  userInfo: {
    profileUrl?: string;
    nickname: string;
  };
}

const UserMenuContainer = styled.div`
  position: relative;
`;

const UserMenuButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Nickname = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  margin-right: 12px;
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

  &:hover {
    background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  }
`;

const UserMenu = ({ userInfo }: UserMenuProps) => {
  const navigate = useNavigate();
  const { confirm } = useModal();
  const { mutate: logout } = useLogoutMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleUserMenuClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMyPageClick = () => {
    navigate('/my');
    setIsDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    confirm({
      title: '로그아웃',
      content: '정말 로그아웃 하시겠습니까?',
      onConfirm: () => {
        logout();
        setIsDropdownOpen(false);
      },
      confirmText: '로그아웃',
      cancelText: '취소',
    });
  };

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
          <DropdownItem onClick={handleMyPageClick}>마이페이지</DropdownItem>
          <DropdownItem onClick={handleLogoutClick}>로그아웃</DropdownItem>
        </DropdownMenu>
      )}
    </UserMenuContainer>
  );
};

export default UserMenu;

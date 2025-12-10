import { useState, useRef, useEffect } from 'react';
import ArrowDownIcon from '@assets/icons/arrow-down.svg?react';
import UserProfileImageIcon from '@assets/icons/user-profile-image.svg?react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useLogoutMutation from '@hooks/mutations/useLogoutMutation';
import useModal from '@hooks/useModal';
import theme from '@styles/theme';
import { useNavigate } from 'react-router-dom';

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

const ArrowIconWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(${(props) => (props.isOpen ? 180 : 0)}deg);
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 12px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[3]};
  border-radius: 8px;
  overflow: hidden;
  min-width: 120px;
  animation: ${fadeIn} 0.2s ease-out;
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

  const handleLogoutClick = async () => {
    const result = await confirm({
      title: '로그아웃',
      content: '정말 로그아웃 하시겠습니까?',
      confirmText: '로그아웃',
      cancelText: '취소',
    });

    if (result) {
      logout();
      setIsDropdownOpen(false);
    }
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
          <ArrowIconWrapper isOpen={isDropdownOpen}>
            <ArrowDownIcon width={12} fill={theme.COLORS.LABEL.PRIMARY} />
          </ArrowIconWrapper>
        </HeaderContent>
      </UserMenuButton>

      {isDropdownOpen && (
        <DropdownMenu>
          <DropdownItem onClick={handleMyPageClick}>마이페이지</DropdownItem>
          <DropdownItem onClick={handleLogoutClick}>로그아웃</DropdownItem>
        </DropdownMenu>
      )}
    </UserMenuContainer>
  );
};

export default UserMenu;

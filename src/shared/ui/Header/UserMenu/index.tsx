import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@/features/auth/model/useLogoutMutation';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg?react';
import UserProfileImageIcon from '@/shared/assets/icons/user-profile-image.svg?react';
import { useDialog } from '@/shared/lib/useDialog';
import theme from '@/shared/styles/theme';
import * as S from './UserMenu.styles';

interface UserMenuProps {
  userInfo: {
    profileUrl?: string;
    nickname: string;
  };
}

const UserMenu = ({ userInfo }: UserMenuProps) => {
  const navigate = useNavigate();
  const { confirm } = useDialog();
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

  const handleChatClick = () => {
    navigate('/chat');
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
    <S.UserMenuContainer ref={dropdownRef}>
      <S.UserMenuButton onClick={handleUserMenuClick}>
        <S.HeaderContent>
          <S.ProfileImageWrapper>
            {userInfo.profileUrl ? (
              <S.ProfileImage src={userInfo.profileUrl} alt="profile" />
            ) : (
              <UserProfileImageIcon />
            )}
          </S.ProfileImageWrapper>
          <S.Nickname>{userInfo.nickname} 님</S.Nickname>
          <S.ArrowIconWrapper isOpen={isDropdownOpen}>
            <ArrowDownIcon width={12} fill={theme.COLORS.LABEL.PRIMARY} />
          </S.ArrowIconWrapper>
        </S.HeaderContent>
      </S.UserMenuButton>

      {isDropdownOpen && (
        <S.DropdownMenu>
          <S.DropdownItem onClick={handleMyPageClick}>
            마이페이지
          </S.DropdownItem>
          <S.DropdownItem onClick={handleChatClick}>채팅 목록</S.DropdownItem>
          <S.DropdownItem onClick={handleLogoutClick}>로그아웃</S.DropdownItem>
        </S.DropdownMenu>
      )}
    </S.UserMenuContainer>
  );
};

export default UserMenu;

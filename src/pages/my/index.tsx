import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useUserInfoQuery } from '@/features/user/hooks/useUserInfoQuery';
import AIContentIcon from '@/shared/assets/icons/ai-content.svg?react';
import UserProfileImageIcon from '@/shared/assets/icons/user-profile-image.svg?react';
import * as S from './My.styles';

const My: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userInfo, isLoading } = useUserInfoQuery();

  if (!userInfo) {
    return null;
  }

  const menuItems =
    userInfo.role === 'PROVIDER'
      ? [
          { key: 'info-edit', label: '회원 정보 수정' },
          { key: 'credit', label: '잼잼 크레딧' },
          { key: 'profile-edit', label: '전문가 프로필 수정' },
          { key: 'service-register', label: '서비스 등록' },
          { key: 'order-manage', label: '주문 관리' },
        ]
      : [
          { key: 'info-edit', label: '회원 정보 수정' },
          { key: 'credit', label: '잼잼 크레딧' },
          { key: 'order-history', label: '내 주문 관리' },
        ];

  const currentPath = location.pathname.split('/').pop();

  const handleMenuClick = (menuKey: string) => {
    navigate(`/my/${menuKey}`);
  };

  if (isLoading) {
    return null;
  }

  return (
    <S.Container>
      <S.Sidebar>
        <S.UserInfoCard>
          <S.ProfileImageWrapper>
            {userInfo?.profileUrl ? (
              <S.ProfileImage src={userInfo.profileUrl} alt="profile" />
            ) : (
              <UserProfileImageIcon width={64} height={64} />
            )}
          </S.ProfileImageWrapper>
          <S.UserSummary>
            <S.UserNickname>{userInfo?.nickname}</S.UserNickname>
            <S.UserRole>
              {userInfo?.role === 'PROVIDER' ? '전문가' : '의뢰인'}
            </S.UserRole>
          </S.UserSummary>
        </S.UserInfoCard>
        <S.SidebarMenu>
          {menuItems.map((menu) => (
            <S.MenuItem
              key={menu.key}
              active={currentPath === menu.key}
              onClick={() => handleMenuClick(menu.key)}
            >
              {menu.label}
              {menu.key === 'service-register' && <AIContentIcon />}
            </S.MenuItem>
          ))}
        </S.SidebarMenu>
      </S.Sidebar>
      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.Container>
  );
};

export default My;

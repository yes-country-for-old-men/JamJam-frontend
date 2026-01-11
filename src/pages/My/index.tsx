import React from 'react';
import styled from '@emotion/styled';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AIContentIcon from '@assets/icons/ai-content.svg?react';
import UserProfileImageIcon from '@assets/icons/user-profile-image.svg?react';
import useUserInfoQuery from '@hooks/queries/useUserInfoQuery';

const Container = styled.div`
  display: flex;
  width: 1200px;
  min-height: calc(100dvh - 80px);
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  gap: 36px;
  padding: 24px;
  margin: 0 auto;
`;

const Sidebar = styled.aside`
  position: sticky;
  display: flex;
  flex-direction: column;
  flex: 1;
  top: 104px;
  height: fit-content;
`;

const UserInfoCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 16px;
  gap: 16px;
  padding: 24px;
  margin-bottom: 16px;
`;

const ProfileImageWrapper = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 50%;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const UserSummary = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserNickname = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const UserRole = styled.div`
  background-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  width: fit-content;
  border-radius: 16px;
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 2px 8px;
`;

const SidebarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MenuItem = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.active ? props.theme.COLORS.GRAY[6] : undefined};
  border-left: ${(props) =>
    props.active ? `3px solid ${props.theme.COLORS.MAIN.PRIMARY}` : 'none'};
  color: ${(props) =>
    props.active
      ? props.theme.COLORS.LABEL.PRIMARY
      : props.theme.COLORS.LABEL.SECONDARY};
  font-size: 16px;
  font-weight: ${(props) => (props.active ? '600' : '400')};
  gap: 8px;
  padding: 16px 24px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  }
`;

const MainContent = styled.main`
  overflow: visible;
`;

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
        ];

  const currentPath = location.pathname.split('/').pop();

  const handleMenuClick = (menuKey: string) => {
    navigate(`/my/${menuKey}`);
  };

  if (isLoading) {
    return null;
  }

  return (
    <Container>
      <Sidebar>
        <UserInfoCard>
          <ProfileImageWrapper>
            {userInfo?.profileUrl ? (
              <ProfileImage src={userInfo.profileUrl} alt="profile" />
            ) : (
              <UserProfileImageIcon width={64} height={64} />
            )}
          </ProfileImageWrapper>
          <UserSummary>
            <UserNickname>{userInfo?.nickname}</UserNickname>
            <UserRole>
              {userInfo?.role === 'PROVIDER' ? '전문가' : '의뢰인'}
            </UserRole>
          </UserSummary>
        </UserInfoCard>
        <SidebarMenu>
          {menuItems.map((menu) => (
            <MenuItem
              key={menu.key}
              active={currentPath === menu.key}
              onClick={() => handleMenuClick(menu.key)}
            >
              {menu.label}
              {menu.key === 'service-register' && <AIContentIcon />}
            </MenuItem>
          ))}
        </SidebarMenu>
      </Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
    </Container>
  );
};

export default My;

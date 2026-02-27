import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  width: 1200px;
  min-height: calc(100dvh - 80px);
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  gap: 36px;
  padding: 24px;
  margin: 0 auto;
`;

export const Sidebar = styled.aside`
  position: sticky;
  display: flex;
  flex-direction: column;
  flex: 1;
  top: 104px;
  height: fit-content;
`;

export const UserInfoCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 16px;
  gap: 16px;
  padding: 24px;
  margin-bottom: 16px;
`;

export const ProfileImageWrapper = styled.figure`
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

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const UserSummary = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserNickname = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const UserRole = styled.div`
  background-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  width: fit-content;
  border-radius: 16px;
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 2px 8px;
`;

export const SidebarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MenuItem = styled.button<{ active?: boolean }>`
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

export const MainContent = styled.main`
  overflow: visible;
`;

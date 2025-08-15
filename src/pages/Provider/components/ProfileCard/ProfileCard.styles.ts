import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px 0;
`;

export const ProfileImageWrapper = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 84px;
  height: 84px;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 50%;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  overflow: hidden;
  margin: 0;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
`;

export const ProfileHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProviderNickname = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export const CategoryBadge = styled.span`
  background-color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[2]};
  border-radius: 20px;
  color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.05em;
  padding: 4px 8px;
`;

export const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  gap: 4px;
`;

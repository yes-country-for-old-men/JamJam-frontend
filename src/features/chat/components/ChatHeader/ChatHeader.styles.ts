import styled from '@emotion/styled';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  height: 76px;
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  padding: 0 24px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProfileWrapper = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 14px;
  flex-shrink: 0;
  overflow: hidden;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const ChatTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};

  &:hover {
    background-color: ${(props) => props.theme.COLORS.GRAY[6]};
    color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
  }
`;

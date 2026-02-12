import { keyframes } from '@emotion/react';
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

export const MenuWrapper = styled.div`
  position: relative;
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

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[3]};
  border-radius: 8px;
  overflow: hidden;
  min-width: 120px;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const DropdownItem = styled.button`
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

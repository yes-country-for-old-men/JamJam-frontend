import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const UserMenuContainer = styled.div`
  position: relative;
`;

export const UserMenuButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImageWrapper = styled.div`
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

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const Nickname = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  margin-right: 12px;
`;

export const ArrowIconWrapper = styled.div<{ isOpen: boolean }>`
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

export const DropdownMenu = styled.div`
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

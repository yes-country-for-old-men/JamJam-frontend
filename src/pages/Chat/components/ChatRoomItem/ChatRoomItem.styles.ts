import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.article<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  ${(props) =>
    props.isActive &&
    css`
      background-color: ${props.theme.COLORS.MAIN.SECONDARY};
    `}

  &:hover {
    background-color: ${(props) =>
      props.isActive
        ? props.theme.COLORS.MAIN.SECONDARY
        : props.theme.COLORS.GRAY[5]};
  }
`;

export const ProfileWrapper = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  margin-right: 12px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 18px;
  flex-shrink: 0;
  overflow: hidden;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const ChatRoomInfo = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const ChatRoomInfoHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const ChatRoomName = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
`;

export const LastMessageTime = styled.time`
  font-size: 12px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  white-space: nowrap;
`;

export const LastMessageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LastMessage = styled.div`
  flex: 1;
  font-size: 13px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UnreadBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  color: white;
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
  padding: 0 6px;
`;

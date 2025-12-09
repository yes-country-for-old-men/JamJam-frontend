import React from 'react';
import MenuIcon from '@assets/icons/menu.svg?react';
import UserProfileImageIcon from '@assets/icons/user-profile-image.svg?react';
import * as S from '@pages/Chat/components/ChatHeader/ChatHeader.styles';
import type { ChatRoom } from '@type/Chat';

interface ChatHeaderProps {
  selectedChat: ChatRoom;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedChat }) => {
  return (
    <S.Container>
      <S.HeaderLeft>
        <S.ProfileWrapper>
          {selectedChat.profileUrl ? (
            <S.ProfileImage src={selectedChat.profileUrl} alt="profile" />
          ) : (
            <UserProfileImageIcon width={36} height={36} />
          )}
        </S.ProfileWrapper>
        <S.ChatTitle>{selectedChat.name}</S.ChatTitle>
      </S.HeaderLeft>
      <S.MenuButton>
        <MenuIcon />
      </S.MenuButton>
    </S.Container>
  );
};

export default ChatHeader;

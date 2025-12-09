import React from 'react';
import UserProfileImageIcon from '@assets/icons/user-profile-image.svg?react';
import * as S from '@pages/Chat/components/ChatRoomItem/ChatRoomItem.styles';
import { formatRelativeTime } from '@utils/format';
import type { ChatRoom } from '@type/Chat';

interface ChatRoomItemProps {
  chatRoom: ChatRoom;
  isActive: boolean;
  selectedChatId?: number | null;
  onSelect: (chatId: number) => Promise<void>;
}

const ChatRoomItem: React.FC<ChatRoomItemProps> = ({
  chatRoom,
  isActive,
  selectedChatId,
  onSelect,
}) => {
  return (
    <S.Container isActive={isActive} onClick={() => onSelect(chatRoom.id)}>
      <S.ProfileWrapper>
        {chatRoom.profileUrl ? (
          <S.ProfileImage src={chatRoom.profileUrl} alt="profile" />
        ) : (
          <UserProfileImageIcon width={48} height={48} />
        )}
      </S.ProfileWrapper>
      <S.ChatRoomInfo>
        <S.ChatRoomInfoHeader>
          <S.ChatRoomName>{chatRoom.name}</S.ChatRoomName>
          <S.LastMessageTime>
            {formatRelativeTime(chatRoom.lastMessageTime)}
          </S.LastMessageTime>
        </S.ChatRoomInfoHeader>
        <S.LastMessageWrapper>
          <S.LastMessage>{chatRoom.lastMessage}</S.LastMessage>
          {chatRoom.unreadCount > 0 && selectedChatId !== chatRoom.id && (
            <S.UnreadBadge>{chatRoom.unreadCount}</S.UnreadBadge>
          )}
        </S.LastMessageWrapper>
      </S.ChatRoomInfo>
    </S.Container>
  );
};

export default ChatRoomItem;

import React from 'react';
import * as S from '@/features/chat/components/ChatRoomItem/ChatRoomItem.styles';
import UserProfileImageIcon from '@/shared/assets/icons/user-profile-image.svg?react';
import { formatRelativeTime } from '@/shared/utils';
import type { ChatRoom } from '@/entities/chat/model/Chat';

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

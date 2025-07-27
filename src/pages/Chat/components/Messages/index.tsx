import React from 'react';
import type { Message, ChatRoom } from '@type/Chat';
import { formatTime } from '@utils/format';
import * as S from '@pages/Chat/components/Messages/Messages.styles';
import UserProfileImageIcon from '@assets/icons/user-profile-image.svg?react';

interface MessageProps {
  message: Message;
  position: 'single' | 'first' | 'middle' | 'last';
  shouldShowTime: boolean;
  shouldShowProfile: boolean;
  isNewMessageGroup: boolean;
  selectedChat: ChatRoom;
}

const Messages: React.FC<MessageProps> = ({
  message,
  position,
  shouldShowTime,
  shouldShowProfile,
  isNewMessageGroup,
  selectedChat,
}) => {
  return (
    <S.MessageGroup
      isOwn={message.isOwn}
      style={{
        marginTop: isNewMessageGroup ? '12px' : '4px',
      }}
    >
      <S.MessageRow isOwn={message.isOwn}>
        {!message.isOwn && (
          <S.SenderProfileContainer
            style={{
              visibility: shouldShowProfile ? 'visible' : 'hidden',
            }}
          >
            {selectedChat.profileUrl ? (
              <S.SenderProfileImage
                src={selectedChat.profileUrl}
                alt="profile"
              />
            ) : (
              <UserProfileImageIcon width={32} height={32} />
            )}
          </S.SenderProfileContainer>
        )}
        {message.isOwn && shouldShowTime && (
          <S.MessageTimestamp isOwn={message.isOwn}>
            {formatTime(message.timestamp)}
          </S.MessageTimestamp>
        )}
        <S.MessageBubble
          isOwn={message.isOwn}
          status={message.status}
          position={position}
        >
          {message.text}
        </S.MessageBubble>
        {!message.isOwn && shouldShowTime && (
          <S.MessageTimestamp isOwn={message.isOwn}>
            {formatTime(message.timestamp)}
          </S.MessageTimestamp>
        )}
      </S.MessageRow>
    </S.MessageGroup>
  );
};

export default Messages;

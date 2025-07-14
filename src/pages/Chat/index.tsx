import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import useChat from '@hooks/useChat';
import useMessageGrouping from '@hooks/useMessageGrouping';
import useMessageScroll from '@hooks/useMessageScroll';
import decodeToken from '@utils/decodeToken';
import { formatTime, formatRelativeTime } from '@utils/format';
import theme from '@styles/theme';
import LogoIcon from '@assets/icons/gray-logo-icon.svg?react';
import UserProfileImageIcon from '@assets/icons/user-profile-image.svg?react';
import MenuIcon from '@assets/icons/menu.svg?react';
import SendIcon from '@assets/icons/send.svg?react';

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: calc(100dvh - 108px);
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-right: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
`;

const ChatSearchContainer = styled.section`
  display: flex;
  align-items: center;
  height: 76px;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  padding: 0 16px;
`;

const ChatSearchInput = styled.input`
  width: 100%;
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 20px;
  font-size: 14px;
  padding: 12px 16px;

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL_TERTIARY};
  }

  &:focus {
    border-color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
  }
`;

const ChatRoomList = styled.nav`
  flex: 1;
  overflow-y: auto;
`;

const ChatRoomItem = styled.article<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  ${(props) =>
    props.isActive &&
    css`
      background-color: ${props.theme.COLORS.JAMJAM_PRIMARY[2]};
    `}

  &:hover {
    background-color: ${(props) =>
      props.isActive
        ? props.theme.COLORS.JAMJAM_PRIMARY[2]
        : props.theme.COLORS.GRAY[5]};
  }
`;

const ChatRoomProfileContainer = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  margin-right: 12px;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  font-size: 18px;
  flex-shrink: 0;
  overflow: hidden;
`;

const ChatRoomProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ChatRoomInfo = styled.div`
  flex: 1;
  overflow: hidden;
`;

const ChatRoomInfoHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const ChatRoomName = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => props.theme.COLORS.LABEL_PRIMARY};
`;

const ChatRoomLastMessageTime = styled.time`
  font-size: 12px;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  white-space: nowrap;
`;

const ChatRoomLastMessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatRoomLastMessage = styled.div`
  flex: 1;
  font-size: 13px;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChatRoomUnreadBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
  color: white;
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
  padding: 0 6px;
`;

const ChatMainArea = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100dvh - 108px);
  background-color: white;
`;

const ActiveChatHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  height: 76px;
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  padding: 0 24px;
`;

const ActiveChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ActiveChatProfileContainer = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  font-size: 14px;
  flex-shrink: 0;
  overflow: hidden;
`;

const ActiveChatProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ActiveChatTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.COLORS.LABEL_PRIMARY};
`;

const ActiveChatActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ChatMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};

  &:hover {
    background-color: ${(props) => props.theme.COLORS.GRAY[6]};
    color: ${(props) => props.theme.COLORS.LABEL_PRIMARY};
  }
`;

const ChatMessagesContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
  padding: 0 24px;
  overflow-y: auto;
`;

const MessageGroup = styled.div<{ isOwn: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isOwn ? 'flex-end' : 'flex-start')};
`;

const MessageRow = styled.div<{ isOwn: boolean }>`
  display: flex;
  align-items: flex-end;
  width: 100%;
  ${(props) => props.isOwn && 'justify-content: flex-end;'}
`;

const SenderProfileContainer = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  font-size: 12px;
  align-self: flex-start;
  margin-right: 8px;
  overflow: hidden;
`;

const SenderProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const MessageBubble = styled.div<{
  isOwn: boolean;
  status?: string;
  position: 'single' | 'first' | 'middle' | 'last';
}>`
  max-width: 70%;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  padding: 12px 16px;
  opacity: ${(props) => (props.status === 'sending' ? 0.7 : 1)};

  ${(props) => {
    const { isOwn, position } = props;
    const baseRadius = '18px';
    const tightRadius = '4px';

    let borderRadius = '';

    if (position === 'single') {
      borderRadius = baseRadius;
    } else if (position === 'first') {
      borderRadius = isOwn
        ? `${baseRadius} ${baseRadius} ${tightRadius} ${baseRadius}`
        : `${baseRadius} ${baseRadius} ${baseRadius} ${tightRadius}`;
    } else if (position === 'middle') {
      borderRadius = isOwn
        ? `${baseRadius} ${tightRadius} ${tightRadius} ${baseRadius}`
        : `${tightRadius} ${baseRadius} ${baseRadius} ${tightRadius}`;
    } else if (position === 'last') {
      borderRadius = isOwn
        ? `${baseRadius} ${tightRadius} ${baseRadius} ${baseRadius}`
        : `${tightRadius} ${baseRadius} ${baseRadius} ${baseRadius}`;
    }

    return css`
      border-radius: ${borderRadius};
      background-color: ${isOwn
        ? props.theme.COLORS.JAMJAM_PRIMARY[1]
        : props.theme.COLORS.GRAY[6]};
      color: ${isOwn ? 'white' : props.theme.COLORS.LABEL_PRIMARY};
    `;
  }}
`;

const MessageTimestamp = styled.time<{ isOwn: boolean }>`
  flex-shrink: 0;
  align-self: flex-end;
  font-size: 11px;
  color: ${(props) => props.theme.COLORS.LABEL_TERTIARY};
  ${(props) => (props.isOwn ? 'margin-right: 4px;' : 'margin-left: 4px;')}
  white-space: nowrap;
`;

const MessageDateDivider = styled.div`
  text-align: center;
  margin: 16px 0;
`;

const MessageDateBadge = styled.time`
  border-radius: 12px;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  font-size: 12px;
`;

const ChatInputContainer = styled.footer`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-top: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  gap: 12px;
  padding: 16px 24px;
`;

const ChatInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;

const ChatTextarea = styled.textarea`
  flex: 1;
  width: 100%;
  max-height: 120px;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 20px;
  font-size: 14px;
  padding: 12px 16px;
  box-sizing: border-box;
  overflow-y: auto;
  resize: none;

  &:focus {
    border-color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
  }

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL_TERTIARY};
  }
`;

const ChatSendButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const ChatEmptyState = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChatEmptyStateText = styled.div`
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  text-align: center;
  word-break: keep-all;
  margin-top: 16px;
  padding: 0 12px;
`;

const SCROLL_BOTTOM_THRESHOLD = 100;

const Chat: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [previousMessagesLength, setPreviousMessagesLength] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const token = localStorage.getItem('accessToken') || '';
  const currentUserId = decodeToken(token)?.userId || '';

  const {
    selectedChatId,
    chatRooms,
    messages,
    loading,
    isConnected,
    selectChat,
    sendMessage,
    markMessageAsRead,
    loadMoreMessages,
  } = useChat(token, currentUserId);

  const { groupedMessages, getBubblePosition, shouldShowProfile } =
    useMessageGrouping(messages);

  const {
    messagesEndRef,
    messagesContainerRef,
    scrollToBottom,
    handleScroll,
    maintainScrollPosition,
  } = useMessageScroll();

  const isScrollAtBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return false;

    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollTop + clientHeight >= scrollHeight - SCROLL_BOTTOM_THRESHOLD;
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    sendMessage(messageText.trim());
    setMessageText('');

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value);

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const selectedChat = chatRooms.find((chat) => chat.id === selectedChatId);
  const filteredChatRooms = chatRooms.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleMessagesScroll = () => {
    handleScroll(loadMoreMessages);
  };

  useEffect(() => {
    if (selectedChatId && !loading) {
      scrollToBottom();
    }
  }, [selectedChatId, loading]);

  useLayoutEffect(() => {
    if (messages.length > previousMessagesLength) {
      const wasAtBottom = isScrollAtBottom();

      if (wasAtBottom || messages.length === 1) {
        setTimeout(() => {
          scrollToBottom();
        }, 0);
      }
    }

    setPreviousMessagesLength(messages.length);
  }, [messages]);

  useEffect(() => {
    maintainScrollPosition();
  }, [messages.length, maintainScrollPosition]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (selectedChatId && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      if (lastMessage && !lastMessage.isOwn && lastMessage.id) {
        const timeoutId = setTimeout(() => {
          markMessageAsRead(selectedChatId, lastMessage.id);
        }, 500);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [selectedChatId, messages, markMessageAsRead]);

  return (
    <Container>
      <ChatContainer>
        <Sidebar>
          <ChatSearchContainer>
            <ChatSearchInput
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </ChatSearchContainer>
          <ChatRoomList>
            {filteredChatRooms.map((chatRoom) => (
              <ChatRoomItem
                key={chatRoom.id}
                isActive={selectedChatId === chatRoom.id}
                onClick={() => selectChat(chatRoom.id)}
              >
                <ChatRoomProfileContainer>
                  {chatRoom.profileUrl ? (
                    <ChatRoomProfileImage
                      src={chatRoom.profileUrl}
                      alt="profile"
                    />
                  ) : (
                    <UserProfileImageIcon width={48} height={48} />
                  )}
                </ChatRoomProfileContainer>
                <ChatRoomInfo>
                  <ChatRoomInfoHeader>
                    <ChatRoomName>{chatRoom.name}</ChatRoomName>
                    <ChatRoomLastMessageTime>
                      {formatRelativeTime(chatRoom.lastMessageTime)}
                    </ChatRoomLastMessageTime>
                  </ChatRoomInfoHeader>
                  <ChatRoomLastMessageContainer>
                    <ChatRoomLastMessage>
                      {chatRoom.lastMessage}
                    </ChatRoomLastMessage>
                    {chatRoom.unreadCount > 0 &&
                      selectedChatId !== chatRoom.id && (
                        <ChatRoomUnreadBadge>
                          {chatRoom.unreadCount}
                        </ChatRoomUnreadBadge>
                      )}
                  </ChatRoomLastMessageContainer>
                </ChatRoomInfo>
              </ChatRoomItem>
            ))}
          </ChatRoomList>
        </Sidebar>
        <ChatMainArea>
          {selectedChat ? (
            <>
              <ActiveChatHeader>
                <ActiveChatHeaderLeft>
                  <ActiveChatProfileContainer>
                    {selectedChat.profileUrl ? (
                      <ActiveChatProfileImage
                        src={selectedChat.profileUrl}
                        alt="profile"
                      />
                    ) : (
                      <UserProfileImageIcon width={36} height={36} />
                    )}
                  </ActiveChatProfileContainer>
                  <ActiveChatTitle>{selectedChat.name}</ActiveChatTitle>
                </ActiveChatHeaderLeft>
                <ActiveChatActions>
                  <ChatMenuButton>
                    <MenuIcon />
                  </ChatMenuButton>
                </ActiveChatActions>
              </ActiveChatHeader>
              <ChatMessagesContainer
                ref={messagesContainerRef}
                onScroll={handleMessagesScroll}
              >
                {Object.entries(groupedMessages).map(([date, dayMessages]) => (
                  <div key={date}>
                    <MessageDateDivider>
                      <MessageDateBadge>{date}</MessageDateBadge>
                    </MessageDateDivider>
                    {dayMessages.map((message, index) => {
                      const position = getBubblePosition(dayMessages, index);
                      const prevMessage =
                        index > 0 ? dayMessages[index - 1] : null;
                      const nextMessage =
                        index < dayMessages.length - 1
                          ? dayMessages[index + 1]
                          : null;

                      const shouldShowTime =
                        !nextMessage ||
                        nextMessage.isOwn !== message.isOwn ||
                        nextMessage.timestamp.getTime() -
                          message.timestamp.getTime() >=
                          60 * 1000;

                      const isNewMessageGroup =
                        !prevMessage ||
                        prevMessage.isOwn !== message.isOwn ||
                        message.timestamp.getTime() -
                          prevMessage.timestamp.getTime() >=
                          60 * 1000;

                      const shouldShowSenderProfile = shouldShowProfile(
                        dayMessages,
                        index,
                      );

                      return (
                        <MessageGroup
                          key={`${date}-${message.id}-${message.timestamp.getTime()}`}
                          isOwn={message.isOwn}
                          style={{
                            marginTop: isNewMessageGroup ? '12px' : '4px',
                          }}
                        >
                          <MessageRow isOwn={message.isOwn}>
                            {!message.isOwn && (
                              <SenderProfileContainer
                                style={{
                                  visibility: shouldShowSenderProfile
                                    ? 'visible'
                                    : 'hidden',
                                }}
                              >
                                {selectedChat.profileUrl ? (
                                  <SenderProfileImage
                                    src={selectedChat.profileUrl}
                                    alt="profile"
                                  />
                                ) : (
                                  <UserProfileImageIcon
                                    width={32}
                                    height={32}
                                  />
                                )}
                              </SenderProfileContainer>
                            )}
                            {message.isOwn && shouldShowTime && (
                              <MessageTimestamp isOwn={message.isOwn}>
                                {formatTime(message.timestamp)}
                              </MessageTimestamp>
                            )}
                            <MessageBubble
                              isOwn={message.isOwn}
                              status={message.status}
                              position={position}
                            >
                              {message.text}
                            </MessageBubble>
                            {!message.isOwn && shouldShowTime && (
                              <MessageTimestamp isOwn={message.isOwn}>
                                {formatTime(message.timestamp)}
                              </MessageTimestamp>
                            )}
                          </MessageRow>
                        </MessageGroup>
                      );
                    })}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </ChatMessagesContainer>
              <ChatInputContainer>
                <ChatInputWrapper>
                  <ChatTextarea
                    ref={inputRef}
                    placeholder="메시지를 입력하세요."
                    value={messageText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    disabled={!isConnected}
                  />
                </ChatInputWrapper>
                <ChatSendButton
                  onClick={handleSendMessage}
                  disabled={!messageText.trim() || !isConnected}
                >
                  <SendIcon
                    fill={
                      messageText.trim() && isConnected
                        ? theme.COLORS.JAMJAM_PRIMARY[1]
                        : theme.COLORS.GRAY[2]
                    }
                  />
                </ChatSendButton>
              </ChatInputContainer>
            </>
          ) : (
            <ChatEmptyState>
              <LogoIcon />
              <ChatEmptyStateText>
                대화를 시작하려면 채팅 내역을 선택하세요.
              </ChatEmptyStateText>
            </ChatEmptyState>
          )}
        </ChatMainArea>
      </ChatContainer>
    </Container>
  );
};

export default Chat;

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import useChat from '@pages/Chat/hooks/useChat';
import useMessageScroll from '@pages/Chat/hooks/useMessageScroll';
import decodeToken from '@utils/decodeToken';
import chatMessageGrouping from '@pages/Chat/utils/chatMessageGrouping';
import * as S from '@pages/Chat/Chat.styles';
import * as MessagesS from '@pages/Chat/components/Messages/Messages.styles';
import ChatRoomItem from '@pages/Chat/components/ChatRoomItem';
import ChatHeader from '@pages/Chat/components/ChatHeader';
import Messages from '@pages/Chat/components/Messages';
import ChatInput from '@pages/Chat/components/ChatInput';
import LogoIcon from '@assets/icons/gray-logo-icon.svg?react';

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
    chatMessageGrouping(messages);

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

    return undefined;
  }, [selectedChatId, messages, markMessageAsRead]);

  return (
    <S.Container>
      <S.ChatContainer>
        <S.Sidebar>
          <S.SearchInputWrapper>
            <S.SearchInput
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </S.SearchInputWrapper>
          <S.ChatRoomList>
            {filteredChatRooms.map((chatRoom) => (
              <ChatRoomItem
                key={chatRoom.id}
                chatRoom={chatRoom}
                isActive={selectedChatId === chatRoom.id}
                selectedChatId={selectedChatId}
                onSelect={selectChat}
              />
            ))}
          </S.ChatRoomList>
        </S.Sidebar>
        <S.MainArea>
          {selectedChat ? (
            <>
              <ChatHeader selectedChat={selectedChat} />
              <MessagesS.Container
                ref={messagesContainerRef}
                onScroll={handleMessagesScroll}
              >
                {Object.entries(groupedMessages).map(([date, dayMessages]) => (
                  <div key={date}>
                    <MessagesS.MessageDateDivider>
                      <MessagesS.MessageDateBadge>
                        {date}
                      </MessagesS.MessageDateBadge>
                    </MessagesS.MessageDateDivider>
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
                        <Messages
                          key={`${date}-${message.id}-${message.timestamp.getTime()}`}
                          message={message}
                          position={position}
                          shouldShowTime={shouldShowTime}
                          shouldShowProfile={shouldShowSenderProfile}
                          isNewMessageGroup={isNewMessageGroup}
                          selectedChat={selectedChat}
                        />
                      );
                    })}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </MessagesS.Container>
              <ChatInput
                messageText={messageText}
                isConnected={isConnected}
                onMessageChange={setMessageText}
                onSendMessage={handleSendMessage}
                onKeyDown={handleKeyDown}
              />
            </>
          ) : (
            <S.EmptyState>
              <LogoIcon />
              <S.EmptyStateText>
                대화를 시작하려면 채팅 내역을 선택하세요.
              </S.EmptyStateText>
            </S.EmptyState>
          )}
        </S.MainArea>
      </S.ChatContainer>
    </S.Container>
  );
};

export default Chat;

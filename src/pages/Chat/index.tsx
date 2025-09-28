import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useChat from '@pages/Chat/hooks/useChat';
import useMessageScroll from '@pages/Chat/hooks/useMessageScroll';
import useChatRoomsQuery from '@pages/Chat/hooks/queries/useChatRoomsQuery';
import useChatMessagesQuery from '@pages/Chat/hooks/queries/useChatMessagesQuery';
import useMarkAsReadMutation from '@pages/Chat/hooks/mutations/useMarkAsReadMutation';
import decodeToken from '@utils/decodeToken';
import {
  groupChatMessages,
  getBubblePosition,
  shouldShowProfile,
} from '@pages/Chat/utils/chatMessagesUtils';
import type { ChatRoom, Message } from '@type/Chat';
import * as S from '@pages/Chat/Chat.styles';
import * as MessagesS from '@pages/Chat/components/Messages/Messages.styles';
import ChatRoomItem from '@pages/Chat/components/ChatRoomItem';
import ChatHeader from '@pages/Chat/components/ChatHeader';
import Messages from '@pages/Chat/components/Messages';
import ChatInput from '@pages/Chat/components/ChatInput';
import LogoIcon from '@assets/icons/gray-logo-icon.svg?react';

const Chat: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [previousMessagesLength, setPreviousMessagesLength] = useState(0);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [realtimeChatRooms, setRealtimeChatRooms] = useState<ChatRoom[]>([]);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const token = localStorage.getItem('accessToken') || '';
  const currentUserId = decodeToken(token)?.userId || '';
  const queryClient = useQueryClient();

  const { data: queryChatRooms = [], isLoading: chatRoomsLoading } =
    useChatRoomsQuery(currentUserId);

  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: messagesLoading,
  } = useChatMessagesQuery(selectedChatId);

  const markAsReadMutation = useMarkAsReadMutation();

  const {
    tempMessages,
    isConnected,
    socket,
    clearTempMessages,
    addTempMessage,
    updateTempMessage,
  } = useChat({
    token,
    currentUserId,
    selectedChatId,
    onChatRoomUpdate: (data) => {
      if (Array.isArray(data)) {
        setRealtimeChatRooms(data);
      } else {
        setRealtimeChatRooms((prevRooms) => {
          if (prevRooms.length === 0) return [data];

          const existingIndex = prevRooms.findIndex(
            (room) => room.id === data.id,
          );

          if (existingIndex >= 0) {
            const updatedRooms = [...prevRooms];
            updatedRooms[existingIndex] = data;

            if (data.lastMessageTime) {
              updatedRooms.sort(
                (a, b) =>
                  new Date(b.lastMessageTime).getTime() -
                  new Date(a.lastMessageTime).getTime(),
              );
            }

            return updatedRooms;
          }
          return [data, ...prevRooms];
        });
      }

      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
    },
    onNewMessage: (message) => {
      if (!message.isOwn) {
        setRealtimeChatRooms((prev) => {
          if (prev.length === 0) return prev;

          const updated = prev.map((chat) => {
            if (chat.id === selectedChatId) {
              return {
                ...chat,
                lastMessage: message.text,
                lastMessageTime: message.timestamp,
              };
            }
            return chat;
          });
          return updated;
        });
      }
    },
  });

  const chatRooms = useMemo(() => {
    return realtimeChatRooms.length > 0 ? realtimeChatRooms : queryChatRooms;
  }, [realtimeChatRooms, queryChatRooms]);

  const messages = useMemo(() => {
    const queryMessages =
      messagesData?.pages
        .flatMap((page) => page.messages)
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()) || [];

    const lastQueryTime =
      queryMessages.length > 0
        ? queryMessages[queryMessages.length - 1].timestamp.getTime()
        : 0;

    const filteredTempMessages = tempMessages.filter(
      (msg) => msg.timestamp.getTime() > lastQueryTime,
    );

    return [...queryMessages, ...filteredTempMessages];
  }, [messagesData, tempMessages]);

  const loading = chatRoomsLoading || messagesLoading;

  const groupedMessages = groupChatMessages(messages);

  const {
    messagesEndRef,
    messagesContainerRef,
    scrollToBottom,
    handleScroll,
    maintainScrollPosition,
  } = useMessageScroll();

  const isScrollAtBottom = () => {
    const SCROLL_BOTTOM_THRESHOLD = 100;
    const container = messagesContainerRef.current;

    if (!container) return false;

    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollTop + clientHeight >= scrollHeight - SCROLL_BOTTOM_THRESHOLD;
  };

  const selectChat = async (chatId: number) => {
    setSelectedChatId(chatId);
    clearTempMessages();

    if (socket && isConnected) {
      socket.joinRoom(chatId);
    }
  };

  const sendMessage = (text: string): void => {
    if (!selectedChatId) return;

    const tempMessage: Message = {
      id: Date.now(),
      chatRoomId: selectedChatId,
      text,
      isOwn: true,
      timestamp: new Date(),
      status: 'sending',
    };

    addTempMessage(tempMessage);

    if (socket && isConnected) {
      try {
        socket.sendMessage(selectedChatId, text);
      } catch {
        updateTempMessage(tempMessage.id, { status: 'failed' });
      }
    } else {
      updateTempMessage(tempMessage.id, { status: 'failed' });
    }
  };

  const markMessageAsRead = async (chatRoomId: number, messageId: number) => {
    markAsReadMutation.mutate({ chatRoomId, messageId });

    if (socket && isConnected) {
      socket.markMessageAsRead(chatRoomId, messageId);
    }
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

  const loadMoreMessages = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
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

      if (wasAtBottom) {
        setTimeout(() => {
          scrollToBottom();
        }, 0);
      }
    }

    setPreviousMessagesLength(messages.length);
  }, [messages.length]);

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
  }, [selectedChatId, messages]);

  useEffect(() => {
    if (queryChatRooms.length > 0 && realtimeChatRooms.length === 0) {
      setRealtimeChatRooms(queryChatRooms);
    }
  }, [queryChatRooms, realtimeChatRooms.length]);

  if (loading) {
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
            <S.ChatRoomList />
          </S.Sidebar>
          <S.MainArea>
            <S.EmptyState>
              <LogoIcon />
              <S.EmptyStateText>채팅 목록을 불러오고 있어요.</S.EmptyStateText>
            </S.EmptyState>
          </S.MainArea>
        </S.ChatContainer>
      </S.Container>
    );
  }

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

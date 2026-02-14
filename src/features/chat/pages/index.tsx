import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
  useCallback,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import ChatHeader from '@/features/chat/components/ChatHeader';
import ChatInput from '@/features/chat/components/ChatInput';
import ChatRoomItem from '@/features/chat/components/ChatRoomItem';
import Messages from '@/features/chat/components/Messages';
import OrderDetailModal from '@/features/chat/components/OrderDetailModal';
import PriceInputModal from '@/features/chat/components/PriceInputModal';
import { useMarkAsReadMutation } from '@/features/chat/hooks/mutations/useMarkAsReadMutation';
import { useChatMessagesQuery } from '@/features/chat/hooks/queries/useChatMessagesQuery';
import { useChatRoomsQuery } from '@/features/chat/hooks/queries/useChatRoomsQuery';
import { useChat } from '@/features/chat/hooks/useChat';
import { useMessageScroll } from '@/features/chat/hooks/useMessageScroll';
import * as S from '@/features/chat/pages/Chat.styles';
import {
  groupChatMessages,
  getBubblePosition,
  shouldShowProfile,
} from '@/features/chat/utils/chatMessagesUtils';
import {
  processPayment,
  confirmOrder,
  requestPayment,
  getOrderDetail,
} from '@/features/order/api/orderApi';
import LogoIcon from '@/shared/assets/icons/gray-logo-icon.svg?react';
import { useDialog } from '@/shared/hooks/useDialog';
import { decodeToken } from '@/shared/utils';
import type {
  ChatRoom,
  Message,
  MessageType,
  ChatFileInfo,
} from '@/features/chat/types/Chat';
import type { OrderDetailContent } from '@/features/order/api/orderApi';

const Chat: React.FC = () => {
  const location = useLocation();
  const navigationRoomId = location.state?.roomId;
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [previousMessagesLength, setPreviousMessagesLength] = useState(0);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [realtimeChatRooms, setRealtimeChatRooms] = useState<ChatRoom[]>([]);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isConfirmProcessing, setIsConfirmProcessing] = useState(false);
  const [isRequestPaymentProcessing, setIsRequestPaymentProcessing] =
    useState(false);
  const [orderDetail, setOrderDetail] = useState<OrderDetailContent | null>(
    null,
  );
  const [priceInputState, setPriceInputState] = useState<{
    isOpen: boolean;
    orderId: number | null;
  }>({ isOpen: false, orderId: null });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { alert, confirm } = useDialog();

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
      messageType: 'TEXT',
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

  const sendFileMessage = (
    files: ChatFileInfo[],
    messageType: MessageType,
    message: string,
  ): void => {
    if (!selectedChatId || files.length === 0) return;

    const firstFile = files[0];
    const tempMessage: Message = {
      id: Date.now(),
      chatRoomId: selectedChatId,
      text: message || firstFile.fileName,
      isOwn: true,
      timestamp: new Date(),
      status: 'sending',
      messageType,
      fileUrl: firstFile.fileUrl,
      fileName: firstFile.fileName,
      fileSize: firstFile.fileSize,
      files,
    };

    addTempMessage(tempMessage);

    if (socket && isConnected) {
      try {
        socket.sendMessage(selectedChatId, message || '', {
          messageType,
          files,
        });
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

  const handlePayment = useCallback(
    async (orderId: number, price: number) => {
      const isConfirmed = await confirm({
        title: '결제 확인',
        content: `${price.toLocaleString()}원을 결제하시겠습니까?`,
      });

      if (!isConfirmed) return;

      setIsPaymentProcessing(true);
      try {
        await processPayment({ orderId, price });
        await alert({
          title: '결제 완료',
          content: '결제가 성공적으로 처리되었습니다.',
        });
      } catch {
        await alert({
          title: '결제 실패',
          content: '결제 처리 중 오류가 발생했습니다.',
        });
      } finally {
        setIsPaymentProcessing(false);
      }
    },
    [alert, confirm],
  );

  const handleConfirmOrder = useCallback(
    async (orderId: number) => {
      const isConfirmed = await confirm({
        title: '구매 확정',
        content: '구매를 확정하시겠습니까? 확정 후에는 취소가 불가능합니다.',
      });

      if (!isConfirmed) return;

      setIsConfirmProcessing(true);
      try {
        await confirmOrder({ orderId });
        await alert({
          title: '구매 확정 완료',
          content: '구매가 확정되었습니다.',
        });
      } catch {
        await alert({
          title: '구매 확정 실패',
          content: '구매 확정 처리 중 오류가 발생했습니다.',
        });
      } finally {
        setIsConfirmProcessing(false);
      }
    },
    [alert, confirm],
  );

  const handleRequestPayment = useCallback((orderId: number) => {
    setPriceInputState({ isOpen: true, orderId });
  }, []);

  const handleRequestPaymentSubmit = useCallback(
    async (price: number) => {
      const { orderId } = priceInputState;
      if (!orderId) return;

      setPriceInputState({ isOpen: false, orderId: null });

      if (Number.isNaN(price) || price <= 0) {
        await alert({
          title: '입력 오류',
          content: '올바른 금액을 입력해 주세요.',
        });
        return;
      }

      setIsRequestPaymentProcessing(true);
      try {
        await requestPayment({ orderId, price });
        await alert({
          title: '결제 요청 완료',
          content: '결제 요청이 전송되었습니다.',
        });
      } catch {
        await alert({
          title: '결제 요청 실패',
          content: '결제 요청 처리 중 오류가 발생했습니다.',
        });
      } finally {
        setIsRequestPaymentProcessing(false);
      }
    },
    [alert, priceInputState.orderId],
  );

  const handleViewOrderDetail = useCallback(
    async (orderId: number) => {
      try {
        const response = await getOrderDetail({ orderId });
        setOrderDetail(response.data.content);
      } catch {
        await alert({
          title: '주문 조회 실패',
          content: '주문 상세 정보를 불러오는 중 오류가 발생했습니다.',
        });
      }
    },
    [alert],
  );

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

  const lastMessage = messages[messages.length - 1];
  const lastMessageId = lastMessage?.id;
  const lastMessageIsOwn = lastMessage?.isOwn;

  useEffect(() => {
    if (selectedChatId && lastMessageId && !lastMessageIsOwn) {
      const timeoutId = setTimeout(() => {
        markMessageAsRead(selectedChatId, lastMessageId);
      }, 500);

      return () => clearTimeout(timeoutId);
    }

    return undefined;
  }, [selectedChatId, lastMessageId, lastMessageIsOwn]);

  useEffect(() => {
    if (queryChatRooms.length > 0 && realtimeChatRooms.length === 0) {
      setRealtimeChatRooms(queryChatRooms);
    }
  }, [queryChatRooms, realtimeChatRooms.length]);

  useEffect(() => {
    if (navigationRoomId && chatRooms.length > 0 && !selectedChatId) {
      selectChat(navigationRoomId);
    }
  }, [navigationRoomId, chatRooms.length]);

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
              <ChatHeader
                selectedChat={selectedChat}
                onLeaveChatRoom={() => {
                  const leavingId = selectedChatId;
                  setSelectedChatId(null);
                  setRealtimeChatRooms((prev) =>
                    prev.filter((room) => room.id !== leavingId),
                  );
                }}
              />
              <S.MessagesContainer
                ref={messagesContainerRef}
                onScroll={handleMessagesScroll}
              >
                {Object.entries(groupedMessages).map(([date, dayMessages]) => (
                  <div key={date}>
                    <S.MessageDateDivider>
                      <S.MessageDateBadge>{date}</S.MessageDateBadge>
                    </S.MessageDateDivider>
                    {dayMessages.map((message, index) => {
                      const position = getBubblePosition(dayMessages, index);
                      const prevMessage =
                        index > 0 ? dayMessages[index - 1] : null;
                      const nextMessage =
                        index < dayMessages.length - 1
                          ? dayMessages[index + 1]
                          : null;

                      const isCardType = (type?: MessageType) =>
                        type === 'IMAGE' ||
                        type === 'FILE' ||
                        type === 'REQUEST_PAYMENT' ||
                        type === 'REQUEST_FORM' ||
                        type === 'PAYMENT_COMPLETED' ||
                        type === 'ORDER_CANCELLED' ||
                        type === 'WORK_COMPLETED' ||
                        type === 'SERVICE_INQUIRY';

                      const shouldShowTime =
                        !nextMessage ||
                        nextMessage.isOwn !== message.isOwn ||
                        isCardType(nextMessage.messageType) ||
                        isCardType(message.messageType) ||
                        nextMessage.timestamp.getTime() -
                          message.timestamp.getTime() >=
                          60 * 1000;

                      const isNewMessageGroup =
                        !prevMessage ||
                        prevMessage.isOwn !== message.isOwn ||
                        isCardType(prevMessage.messageType) ||
                        isCardType(message.messageType) ||
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
                          onPayment={handlePayment}
                          isPaymentProcessing={isPaymentProcessing}
                          onConfirmOrder={handleConfirmOrder}
                          isConfirmProcessing={isConfirmProcessing}
                          onRequestPayment={handleRequestPayment}
                          isRequestPaymentProcessing={
                            isRequestPaymentProcessing
                          }
                          onViewOrderDetail={handleViewOrderDetail}
                        />
                      );
                    })}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </S.MessagesContainer>
              <ChatInput
                messageText={messageText}
                isConnected={isConnected}
                selectedChatId={selectedChatId}
                onMessageChange={setMessageText}
                onSendMessage={handleSendMessage}
                onFileMessage={sendFileMessage}
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
      <OrderDetailModal
        isOpen={orderDetail !== null}
        onClose={() => setOrderDetail(null)}
        orderDetail={orderDetail}
      />
      <PriceInputModal
        isOpen={priceInputState.isOpen}
        onClose={() => setPriceInputState({ isOpen: false, orderId: null })}
        onSubmit={handleRequestPaymentSubmit}
      />
    </S.Container>
  );
};

export default Chat;

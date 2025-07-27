import { useState, useEffect } from 'react';
import useWebSocket from '@hooks/useWebSocket';
import { getChatRooms, getChatMessages, markAsRead } from '@apis/chat';
import type {
  ChatRoom,
  Message,
  ChatRoomSummary,
  ChatMessage,
  StompNewMessageEvent,
  StompChatRoomUpdateEvent,
} from '@type/Chat';

const convertApiChatRoomToLocal = (apiRoom: ChatRoomSummary): ChatRoom => ({
  id: apiRoom.id,
  name: apiRoom.nickname,
  lastMessage: apiRoom.lastMessage || '',
  lastMessageTime: apiRoom.lastMessageTime
    ? new Date(apiRoom.lastMessageTime)
    : new Date(),
  unreadCount: apiRoom.unreadCount,
  profileUrl: apiRoom.profileUrl || '',
});

const convertApiMessageToLocal = (
  apiMessage: ChatMessage & { messageId?: number },
): Message => ({
  id: apiMessage.messageId || 0,
  chatRoomId: 0,
  text: apiMessage.content,
  isOwn: apiMessage.isOwn,
  timestamp: new Date(apiMessage.sentAt),
  status: 'sent',
});

const convertStompChatRoomToLocal = (
  stompRoom: StompChatRoomUpdateEvent,
): ChatRoom => ({
  id: stompRoom.id,
  name: stompRoom.nickname,
  lastMessage: stompRoom.lastMessage || '',
  lastMessageTime: stompRoom.lastMessageTime
    ? new Date(stompRoom.lastMessageTime)
    : new Date(),
  unreadCount: stompRoom.unreadCount,
  profileUrl: stompRoom.profileUrl || '',
});

const convertStompMessageToLocal = (
  stompMessage: StompNewMessageEvent,
  currentUserId: string,
): Message => ({
  id: stompMessage.messageId,
  chatRoomId: 0,
  text: stompMessage.content,
  isOwn: stompMessage.senderId === currentUserId.toString(),
  timestamp: new Date(stompMessage.sentAt),
  status: 'sent',
});

const useChat = (token: string, currentUserId: string) => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [messagePage, setMessagePage] = useState(0);

  const { socket, isConnected } = useWebSocket(token, currentUserId);

  const loadChatRooms = async (page: number = 0) => {
    if (!currentUserId) return;

    try {
      setLoading(true);
      const response = await getChatRooms(page, 20);
      const convertedRooms = response.data.content.rooms.map(
        convertApiChatRoomToLocal,
      );
      setChatRooms(convertedRooms);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (
    chatRoomId: number,
    page: number = 0,
    append: boolean = false,
  ) => {
    if (!currentUserId) return;

    setLoading(true);

    const response = await getChatMessages(chatRoomId, page, 50);
    const convertedMessages = response.data.content.chats
      .map((msg) => convertApiMessageToLocal(msg))
      .map((msg) => ({ ...msg, chatRoomId }));

    if (append) {
      setMessages((prev) => [...convertedMessages.reverse(), ...prev]);
    } else {
      setMessages(convertedMessages.reverse());
    }

    setHasMoreMessages(response.data.content.sliceInfo.hasNext);
    setLoading(false);
  };

  const loadMoreMessages = async () => {
    if (!selectedChatId || !hasMoreMessages || loading) return;

    const nextPage = messagePage + 1;
    setMessagePage(nextPage);
    await loadMessages(selectedChatId, nextPage, true);
  };

  const selectChat = async (chatId: number) => {
    setSelectedChatId(chatId);
    setMessagePage(0);
    setHasMoreMessages(true);

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

    setMessages((prev) => [...prev, tempMessage]);

    if (socket && isConnected) {
      try {
        socket.sendMessage(selectedChatId, text);
      } catch {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempMessage.id ? { ...msg, status: 'failed' } : msg,
          ),
        );
        return;
      }
    } else {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id ? { ...msg, status: 'failed' } : msg,
        ),
      );
      return;
    }

    setChatRooms((prev) => {
      const updatedRooms = prev.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              lastMessage: text,
              lastMessageTime: new Date(),
            }
          : chat,
      );

      const selectedRoom = updatedRooms.find(
        (chat) => chat.id === selectedChatId,
      );
      const otherRooms = updatedRooms.filter(
        (chat) => chat.id !== selectedChatId,
      );

      return selectedRoom ? [selectedRoom, ...otherRooms] : updatedRooms;
    });
  };

  const markMessageAsRead = async (chatRoomId: number, messageId: number) => {
    if (!messageId || messageId <= 0) return;

    const payload = { lastReadMessageId: messageId };
    await markAsRead(chatRoomId, payload);

    if (socket && isConnected) {
      socket.markMessageAsRead(chatRoomId, messageId);
    }
  };

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleNewMessage = (data: StompNewMessageEvent) => {
      const newMessage = convertStompMessageToLocal(data, currentUserId);

      setMessages((prev) => {
        const filtered = prev.filter(
          (msg) =>
            !(
              msg.status === 'sending' &&
              msg.text === newMessage.text &&
              msg.isOwn
            ),
        );
        return [...filtered, newMessage];
      });

      if (!newMessage.isOwn) {
        setChatRooms((prev) => {
          const updated = prev.map((chat) => {
            if (chat.id === selectedChatId) {
              return {
                ...chat,
                lastMessage: newMessage.text,
                lastMessageTime: newMessage.timestamp,
              };
            }
            return chat;
          });
          return updated;
        });
      }
    };

    const handleChatRoomUpdate = (
      data: StompChatRoomUpdateEvent | StompChatRoomUpdateEvent[],
    ) => {
      if (Array.isArray(data)) {
        const convertedRooms = data.map(convertStompChatRoomToLocal);
        setChatRooms(convertedRooms);
      } else {
        const convertedRoom = convertStompChatRoomToLocal(data);

        setChatRooms((prevRooms) => {
          const existingIndex = prevRooms.findIndex(
            (room) => room.id === convertedRoom.id,
          );

          if (existingIndex >= 0) {
            const updatedRooms = [...prevRooms];
            updatedRooms[existingIndex] = convertedRoom;

            if (convertedRoom.lastMessageTime) {
              updatedRooms.sort(
                (a, b) =>
                  new Date(b.lastMessageTime).getTime() -
                  new Date(a.lastMessageTime).getTime(),
              );
            }

            return updatedRooms;
          }
          return [convertedRoom, ...prevRooms];
        });
      }
    };

    socket.onAllMessages({
      onNewMessage: handleNewMessage,
      onChatRoomUpdate: handleChatRoomUpdate,
    });
  }, [socket, isConnected, selectedChatId, currentUserId]);

  useEffect(() => {
    if (currentUserId) {
      loadChatRooms();
    }
  }, [currentUserId]);

  useEffect(() => {
    if (selectedChatId) {
      loadMessages(selectedChatId);
    }
  }, [selectedChatId]);

  return {
    selectedChatId,
    chatRooms,
    messages,
    loading,
    hasMoreMessages,
    isConnected,
    selectChat,
    sendMessage,
    markMessageAsRead,
    loadMoreMessages,
  };
};

export default useChat;

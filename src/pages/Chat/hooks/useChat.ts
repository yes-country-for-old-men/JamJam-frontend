import { useState, useEffect } from 'react';
import useWebSocket from '@hooks/useWebSocket';
import type {
  ChatRoom,
  Message,
  StompNewMessageEvent,
  StompChatRoomUpdateEvent,
} from '@type/Chat';

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

interface UseChatProps {
  token: string;
  currentUserId: string;
  selectedChatId: number | null;
  onChatRoomUpdate?: (rooms: ChatRoom | ChatRoom[]) => void;
  onNewMessage?: (message: Message) => void;
}

const useChat = ({
  token,
  currentUserId,
  selectedChatId,
  onChatRoomUpdate,
  onNewMessage,
}: UseChatProps) => {
  const [tempMessages, setTempMessages] = useState<Message[]>([]);

  const { socket, isConnected } = useWebSocket(token, currentUserId);

  const selectChat = async (chatId: number) => {
    setTempMessages([]);

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

    setTempMessages((prev) => [...prev, tempMessage]);

    if (socket && isConnected) {
      try {
        socket.sendMessage(selectedChatId, text);
      } catch {
        setTempMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempMessage.id ? { ...msg, status: 'failed' } : msg,
          ),
        );
      }
    } else {
      setTempMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id ? { ...msg, status: 'failed' } : msg,
        ),
      );
    }
  };

  const markMessageAsRead = (chatRoomId: number, messageId: number) => {
    if (socket && isConnected) {
      socket.markMessageAsRead(chatRoomId, messageId);
    }
  };

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleNewMessage = (data: StompNewMessageEvent) => {
      const newMessage = convertStompMessageToLocal(data, currentUserId);

      setTempMessages((prev) => {
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

      onNewMessage?.(newMessage);
    };

    const handleChatRoomUpdate = (
      data: StompChatRoomUpdateEvent | StompChatRoomUpdateEvent[],
    ) => {
      if (Array.isArray(data)) {
        const convertedRooms = data.map(convertStompChatRoomToLocal);
        onChatRoomUpdate?.(convertedRooms);
      } else {
        const convertedRoom = convertStompChatRoomToLocal(data);
        onChatRoomUpdate?.(convertedRoom);
      }
    };

    socket.onAllMessages({
      onNewMessage: handleNewMessage,
      onChatRoomUpdate: handleChatRoomUpdate,
    });
  }, [socket, isConnected, currentUserId, onChatRoomUpdate, onNewMessage]);

  useEffect(() => {
    if (selectedChatId) {
      setTempMessages([]);
    }
  }, [selectedChatId]);

  return {
    tempMessages,
    isConnected,
    selectChat,
    sendMessage,
    markMessageAsRead,
  };
};

export default useChat;

import { useState, useEffect } from 'react';
import { useWebSocket } from '@/shared/hooks/useWebSocket';
import type {
  ChatRoom,
  Message,
  StompNewMessageEvent,
  StompChatRoomUpdateEvent,
} from '@/features/chat/types/Chat';

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
): Message => {
  const firstFile = stompMessage.files?.[0];

  return {
    id: stompMessage.messageId,
    chatRoomId: 0,
    text: stompMessage.content,
    isOwn: stompMessage.senderId === currentUserId.toString(),
    timestamp: new Date(stompMessage.sentAt),
    status: 'sent',
    messageType: stompMessage.messageType || 'TEXT',
    fileUrl: firstFile?.fileUrl ?? stompMessage.fileUrl,
    fileName: firstFile?.fileName ?? stompMessage.fileName,
    fileSize: firstFile?.fileSize ?? stompMessage.fileSize,
    files: stompMessage.files,
    orderId: stompMessage.orderId,
    orderContent: stompMessage.orderContent,
  };
};

interface UseChatProps {
  token: string;
  currentUserId: string;
  selectedChatId: number | null;
  onChatRoomUpdate?: (rooms: ChatRoom | ChatRoom[]) => void;
  onNewMessage?: (message: Message) => void;
}

export const useChat = ({
  token,
  currentUserId,
  selectedChatId,
  onChatRoomUpdate,
  onNewMessage,
}: UseChatProps) => {
  const [tempMessages, setTempMessages] = useState<Message[]>([]);

  const { socket, isConnected } = useWebSocket(token, currentUserId);

  const clearTempMessages = () => {
    setTempMessages([]);
  };

  const addTempMessage = (message: Message) => {
    setTempMessages((prev) => [...prev, message]);
  };

  const updateTempMessage = (messageId: number, updates: Partial<Message>) => {
    setTempMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, ...updates } : msg)),
    );
  };

  const removeTempMessagesByText = (text: string) => {
    setTempMessages((prev) =>
      prev.filter(
        (msg) => !(msg.status === 'sending' && msg.text === text && msg.isOwn),
      ),
    );
  };

  const removeTempMessage = (message: Message) => {
    setTempMessages((prev) =>
      prev.filter((msg) => {
        if (msg.status !== 'sending' || !msg.isOwn) return true;

        if (message.fileUrl && msg.fileUrl === message.fileUrl) {
          return false;
        }

        if (!message.fileUrl && msg.text === message.text) {
          return false;
        }

        return true;
      }),
    );
  };

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleNewMessage = (data: StompNewMessageEvent) => {
      const newMessage = convertStompMessageToLocal(data, currentUserId);

      removeTempMessage(newMessage);
      addTempMessage(newMessage);

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
    socket,
    clearTempMessages,
    addTempMessage,
    updateTempMessage,
    removeTempMessagesByText,
  };
};

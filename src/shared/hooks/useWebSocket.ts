import { useState, useEffect } from 'react';
import { ChatWebSocket } from '@/features/chat/services/ChatWebSocket';

export const useWebSocket = (token: string, currentUserId: string) => {
  const [socket, setSocket] = useState<ChatWebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token || !currentUserId) return;

    const chatSocket = new ChatWebSocket(
      token,
      currentUserId,
      import.meta.env.VITE_WS_URL,
    );
    setSocket(chatSocket);

    chatSocket
      .connect()
      .then(() => {
        setIsConnected(true);
      })
      .catch(() => {
        setIsConnected(false);
      });

    // eslint-disable-next-line consistent-return
    return () => {
      chatSocket.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, [token, currentUserId]);

  return { socket, isConnected };
};

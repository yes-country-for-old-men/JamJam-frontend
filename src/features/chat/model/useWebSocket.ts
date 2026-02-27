import { useState, useEffect } from 'react';
import { chatWebSocket } from '@/features/chat/services/ChatWebSocket';

export const useWebSocket = (token: string, currentUserId: string) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token || !currentUserId) return;

    chatWebSocket.onConnectionChange(setIsConnected);

    chatWebSocket.connect(token, currentUserId).catch(() => {
      setIsConnected(false);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      chatWebSocket.disconnect();
      setIsConnected(false);
    };
  }, [token, currentUserId]);

  return { socket: chatWebSocket, isConnected };
};

import { getChatMessages } from '@apis/chat';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { ChatMessage, Message } from '@type/Chat';

const convertApiMessageToLocal = (
  apiMessage: ChatMessage & { messageId?: number },
  chatRoomId: number,
): Message => ({
  id: apiMessage.messageId || 0,
  chatRoomId,
  text: apiMessage.content,
  isOwn: apiMessage.isOwn,
  timestamp: new Date(apiMessage.sentAt),
  status: 'sent',
});

const useChatMessagesQuery = (chatRoomId: number | null) => {
  return useInfiniteQuery({
    queryKey: ['chatMessages', chatRoomId],
    queryFn: async ({ pageParam = 0 }) => {
      if (!chatRoomId) return { messages: [], hasNext: false };

      const response = await getChatMessages({
        chatRoomId,
        page: pageParam,
        size: 50,
      });
      const messages = response.data.content.chats.map((msg) =>
        convertApiMessageToLocal(msg, chatRoomId),
      );

      return {
        messages,
        hasNext: response.data.content.sliceInfo.hasNext,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined;
    },
    enabled: !!chatRoomId,
    staleTime: 60 * 1000,
    initialPageParam: 0,
  });
};

export default useChatMessagesQuery;

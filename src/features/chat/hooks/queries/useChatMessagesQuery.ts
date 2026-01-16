import { useInfiniteQuery } from '@tanstack/react-query';
import { getChatMessages } from '@/features/chat/api/chatApi';
import type { ChatMessage, Message } from '@/features/chat/types/Chat';

const convertApiMessageToLocal = (
  apiMessage: ChatMessage & { messageId?: number },
  chatRoomId: number,
): Message => {
  const firstFile = apiMessage.files?.[0];

  return {
    id: apiMessage.messageId || 0,
    chatRoomId,
    text: apiMessage.content,
    isOwn: apiMessage.isOwn,
    timestamp: new Date(apiMessage.sentAt),
    status: 'sent',
    messageType: apiMessage.messageType || 'TEXT',
    fileUrl: firstFile?.fileUrl ?? apiMessage.fileUrl,
    fileName: firstFile?.fileName ?? apiMessage.fileName,
    fileSize: firstFile?.fileSize ?? apiMessage.fileSize,
    files: apiMessage.files,
  };
};

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

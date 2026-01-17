import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markAsRead } from '@/features/chat/api/chatApi';

interface MarkAsReadParams {
  chatRoomId: number;
  messageId: number;
}

export const useMarkAsReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ chatRoomId, messageId }: MarkAsReadParams) => {
      if (!messageId || messageId <= 0) return;

      const payload = { lastReadMessageId: messageId };
      await markAsRead(chatRoomId, payload);
    },
    onSuccess: (_, { chatRoomId }) => {
      queryClient.invalidateQueries({
        queryKey: ['chatRooms'],
      });
      queryClient.invalidateQueries({
        queryKey: ['chatMessages', chatRoomId],
      });
    },
  });
};

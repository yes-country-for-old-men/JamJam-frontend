import { getChatRooms } from '@apis/chat';
import { useQuery } from '@tanstack/react-query';
import type { ChatRoomSummary, ChatRoom } from '@type/Chat';

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

const useChatRoomsQuery = (currentUserId: string, page: number = 0) => {
  return useQuery({
    queryKey: ['chatRooms', currentUserId, page],
    queryFn: async () => {
      const response = await getChatRooms({ page, size: 20 });
      return response.data.content.rooms.map(convertApiChatRoomToLocal);
    },
    enabled: !!currentUserId,
    staleTime: 30 * 1000,
  });
};

export default useChatRoomsQuery;

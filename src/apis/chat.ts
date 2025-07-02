import apiClient from '@apis/apiClient';
import type APIResponse from '@type/APIResponse';
import type { ChatRoomSummary, ChatMessage } from '@type/Chat';

export interface MarkAsReadRequest {
  lastReadMessageId: number;
}

type ChatRoomsContent = {
  rooms: ChatRoomSummary[];
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
};

type ChatMessagesContent = {
  sliceInfo: {
    hasNext: boolean;
  };
  chats: ChatMessage[];
};

type CreateChatRoomContent = {
  roomId: number;
};

export const getChatRooms = (page: number = 0, size: number = 20) =>
  apiClient.get<APIResponse<ChatRoomsContent>>(
    `/api/chat/rooms?page=${page}&size=${size}`,
  );

export const getChatMessages = (
  chatRoomId: number,
  page: number = 0,
  size: number = 50,
) =>
  apiClient.get<APIResponse<ChatMessagesContent>>(
    `/api/chat/rooms/${chatRoomId}/messages?page=${page}&size=${size}`,
  );

export const createChatRoom = (otherId: number) =>
  apiClient.post<APIResponse<CreateChatRoomContent>>(
    `/api/chat/room?otherId=${otherId}`,
  );

export const markAsRead = (chatRoomId: number, data: MarkAsReadRequest) =>
  apiClient.put(`/api/chat/rooms/${chatRoomId}/read`, data);

export const leaveChatRoom = (chatRoomId: number) =>
  apiClient.delete(`/api/chat/rooms/${chatRoomId}`);

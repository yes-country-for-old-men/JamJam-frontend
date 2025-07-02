import apiClient from '@apis/apiClient';
import type { ChatRoomSummary, ChatMessage } from '@type/Chat';

export interface MarkAsReadRequest {
  lastReadMessageId: number;
}

export interface ChatRoomsResponse {
  content: {
    rooms: ChatRoomSummary[];
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
  };
}

export interface ChatMessagesResponse {
  content: {
    sliceInfo: {
      hasNext: boolean;
    };
    chats: ChatMessage[];
  };
}

export interface CreateChatRoomResponse {
  content: {
    roomId: number;
  };
}

export const getChatRooms = (page: number = 0, size: number = 20) =>
  apiClient.get<ChatRoomsResponse>(`/api/chat/rooms?page=${page}&size=${size}`);

export const getChatMessages = (
  chatRoomId: number,
  page: number = 0,
  size: number = 50,
) =>
  apiClient.get<ChatMessagesResponse>(
    `/api/chat/rooms/${chatRoomId}/messages?page=${page}&size=${size}`,
  );

export const createChatRoom = (otherId: number) =>
  apiClient.post<CreateChatRoomResponse>(`/api/chat/room?otherId=${otherId}`);

export const markAsRead = (chatRoomId: number, data: MarkAsReadRequest) =>
  apiClient.put(`/api/chat/rooms/${chatRoomId}/read`, data);

export const leaveChatRoom = (chatRoomId: number) =>
  apiClient.delete(`/api/chat/rooms/${chatRoomId}`);

import apiClient from '@/shared/api/apiClient';
import type { ChatRoomSummary, ChatMessage } from '@/features/chat/types/Chat';
import type ApiResponse from '@/shared/types/ApiResponse';

export interface ChatRoomsRequest {
  page?: number;
  size?: number;
}

export interface ChatMessagesRequest {
  chatRoomId: number;
  page?: number;
  size?: number;
}

export interface CreateChatRoomRequest {
  otherId: number;
}

export interface MarkAsReadRequest {
  lastReadMessageId: number;
}

interface ChatRoomsContent {
  rooms: ChatRoomSummary[];
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
}

interface ChatMessagesContent {
  sliceInfo: {
    hasNext: boolean;
  };
  chats: ChatMessage[];
}

interface CreateChatRoomContent {
  roomId: number;
}

export const getChatRooms = (params: ChatRoomsRequest = {}) =>
  apiClient.get<ApiResponse<ChatRoomsContent>>('/api/chat/rooms', {
    params: { page: 0, size: 20, ...params },
  });

export const getChatMessages = ({
  chatRoomId,
  ...params
}: ChatMessagesRequest) =>
  apiClient.get<ApiResponse<ChatMessagesContent>>(
    `/api/chat/rooms/${chatRoomId}/messages`,
    { params: { page: 0, size: 50, ...params } },
  );

export const createChatRoom = (params: CreateChatRoomRequest) =>
  apiClient.post<ApiResponse<CreateChatRoomContent>>('/api/chat/room', null, {
    params,
  });

export const markAsRead = (chatRoomId: number, data: MarkAsReadRequest) =>
  apiClient.put<ApiResponse<void>>(`/api/chat/rooms/${chatRoomId}/read`, data);

export const leaveChatRoom = (chatRoomId: number) =>
  apiClient.delete<ApiResponse<void>>(`/api/chat/rooms/${chatRoomId}`);

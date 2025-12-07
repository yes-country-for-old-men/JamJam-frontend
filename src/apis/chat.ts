import apiClient from '@apis/apiClient';
import type APIResponse from '@type/APIResponse';
import type { ChatRoomSummary, ChatMessage } from '@type/Chat';

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
  apiClient.get<APIResponse<ChatRoomsContent>>('/api/chat/rooms', {
    params: { page: 0, size: 20, ...params },
  });

export const getChatMessages = ({
  chatRoomId,
  ...params
}: ChatMessagesRequest) =>
  apiClient.get<APIResponse<ChatMessagesContent>>(
    `/api/chat/rooms/${chatRoomId}/messages`,
    { params: { page: 0, size: 50, ...params } },
  );

export const createChatRoom = (params: CreateChatRoomRequest) =>
  apiClient.post<APIResponse<CreateChatRoomContent>>('/api/chat/room', null, {
    params,
  });

export const markAsRead = (chatRoomId: number, data: MarkAsReadRequest) =>
  apiClient.put<APIResponse<void>>(`/api/chat/rooms/${chatRoomId}/read`, data);

export const leaveChatRoom = (chatRoomId: number) =>
  apiClient.delete<APIResponse<void>>(`/api/chat/rooms/${chatRoomId}`);

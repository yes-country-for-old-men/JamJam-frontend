export interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  profileUrl: string;
}

export interface Message {
  id: number;
  chatRoomId: number;
  text: string;
  isOwn: boolean;
  timestamp: Date;
  status: 'sending' | 'sent' | 'failed';
}

export interface ChatRoomSummary {
  id: number;
  nickname: string;
  lastMessage: string | undefined;
  lastMessageTime: string | null;
  unreadCount: number;
  profileUrl: string | null;
}

export interface ChatMessage {
  messageId?: number;
  content: string;
  isOwn: boolean;
  sentAt: string;
}

export interface SendMessageRequest {
  roomId: number;
  message: string;
}

export interface MessageReadRequest {
  roomId: number;
  lastReadMessageId: number;
}

export interface SocketEvent<T> {
  type:
    | 'CONNECT'
    | 'SEND_MESSAGE'
    | 'MESSAGE_READ'
    | 'NEW_MESSAGE'
    | 'CHAT_ROOM_UPDATE';
  content: T;
}

export interface StompNewMessageEvent {
  messageId: number;
  senderId: string;
  senderNickname: string;
  content: string;
  sentAt: string;
}

export interface StompChatRoomUpdateEvent {
  id: number;
  nickname: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  profileUrl: string | null;
}

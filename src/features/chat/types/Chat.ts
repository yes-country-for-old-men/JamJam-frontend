export type MessageType =
  | 'TEXT'
  | 'IMAGE'
  | 'FILE'
  | 'REQUEST_PAYMENT'
  | 'REQUEST_FORM'
  | 'PAYMENT_COMPLETED'
  | 'ORDER_CANCELLED'
  | 'WORK_COMPLETED'
  | 'WORK_CONFIRMED'
  | 'SERVICE_INQUIRY';

export type FileType = 'IMAGE' | 'FILE';

export interface OrderMessageContent {
  serviceId: number;
  serviceName: string;
  serviceThumbnail?: string;
  orderId?: number;
}

export interface ChatFileInfo {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: FileType;
}

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
  messageType?: MessageType;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  files?: ChatFileInfo[];
  orderId?: number;
  orderContent?: OrderMessageContent;
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
  messageType?: MessageType;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  files?: ChatFileInfo[];
  orderId?: number;
  orderContent?: OrderMessageContent;
}

export interface SendMessageRequest {
  roomId: number;
  message: string;
  messageType?: MessageType;
  files?: ChatFileInfo[];
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
  messageType?: MessageType;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  files?: ChatFileInfo[];
  orderId?: number;
  orderContent?: OrderMessageContent;
}

export interface StompChatRoomUpdateEvent {
  id: number;
  nickname: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  profileUrl: string | null;
}

import {
  Client,
  StompConfig,
  type IMessage,
  type IFrame,
} from '@stomp/stompjs';
import { eventManager } from '@/shared/utils';
import type {
  StompNewMessageEvent,
  StompChatRoomUpdateEvent,
  SendMessageRequest,
  MessageReadRequest,
  SocketEvent,
  MessageType,
  ChatFileInfo,
} from '@/features/chat/types/Chat';

interface EventHandlers {
  onNewMessage?: (data: StompNewMessageEvent) => void;
  onChatRoomUpdate?: (
    data: StompChatRoomUpdateEvent | StompChatRoomUpdateEvent[],
  ) => void;
  onConnectionChange?: (isConnected: boolean) => void;
}

const showAlert = (title: string, content: string) => {
  eventManager.emit('alert', {
    title,
    content,
  });
};

class ChatWebSocket {
  private client: Client | null = null;
  private token: string;
  private userId: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private url: string;
  private isAuthenticated = false;
  private connectResolve: ((value: void) => void) | null = null;
  private connectReject: ((reason?: unknown) => void) | null = null;
  private eventHandlers: EventHandlers = {};
  private subscriptions: Map<string, unknown> = new Map();
  private currentRoomId: number | null = null;

  constructor(token: string, userId: string, url: string) {
    this.token = token;
    this.userId = userId;
    this.url = url;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.connectResolve = resolve;
        this.connectReject = reject;

        const stompConfig: StompConfig = {
          brokerURL: this.url,
          connectHeaders: { Authorization: `Bearer ${this.token}` },
          debug: () => {},
          reconnectDelay: this.reconnectDelay,
          heartbeatIncoming: 10000,
          heartbeatOutgoing: 10000,
          onConnect: this.handleConnect.bind(this),
          onStompError: this.handleStompError.bind(this),
          onWebSocketError: this.handleWebSocketError.bind(this),
          onDisconnect: this.handleDisconnect.bind(this),
        };

        this.client = new Client(stompConfig);
        this.client.activate();
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleConnect(): void {
    this.reconnectAttempts = 0;
    this.isAuthenticated = true;
    this.setupSubscriptions();
    this.eventHandlers.onConnectionChange?.(true);

    if (this.connectResolve) {
      this.connectResolve();
      this.connectResolve = null;
      this.connectReject = null;
    }
  }

  private handleStompError(frame: IFrame): void {
    this.isAuthenticated = false;
    this.eventHandlers.onConnectionChange?.(false);

    if (this.connectReject) {
      const errorMessage = frame.headers?.message || 'Unknown STOMP error';
      this.connectReject(new Error(`STOMP Error: ${errorMessage}`));
      this.connectResolve = null;
      this.connectReject = null;
    }
  }

  private handleWebSocketError(error: unknown): void {
    this.isAuthenticated = false;
    this.eventHandlers.onConnectionChange?.(false);

    if (this.connectReject) {
      this.connectReject(error);
      this.connectResolve = null;
      this.connectReject = null;
    }
  }

  private handleDisconnect(): void {
    this.isAuthenticated = false;
    this.eventHandlers.onConnectionChange?.(false);
    this.attemptReconnect();
  }

  private setupSubscriptions(): void {
    if (!this.client?.connected) return;

    const topicRoomUpdatesSubscription = this.client.subscribe(
      `/topic/user-room-updates/${this.userId}`,
      this.handleMessage.bind(this),
    );
    this.subscriptions.set('topic-room-updates', topicRoomUpdatesSubscription);
  }

  private subscribeToRoom(roomId: number): void {
    if (!this.client?.connected) return;

    if (this.currentRoomId && this.currentRoomId !== roomId) {
      this.unsubscribeFromRoom(this.currentRoomId);
    }

    this.currentRoomId = roomId;
    const roomTopic = `/topic/room/${roomId}`;

    if (this.subscriptions.has(`room-${roomId}`)) return;

    const subscription = this.client.subscribe(
      roomTopic,
      this.handleMessage.bind(this),
    );
    this.subscriptions.set(`room-${roomId}`, subscription);
  }

  private unsubscribeFromRoom(roomId: number): void {
    const subscription = this.subscriptions.get(`room-${roomId}`);
    if (subscription) {
      (subscription as { unsubscribe: () => void }).unsubscribe();
      this.subscriptions.delete(`room-${roomId}`);
    }
  }

  private handleMessage(message: IMessage): void {
    const data = JSON.parse(message.body) as SocketEvent<unknown>;

    switch (data.type) {
      case 'NEW_MESSAGE':
        this.eventHandlers.onNewMessage?.(data.content as StompNewMessageEvent);
        break;
      case 'CHAT_ROOM_UPDATE':
        this.eventHandlers.onChatRoomUpdate?.(
          data.content as StompChatRoomUpdateEvent,
        );
        break;
      default:
        break;
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts += 1;

      setTimeout(() => {
        this.connect().catch(() => undefined);
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      showAlert('연결 실패', '네트워크 연결이 불안정합니다.');
    }
  }

  private publishMessage(
    destination: string,
    payload: SocketEvent<unknown>,
  ): void {
    if (!this.client?.connected || !this.isAuthenticated) {
      throw new Error();
    }

    this.client.publish({
      destination,
      body: JSON.stringify(payload),
      headers: { 'content-type': 'application/json' },
    });
  }

  sendMessage(
    roomId: number,
    message: string,
    options?: {
      messageType: MessageType;
      files: ChatFileInfo[];
    },
  ): void {
    const payload: SocketEvent<SendMessageRequest> = {
      type: 'SEND_MESSAGE',
      content: {
        roomId,
        message,
        ...(options && {
          messageType: options.messageType,
          files: options.files,
        }),
      },
    };

    try {
      this.publishMessage('/app/chat', payload);
    } catch {
      showAlert(
        '전송 실패',
        '메시지를 전송하지 못했습니다. 다시 시도해 주세요.',
      );
    }
  }

  markMessageAsRead(roomId: number, lastReadMessageId: number): void {
    const payload: SocketEvent<MessageReadRequest> = {
      type: 'MESSAGE_READ',
      content: { roomId, lastReadMessageId },
    };

    this.publishMessage('/app/chat', payload);
  }

  joinRoom(roomId: number): void {
    this.subscribeToRoom(roomId);
  }

  leaveRoom(roomId: number): void {
    this.unsubscribeFromRoom(roomId);
  }

  onAllMessages(callbacks: EventHandlers): void {
    this.eventHandlers = callbacks;
  }

  disconnect(): void {
    this.subscriptions.forEach((subscription) => {
      (subscription as { unsubscribe: () => void }).unsubscribe();
    });
    this.subscriptions.clear();

    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }

    this.isAuthenticated = false;
    this.currentRoomId = null;
    this.connectResolve = null;
    this.connectReject = null;
  }
}

export default ChatWebSocket;

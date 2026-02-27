import { eventManager } from '@/shared/utils';
import type {
  StompNewMessageEvent,
  StompChatRoomUpdateEvent,
  SendMessageRequest,
  MessageReadRequest,
  SocketEvent,
  MessageType,
  ChatFileInfo,
} from '@/entities/chat/model/Chat';
import type { Client, IMessage, IFrame } from '@stomp/stompjs';

interface EventHandlers {
  onNewMessage?: (data: StompNewMessageEvent) => void;
  onChatRoomUpdate?: (
    data: StompChatRoomUpdateEvent | StompChatRoomUpdateEvent[],
  ) => void;
}

const DEFAULT_STOMP_CONFIG = {
  maxReconnectAttempts: 5,
  reconnectDelayMs: 1000,
  heartbeatIntervalMs: 10000,
} as const;

const showAlert = (title: string, content: string) => {
  eventManager.emit('alert', { title, content });
};

class ChatWebSocket {
  private client: Client | null = null;
  private userId: string | null = null;
  private isConnecting = false;
  private reconnectAttempts = 0;
  private eventHandlers: EventHandlers = {};
  private connectionChangeHandler: ((isConnected: boolean) => void) | null =
    null;
  private subscriptions: Map<string, unknown> = new Map();

  connect(token: string, userId: string): Promise<void> {
    if (this.client?.connected) return Promise.resolve();
    if (this.isConnecting)
      return Promise.reject(new Error('Connection already in progress'));

    this.userId = userId;
    this.isConnecting = true;

    return new Promise((resolve, reject) => {
      import('@stomp/stompjs')
        .then(({ Client }) => {
          this.client = new Client({
            brokerURL: import.meta.env.VITE_WS_URL,
            connectHeaders: { Authorization: `Bearer ${token}` },
            // eslint-disable-next-line no-console
            debug: import.meta.env.DEV ? (msg) => console.log(msg) : () => {},
            reconnectDelay: 0,
            heartbeatIncoming: DEFAULT_STOMP_CONFIG.heartbeatIntervalMs,
            heartbeatOutgoing: DEFAULT_STOMP_CONFIG.heartbeatIntervalMs,
            onConnect: () => {
              this.isConnecting = false;
              this.reconnectAttempts = 0;
              this.setupSubscriptions();
              this.connectionChangeHandler?.(true);
              resolve();
            },
            onStompError: (frame: IFrame) => {
              this.isConnecting = false;
              reject(
                new Error(frame.headers?.message || 'STOMP connection error'),
              );
            },
            onWebSocketError: (error: unknown) => {
              this.isConnecting = false;
              reject(error);
            },
            onDisconnect: () => {
              this.connectionChangeHandler?.(false);
              this.attemptReconnect();
            },
          });

          this.client.activate();
        })
        .catch((error) => {
          this.isConnecting = false;
          reject(error);
        });
    });
  }

  private shouldReconnect(): boolean {
    return this.userId !== null;
  }

  private static parseMessage(message: IMessage): SocketEvent<unknown> | null {
    try {
      return JSON.parse(message.body) as SocketEvent<unknown>;
    } catch {
      return null;
    }
  }

  private setupSubscriptions(): void {
    if (!this.client?.connected) return;

    const chatSub = this.client.subscribe(
      '/user/queue/chat',
      this.handleMessage.bind(this),
    );
    this.subscriptions.set('user-queue-chat', chatSub);

    const roomUpdatesSub = this.client.subscribe(
      '/user/queue/room-updates',
      this.handleMessage.bind(this),
    );
    this.subscriptions.set('user-queue-room-updates', roomUpdatesSub);

    const messagesSub = this.client.subscribe(
      '/user/queue/messages',
      this.handleMessage.bind(this),
    );
    this.subscriptions.set('user-queue-messages', messagesSub);
  }

  private handleMessage(message: IMessage): void {
    const data = ChatWebSocket.parseMessage(message);
    if (!data) return;

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
    if (this.reconnectAttempts >= DEFAULT_STOMP_CONFIG.maxReconnectAttempts) {
      showAlert('연결 실패', '네트워크 연결이 불안정합니다.');
      return;
    }

    this.reconnectAttempts += 1;

    setTimeout(() => {
      if (this.shouldReconnect() && this.client) {
        this.client.activate();
      }
    }, DEFAULT_STOMP_CONFIG.reconnectDelayMs * this.reconnectAttempts);
  }

  private publishMessage(
    destination: string,
    payload: SocketEvent<unknown>,
  ): void {
    if (!this.client?.connected) {
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

  onAllMessages(callbacks: EventHandlers): void {
    this.eventHandlers = callbacks;
  }

  onConnectionChange(handler: (isConnected: boolean) => void): void {
    this.connectionChangeHandler = handler;
  }

  disconnect(): void {
    this.userId = null;

    this.subscriptions.forEach((subscription) => {
      (subscription as { unsubscribe: () => void }).unsubscribe();
    });
    this.subscriptions.clear();

    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }

    this.isConnecting = false;
    this.reconnectAttempts = 0;
  }
}

export const chatWebSocket = new ChatWebSocket();

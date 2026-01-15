import React from 'react';

interface ConfirmEventPayload {
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface AlertEventPayload {
  title: string;
  content: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
}

interface EventMap {
  openLoginModal: never;
  confirm: ConfirmEventPayload;
  alert: AlertEventPayload;
}

type EventName = keyof EventMap;
type EventCallback<T extends EventName> = EventMap[T] extends never
  ? () => void
  : (payload: EventMap[T]) => void;

class EventManager {
  private listeners: Map<EventName, Array<EventCallback<EventName>>> =
    new Map();

  on<T extends EventName>(event: T, callback: EventCallback<T>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback as EventCallback<EventName>);
  }

  off<T extends EventName>(event: T, callback: EventCallback<T>): void {
    const eventListeners = this.listeners.get(event);
    if (!eventListeners) return;

    const filtered = eventListeners.filter((cb) => cb !== callback);
    if (filtered.length > 0) {
      this.listeners.set(event, filtered);
    } else {
      this.listeners.delete(event);
    }
  }

  emit<T extends EventName>(
    event: T,
    ...args: EventMap[T] extends never ? [] : [EventMap[T]]
  ): void {
    const eventListeners = this.listeners.get(event);
    if (!eventListeners) return;
    eventListeners.forEach((callback) => {
      (callback as (payload: EventMap[T]) => void)(...(args as [EventMap[T]]));
    });
  }
}

const eventManager = new EventManager();

export default eventManager;

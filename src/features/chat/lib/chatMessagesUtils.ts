import { formatDate } from '@/shared/lib';
import type { Message } from '@/entities/chat/model/Chat';

type BubblePosition = 'single' | 'first' | 'middle' | 'last';

export const groupChatMessages = (messages: Message[]) => {
  return messages.reduce<Record<string, Message[]>>((acc, message) => {
    const date = formatDate(message.timestamp);
    acc[date] = [...(acc[date] || []), message];
    return acc;
  }, {});
};

export const getBubblePosition = (
  dayMessages: Message[],
  index: number,
): BubblePosition => {
  const currentMessage = dayMessages[index];

  if (
    currentMessage.messageType === 'IMAGE' ||
    currentMessage.messageType === 'FILE'
  ) {
    return 'single';
  }

  const prevMessage = index > 0 ? dayMessages[index - 1] : null;
  const nextMessage =
    index < dayMessages.length - 1 ? dayMessages[index + 1] : null;

  const isPrevSameUser =
    prevMessage &&
    prevMessage.messageType === 'TEXT' &&
    prevMessage.isOwn === currentMessage.isOwn &&
    currentMessage.timestamp.getTime() - prevMessage.timestamp.getTime() <
      60 * 1000;

  const isNextSameUser =
    nextMessage &&
    nextMessage.messageType === 'TEXT' &&
    nextMessage.isOwn === currentMessage.isOwn &&
    nextMessage.timestamp.getTime() - currentMessage.timestamp.getTime() <
      60 * 1000;

  if (!isPrevSameUser && !isNextSameUser) return 'single';
  if (!isPrevSameUser && isNextSameUser) return 'first';
  if (isPrevSameUser && isNextSameUser) return 'middle';
  return 'last';
};

export const shouldShowProfile = (
  dayMessages: Message[],
  index: number,
): boolean => {
  const currentMessage = dayMessages[index];
  if (currentMessage.isOwn) return false;

  const prevMessage = index > 0 ? dayMessages[index - 1] : null;

  if (!prevMessage || prevMessage.isOwn !== currentMessage.isOwn) {
    return true;
  }

  if (
    prevMessage.messageType === 'IMAGE' ||
    prevMessage.messageType === 'FILE'
  ) {
    return true;
  }

  if (
    currentMessage.timestamp.getTime() - prevMessage.timestamp.getTime() >=
    60 * 1000
  ) {
    return true;
  }

  return false;
};

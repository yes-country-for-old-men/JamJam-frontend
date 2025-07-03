import { useRef, useEffect, useCallback } from 'react';
import { formatDate } from '@utils/format';
import type { Message } from '@type/Chat';

type BubblePosition = 'single' | 'first' | 'middle' | 'last';

const getBubblePosition = (
  dayMessages: Message[],
  index: number,
): BubblePosition => {
  const currentMessage = dayMessages[index];
  const prevMessage = index > 0 ? dayMessages[index - 1] : null;
  const nextMessage =
    index < dayMessages.length - 1 ? dayMessages[index + 1] : null;

  const isPrevSameUser =
    prevMessage &&
    prevMessage.isOwn === currentMessage.isOwn &&
    currentMessage.timestamp.getTime() - prevMessage.timestamp.getTime() <
      60 * 1000;

  const isNextSameUser =
    nextMessage &&
    nextMessage.isOwn === currentMessage.isOwn &&
    nextMessage.timestamp.getTime() - currentMessage.timestamp.getTime() <
      60 * 1000;

  if (!isPrevSameUser && !isNextSameUser) return 'single';
  if (!isPrevSameUser && isNextSameUser) return 'first';
  if (isPrevSameUser && isNextSameUser) return 'middle';
  return 'last';
};

const shouldShowProfile = (dayMessages: Message[], index: number): boolean => {
  const currentMessage = dayMessages[index];
  if (currentMessage.isOwn) return false;

  const prevMessage = index > 0 ? dayMessages[index - 1] : null;

  return (
    !prevMessage ||
    prevMessage.isOwn !== currentMessage.isOwn ||
    currentMessage.timestamp.getTime() - prevMessage.timestamp.getTime() >=
      60 * 1000
  );
};

const useMessageGrouping = (messages: Message[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const handleScroll = useCallback((onLoadMore: () => void) => {
    const container = messagesContainerRef.current;
    if (container && container.scrollTop === 0) {
      onLoadMore();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const groupedMessages = messages.reduce(
    (acc, message) => {
      const date = formatDate(message.timestamp);
      return {
        ...acc,
        [date]: [...(acc[date] || []), message],
      };
    },
    {} as Record<string, Message[]>,
  );

  return {
    messagesEndRef,
    messagesContainerRef,
    groupedMessages,
    getBubblePosition,
    shouldShowProfile,
    handleScroll,
  };
};

export default useMessageGrouping;

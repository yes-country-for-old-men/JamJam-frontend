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

const chatMessageGrouping = (messages: Message[]) => {
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
    groupedMessages,
    getBubblePosition,
    shouldShowProfile,
  };
};

export default chatMessageGrouping;

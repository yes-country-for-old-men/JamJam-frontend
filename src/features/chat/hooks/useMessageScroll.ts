import { useRef, useCallback } from 'react';

const useMessageScroll = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isLoadingMoreRef = useRef<boolean>(false);
  const scrollPositionRef = useRef<{
    scrollTop: number;
    scrollHeight: number;
  } | null>(null);

  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  const handleScroll = useCallback((onLoadMore: () => void) => {
    const container = messagesContainerRef.current;
    if (container && !isLoadingMoreRef.current) {
      const { scrollTop, scrollHeight } = container;
      const scrollThreshold = scrollHeight * 0.1;

      if (scrollTop <= scrollThreshold) {
        scrollPositionRef.current = { scrollTop, scrollHeight };
        isLoadingMoreRef.current = true;

        requestAnimationFrame(() => {
          onLoadMore();
        });
      }
    }
  }, []);

  const maintainScrollPosition = useCallback(() => {
    if (!isLoadingMoreRef.current || !scrollPositionRef.current) return;

    const container = messagesContainerRef.current;
    if (container) {
      requestAnimationFrame(() => {
        const heightDifference =
          container.scrollHeight - scrollPositionRef.current!.scrollHeight;

        if (heightDifference > 0) {
          container.scrollTop =
            scrollPositionRef.current!.scrollTop + heightDifference;
        }

        isLoadingMoreRef.current = false;
        scrollPositionRef.current = null;
      });
    }
  }, []);

  return {
    messagesEndRef,
    messagesContainerRef,
    scrollToBottom,
    handleScroll,
    maintainScrollPosition,
  };
};

export default useMessageScroll;

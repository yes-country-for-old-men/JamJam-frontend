import { useCallback, useRef, useEffect } from 'react';

interface UseSearchProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const useSearch = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseSearchProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  return {
    observerRef,
  };
};

import { useCallback, useRef, useMemo, useEffect } from 'react';
import CATEGORIES from '@constants/serviceCategories';

interface UseCategoryProps {
  categoryId: string | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const useCategory = ({
  categoryId,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseCategoryProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const currentCategory = useMemo(() => {
    return CATEGORIES.find((category) => category.id === Number(categoryId));
  }, [categoryId]);

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
    currentCategory,
    observerRef,
  };
};

export default useCategory;

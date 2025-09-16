import { useInfiniteQuery } from '@tanstack/react-query';
import { searchServices, type ServiceSearchRequest } from '@apis/search';

const useSearchQuery = (params: Omit<ServiceSearchRequest, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['searchServices', params],
    queryFn: ({ pageParam = 1 }) =>
      searchServices({ ...params, page: pageParam, size: 16 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data?.content?.hasNext) {
        return lastPage.data.content.currentPage + 1;
      }
      return undefined;
    },
    enabled: !!(params.keyword || params.nickname),
    staleTime: 60 * 1000,
    initialPageParam: 0,
  });
};

export default useSearchQuery;

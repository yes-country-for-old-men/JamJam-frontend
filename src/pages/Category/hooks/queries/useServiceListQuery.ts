import { useInfiniteQuery } from '@tanstack/react-query';
import { getServiceList, type ServiceListRequest } from '@apis/service';

const useServiceListQuery = (params: Omit<ServiceListRequest, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['serviceList', params],
    queryFn: ({ pageParam = 0 }) =>
      getServiceList({ ...params, page: pageParam, size: 16 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data?.content?.hasNext) {
        return lastPage.data.content.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 60 * 1000,
    initialPageParam: 0,
  });
};

export default useServiceListQuery;

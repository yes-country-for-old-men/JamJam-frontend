import { useQuery } from '@tanstack/react-query';
import { getOrderCount } from '@/entities/order/api/orderApi';

export const useOrderCountQuery = () => {
  return useQuery({
    queryKey: ['orderCount'],
    queryFn: async () => {
      const response = await getOrderCount();
      return response.data.content;
    },
    staleTime: 30 * 1000,
    gcTime: 3 * 60 * 1000,
  });
};

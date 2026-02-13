import { useQuery } from '@tanstack/react-query';
import { getOrderCount } from '@/features/order/api/orderApi';

export const useOrderCountQuery = () => {
  return useQuery({
    queryKey: ['orderCount'],
    queryFn: async () => {
      const response = await getOrderCount();
      return response.data.content;
    },
  });
};

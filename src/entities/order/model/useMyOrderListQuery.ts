import { useQuery } from '@tanstack/react-query';
import { getMyOrderList } from '@/entities/order/api/orderApi';

export const useMyOrderListQuery = () => {
  return useQuery({
    queryKey: ['myOrderList'],
    queryFn: async () => {
      const response = await getMyOrderList({ page: 0, size: 20 });
      return response.data.content;
    },
  });
};

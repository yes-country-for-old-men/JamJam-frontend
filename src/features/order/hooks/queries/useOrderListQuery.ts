import { useQuery } from '@tanstack/react-query';
import { getOrderList, type OrderStatus } from '@/features/order/api/orderApi';

export const useOrderListQuery = (orderStatus: OrderStatus) => {
  return useQuery({
    queryKey: ['orderList', orderStatus],
    queryFn: async () => {
      const response = await getOrderList({ orderStatus });
      return response.data.content;
    },
  });
};

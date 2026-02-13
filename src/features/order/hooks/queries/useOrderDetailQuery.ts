import { useQuery } from '@tanstack/react-query';
import { getOrderDetail } from '@/features/order/api/orderApi';

export const useOrderDetailQuery = (orderId: number | null) => {
  return useQuery({
    queryKey: ['orderDetail', orderId],
    queryFn: async () => {
      const response = await getOrderDetail({ orderId: orderId! });
      return response.data.content;
    },
    enabled: !!orderId,
  });
};

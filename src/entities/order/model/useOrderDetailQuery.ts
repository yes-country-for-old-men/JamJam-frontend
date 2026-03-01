import { useQuery } from '@tanstack/react-query';
import { getOrderDetail } from '@/entities/order/api/orderApi';

export const useOrderDetailQuery = (orderId: number | null) => {
  return useQuery({
    queryKey: ['orderDetail', orderId],
    queryFn: async () => {
      const response = await getOrderDetail({ orderId: orderId! });
      return response.data.content;
    },
    enabled: !!orderId,
    staleTime: 30 * 1000,
    gcTime: 3 * 60 * 1000,
  });
};

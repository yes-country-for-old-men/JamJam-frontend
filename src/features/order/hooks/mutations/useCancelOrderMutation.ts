import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelOrder } from '@/entities/order/api/orderApi';

export const useCancelOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      cancelReason,
    }: {
      orderId: number;
      cancelReason: string;
    }) =>
      cancelOrder({
        orderId,
        orderStatus: 'CANCELLED',
        cancelReason,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myOrderList'] });
    },
  });
};

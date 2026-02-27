import { useMutation, useQueryClient } from '@tanstack/react-query';
import { confirmOrder } from '@/entities/order/api/orderApi';

export const useConfirmOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: number) => confirmOrder({ orderId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myOrderList'] });
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  changeOrderStatus,
  type OrderStatus,
} from '@/features/order/api/orderApi';

interface ChangeOrderStatusParams {
  orderId: number;
  orderStatus: OrderStatus;
  cancelReason?: string;
}

export const useChangeOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ChangeOrderStatusParams) => changeOrderStatus(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orderList'] });
      queryClient.invalidateQueries({ queryKey: ['orderDetail'] });
      queryClient.invalidateQueries({ queryKey: ['orderCount'] });
    },
  });
};

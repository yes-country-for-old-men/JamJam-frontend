import { useMutation, useQueryClient } from '@tanstack/react-query';
import requestPayment from '@apis/payment';

const useCreditChargeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (amount: number) => requestPayment(amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};

export default useCreditChargeMutation;

import { useMutation, useQueryClient } from '@tanstack/react-query';
import usePayment from '@/shared/components/Modal/CreditChargeModal/usePayment';

const useCreditChargeMutation = () => {
  const queryClient = useQueryClient();
  const { requestPayment } = usePayment();

  return useMutation({
    mutationFn: (amount: number) => requestPayment(amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};

export default useCreditChargeMutation;

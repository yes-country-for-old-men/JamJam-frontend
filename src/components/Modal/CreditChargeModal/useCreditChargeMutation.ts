import usePayment from '@components/Modal/CreditChargeModal/usePayment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

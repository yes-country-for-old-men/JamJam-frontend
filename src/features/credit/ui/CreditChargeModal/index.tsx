import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/shared/ui/Button';
import Modal from '@/shared/ui/Modal';
import * as S from './CreditChargeModal.styles';
import { useCreditChargeForm, MAX_CHARGE_AMOUNT } from './useCreditChargeForm';
import { usePayment } from './usePayment';

interface CreditChargeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_CHARGE_AMOUNTS = [
  { label: '+1만원', value: 10000 },
  { label: '+3만원', value: 30000 },
  { label: '+5만원', value: 50000 },
  { label: '+10만원', value: 100000 },
];

const CreditChargeModal: React.FC<CreditChargeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    amount,
    displayValue,
    isValidAmount,
    handleAmountChange,
    handleQuickCharge,
  } = useCreditChargeForm();

  const queryClient = useQueryClient();
  const { requestPayment } = usePayment();
  const chargeMutation = useMutation({
    mutationFn: (chargeAmount: number) => requestPayment(chargeAmount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });

  const handlePayment = async () => {
    if (!isValidAmount || chargeMutation.isPending) return;
    await chargeMutation.mutateAsync(amount);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidAmount && !chargeMutation.isPending) {
      handlePayment();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isValidAmount && !chargeMutation.isPending) {
        handlePayment();
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="크레딧 충전">
      <S.CreditChargeForm onSubmit={handleSubmit}>
        <S.AmountInputField>
          <S.AmountInput
            id="charge"
            type="text"
            label="충전 금액"
            value={displayValue}
            onChange={handleAmountChange}
            onKeyDown={handleKeyDown}
            placeholder="충전할 금액을 입력하세요"
          />
          <S.QuickAmountButtonGrid>
            {QUICK_CHARGE_AMOUNTS.map(({ label, value }) => (
              <S.QuickAmountButton
                key={value}
                type="button"
                onClick={() => handleQuickCharge(value)}
                disabled={amount + value > MAX_CHARGE_AMOUNT}
              >
                {label}
              </S.QuickAmountButton>
            ))}
          </S.QuickAmountButtonGrid>
        </S.AmountInputField>
        <S.InfoNotification>
          • 충전 금액은 1,000원부터 2,000,000원까지 설정할 수 있습니다.
          <br />• 결제 내역은 마이페이지에서 확인하실 수 있습니다.
        </S.InfoNotification>
        <Button
          type="submit"
          onClick={handlePayment}
          fullWidth
          disabled={!isValidAmount || chargeMutation.isPending}
        >
          충전하기
        </Button>
      </S.CreditChargeForm>
    </Modal>
  );
};

export default CreditChargeModal;

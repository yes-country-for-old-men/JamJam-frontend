import React from 'react';
import Button from '@components/Button';
import {
  QUICK_CHARGE_AMOUNTS,
  MAX_CHARGE_AMOUNT,
} from '@components/Modal/CreditChargeModal/constants';
import * as S from '@components/Modal/CreditChargeModal/CreditChargeModal.styles';
import useCreditChargeForm from '@components/Modal/CreditChargeModal/useCreditChargeForm';
import useCreditChargeMutation from '@components/Modal/CreditChargeModal/useCreditChargeMutation';

const CreditChargeModal: React.FC = () => {
  const {
    amount,
    displayValue,
    isValidAmount,
    handleAmountChange,
    handleQuickCharge,
  } = useCreditChargeForm();

  const chargeMutation = useCreditChargeMutation();

  const handlePayment = async () => {
    if (!isValidAmount || chargeMutation.isPending) return;
    await chargeMutation.mutateAsync(amount);
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
  );
};

export default CreditChargeModal;

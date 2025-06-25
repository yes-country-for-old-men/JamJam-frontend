import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import requestPayment from '@apis/requestPayment';
import Input from '@components/Input';
import Button from '@components/Button';

const CreditChargeForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const AmountInputField = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0 16px 0;
`;

const AmountInput = styled(Input)`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;

  &::placeholder {
    font-weight: 500;
  }
`;

const QuickAmountButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 8px;
`;

const QuickAmountButton = styled.button`
  width: 100%;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  padding: 10px 0;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  }
`;

const InfoNotification = styled.div`
  font-size: 11px;
  font-weight: 300;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  line-height: 1.4;
  margin-bottom: 16px;
`;

const QUICK_CHARGE_AMOUNTS = [
  { label: '+1만원', value: 10000 },
  { label: '+3만원', value: 30000 },
  { label: '+5만원', value: 50000 },
  { label: '+10만원', value: 100000 },
];

const MIN_CHARGE_AMOUNT = 1000;
const MAX_CHARGE_AMOUNT = 2000000;

const CreditChargeModal: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const parseAmount = (str: string): number => {
    const cleanStr = str.replace(/\D/g, '');
    return parseInt(cleanStr, 10) || 0;
  };

  const updateAmount = useCallback((newAmount: number) => {
    const clampedAmount = Math.min(newAmount, MAX_CHARGE_AMOUNT);
    setAmount(clampedAmount);
    setDisplayValue(clampedAmount.toLocaleString());
  }, []);

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const numericValue = parseAmount(e.target.value);
      updateAmount(numericValue);
    },
    [updateAmount],
  );

  const handleQuickCharge = useCallback(
    (chargeAmount: number) => {
      const newAmount = Math.min(amount + chargeAmount, MAX_CHARGE_AMOUNT);
      updateAmount(newAmount);
    },
    [amount, updateAmount],
  );

  const isValidAmount =
    amount >= MIN_CHARGE_AMOUNT && amount <= MAX_CHARGE_AMOUNT;

  const handlePayment = useCallback(async () => {
    if (!isValidAmount || isLoading) return;

    try {
      setIsLoading(true);
      await requestPayment(amount);
    } finally {
      setIsLoading(false);
    }
  }, [amount, isValidAmount, isLoading]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValidAmount && !isLoading) {
        handlePayment();
      }
    },
    [handlePayment, isValidAmount, isLoading],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (isValidAmount && !isLoading) {
          handlePayment();
        }
      }
    },
    [handlePayment, isValidAmount, isLoading],
  );

  return (
    <CreditChargeForm onSubmit={handleSubmit}>
      <AmountInputField>
        <AmountInput
          id="charge"
          type="text"
          label="충전 금액"
          value={displayValue}
          onChange={handleAmountChange}
          onKeyDown={handleKeyDown}
          placeholder="충전할 금액을 입력하세요"
        />
        <QuickAmountButtonGrid>
          {QUICK_CHARGE_AMOUNTS.map(({ label, value }) => (
            <QuickAmountButton
              key={value}
              type="button"
              onClick={() => handleQuickCharge(value)}
              disabled={amount + value > MAX_CHARGE_AMOUNT}
            >
              {label}
            </QuickAmountButton>
          ))}
        </QuickAmountButtonGrid>
      </AmountInputField>
      <InfoNotification>
        • 충전 금액은 1,000원부터 2,000,000원까지 설정할 수 있습니다.
        <br />• 결제 내역은 마이페이지에서 확인하실 수 있습니다.
      </InfoNotification>
      <Button
        type="submit"
        onClick={handlePayment}
        fullWidth
        disabled={!isValidAmount || isLoading}
      >
        충전하기
      </Button>
    </CreditChargeForm>
  );
};

export default CreditChargeModal;

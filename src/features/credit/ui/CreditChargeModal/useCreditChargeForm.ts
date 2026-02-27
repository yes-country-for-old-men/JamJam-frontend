import React, { useState, useCallback } from 'react';

const MIN_CHARGE_AMOUNT = 1000;
export const MAX_CHARGE_AMOUNT = 2000000;

export const useCreditChargeForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState<string>('');

  const updateAmount = useCallback((newAmount: number) => {
    const clamped = Math.min(newAmount, MAX_CHARGE_AMOUNT);
    setAmount(clamped);
    setDisplayValue(clamped.toLocaleString());
  }, []);

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const numericValue = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0;
      updateAmount(numericValue);
    },
    [updateAmount],
  );

  const handleQuickCharge = useCallback(
    (chargeAmount: number) => {
      updateAmount(Math.min(amount + chargeAmount, MAX_CHARGE_AMOUNT));
    },
    [amount, updateAmount],
  );

  const isValidAmount =
    amount >= MIN_CHARGE_AMOUNT && amount <= MAX_CHARGE_AMOUNT;

  return {
    amount,
    displayValue,
    isValidAmount,
    handleAmountChange,
    handleQuickCharge,
  };
};

import React, { useState, useCallback } from 'react';
import {
  MIN_CHARGE_AMOUNT,
  MAX_CHARGE_AMOUNT,
} from '@components/Modal/CreditChargeModal/constants';
import {
  parseAmount,
  formatDisplayValue,
  clampAmount,
  validateAmount,
} from '@components/Modal/CreditChargeModal/creditChargeUtils';

const useCreditChargeForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState<string>('');

  const updateAmount = useCallback((newAmount: number) => {
    const clampedAmount = clampAmount(newAmount, MAX_CHARGE_AMOUNT);
    setAmount(clampedAmount);
    setDisplayValue(formatDisplayValue(clampedAmount));
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

  const isValidAmount = validateAmount(
    amount,
    MIN_CHARGE_AMOUNT,
    MAX_CHARGE_AMOUNT,
  );

  return {
    amount,
    displayValue,
    isValidAmount,
    handleAmountChange,
    handleQuickCharge,
    updateAmount,
  };
};

export default useCreditChargeForm;

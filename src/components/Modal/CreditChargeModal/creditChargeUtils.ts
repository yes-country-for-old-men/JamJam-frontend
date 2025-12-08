export const parseAmount = (str: string): number => {
  const cleanStr = str.replace(/\D/g, '');
  return parseInt(cleanStr, 10) || 0;
};

export const formatDisplayValue = (amount: number): string => {
  return amount.toLocaleString();
};

export const clampAmount = (amount: number, max: number): number => {
  return Math.min(amount, max);
};

export const validateAmount = (
  amount: number,
  min: number,
  max: number,
): boolean => {
  return amount >= min && amount <= max;
};

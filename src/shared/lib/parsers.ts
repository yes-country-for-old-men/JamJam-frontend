export const parsePrice = (str: string): number => {
  const cleanStr = str.replace(/\D/g, '');
  return parseInt(cleanStr, 10) || 0;
};

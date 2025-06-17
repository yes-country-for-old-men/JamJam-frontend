export const removePaddingZero = (value: string) => {
  return value.replace(/^0+/, '') || '0';
};

export const formatPhoneNumber = (value: string) => {
  const numbersOnly = value.replace(/[^0-9]/g, '');

  let formatted = numbersOnly;
  if (numbersOnly.length > 3 && numbersOnly.length <= 7) {
    formatted = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
  } else if (numbersOnly.length > 7) {
    formatted = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  }

  return formatted;
};

export const isValidDate = (
  year: string,
  month: string,
  day: string,
): boolean => {
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);

  if (Number.isNaN(yearNum) || Number.isNaN(monthNum) || Number.isNaN(dayNum))
    return false;
  if (yearNum < 1900 || yearNum > new Date().getFullYear()) return false;
  if (monthNum < 1 || monthNum > 12) return false;

  const date = new Date(yearNum, monthNum - 1, dayNum);
  return (
    date.getDate() === dayNum &&
    date.getMonth() === monthNum - 1 &&
    date.getFullYear() === yearNum
  );
};

export const isEligibleAgeForRole = (
  year: string,
  month: string,
  day: string,
  minAge: number,
): boolean => {
  const birthDate = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
  );
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1 >= minAge;
  }
  return age >= minAge;
};

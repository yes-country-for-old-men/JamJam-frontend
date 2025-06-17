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

export const isEligibleAge = (
  year: string,
  month: string,
  day: string,
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
    return age - 1 >= 14;
  }
  return age >= 14;
};

export const validateNickname = (value: string) => {
  if (value.length === 0) {
    return null;
  }

  if (value.length < 2) {
    return '닉네임은 2자 이상이어야 합니다.';
  }

  if (value.length > 10) {
    return '닉네임은 10자 이하여야 합니다.';
  }

  if (!/^[가-힣a-zA-Z0-9]+$/.test(value)) {
    return '닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.';
  }

  return null;
};

export const validateId = (value: string) => {
  if (value.length === 0) {
    return null;
  }

  if (value.length < 4) {
    return '아이디는 4자 이상이어야 합니다.';
  }

  if (value.length > 20) {
    return '아이디는 20자 이하여야 합니다.';
  }

  if (!/^[a-z]/.test(value)) {
    return '아이디는 영소문자로 시작해야 합니다.';
  }

  if (!/^[a-z][a-z0-9]*$/.test(value)) {
    return '아이디는 소문자, 숫자만 사용할 수 있습니다.';
  }

  return null;
};

export const validatePassword = (value: string) => {
  if (value.length === 0) {
    return null;
  }

  if (value.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.';
  }

  if (!/[a-zA-Z]/.test(value)) {
    return '비밀번호에는 영문이 포함되어야 합니다.';
  }

  if (!/[0-9]/.test(value)) {
    return '비밀번호에는 숫자가 포함되어야 합니다.';
  }

  return null;
};

import { z } from 'zod';

export const nicknameSchema = z
  .string()
  .min(1, '닉네임을 입력해 주세요.')
  .min(2, '닉네임은 2자 이상이어야 합니다.')
  .max(10, '닉네임은 10자 이하여야 합니다.')
  .regex(
    /^[가-힣a-zA-Z0-9]+$/,
    '닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.',
  );

export const idSchema = z
  .string()
  .min(1, '아이디를 입력해 주세요.')
  .min(4, '아이디는 4자 이상이어야 합니다.')
  .max(20, '아이디는 20자 이하여야 합니다.')
  .regex(/^[a-z]/, '아이디는 영소문자로 시작해야 합니다.')
  .regex(/^[a-z][a-z0-9_-]*$/, '아이디는 소문자, 숫자만 사용할 수 있습니다.');

export const passwordSchema = z
  .string()
  .min(1, '비밀번호를 입력해 주세요.')
  .min(8, '비밀번호는 8자 이상이어야 합니다.')
  .regex(/[a-zA-Z]/, '비밀번호에는 영문이 포함되어야 합니다.')
  .regex(/[0-9]/, '비밀번호에는 숫자가 포함되어야 합니다.');

export const confirmPasswordSchema = z
  .string()
  .min(1, '비밀번호를 한번 더 입력해 주세요.');

export const nameSchema = z
  .string()
  .min(1, '이름을 입력해 주세요.')
  .regex(/^[가-힣\s]+$/, '이름은 한글만 입력 가능합니다.');

export const birthYearSchema = z
  .string()
  .min(1, '올바른 날짜를 입력해 주세요.')
  .regex(/^\d{4}$/, '올바른 날짜를 입력해 주세요.');

export const birthMonthSchema = z
  .string()
  .min(1, '올바른 날짜를 입력해 주세요.')
  .regex(/^(1[0-2]|[1-9])$/, '올바른 날짜를 입력해 주세요.');

export const birthDaySchema = z
  .string()
  .min(1, '올바른 날짜를 입력해 주세요.')
  .regex(/^(3[01]|[12][0-9]|[1-9])$/, '올바른 날짜를 입력해 주세요.');

export const genderSchema = z.enum(['MALE', 'FEMALE']).optional();

export const phoneSchema = z
  .string()
  .min(1, '휴대폰 번호를 입력해 주세요.')
  .regex(/^010-?[0-9]{4}-?[0-9]{4}$/, '올바른 휴대폰 번호를 입력해 주세요.');

export const verificationCodeSchema = z.string().optional();

export const roleSchema = z.enum(['provider', 'client'], {
  required_error: '역할을 선택해 주세요.',
});

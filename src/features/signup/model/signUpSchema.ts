import { z } from 'zod';
import {
  roleSchema,
  nicknameSchema,
  idSchema,
  passwordSchema,
  confirmPasswordSchema,
  nameSchema,
  birthYearSchema,
  birthMonthSchema,
  birthDaySchema,
  genderSchema,
  phoneSchema,
  verificationCodeSchema,
} from '@/features/user/model/userInfoSchema';
import { isValidDate, isEligibleAgeForRole } from '@/shared/lib';

export const step1Schema = z.object({
  role: roleSchema,
});

export const step2Schema = z
  .object({
    nickname: nicknameSchema,
    id: idSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export const createStep3Schema = (role?: 'provider' | 'client') => {
  return z
    .object({
      name: nameSchema,
      birthYear: birthYearSchema,
      birthMonth: birthMonthSchema,
      birthDay: birthDaySchema,
      gender: genderSchema,
      phone: phoneSchema,
      verificationCode: verificationCodeSchema,
    })
    .refine(
      (data) => isValidDate(data.birthYear, data.birthMonth, data.birthDay),
      {
        message: '올바른 날짜를 입력해 주세요.',
        path: ['birthDay'],
      },
    )
    .refine(
      (data) => {
        const minAge = role === 'provider' ? 60 : 14;
        return isEligibleAgeForRole(
          data.birthYear,
          data.birthMonth,
          data.birthDay,
          minAge,
        );
      },
      {
        message:
          role === 'provider'
            ? '서비스 제공자는 만 60세 이상만 가입할 수 있습니다.'
            : '만 14세 이상만 가입할 수 있습니다.',
        path: ['birthDay'],
      },
    )
    .refine((data) => data.gender !== undefined, {
      message: '성별을 선택해 주세요.',
      path: ['gender'],
    });
};

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<ReturnType<typeof createStep3Schema>>;

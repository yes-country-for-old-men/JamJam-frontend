import { z } from 'zod';
import {
  currentPasswordSchema,
  nicknameSchema,
  optionalPasswordSchema,
  optionalConfirmPasswordSchema,
  phoneSchema,
  verificationCodeSchema,
  profileUrlSchema,
  bankNameSchema,
  accountNumberSchema,
  accountHolderSchema,
} from '@schemas/userInfoSchema';

export const passwordCheckSchema = z.object({
  currentPassword: currentPasswordSchema,
});

export const editInfoSchema = z
  .object({
    nickname: nicknameSchema,
    profileUrl: profileUrlSchema,
    newPassword: optionalPasswordSchema,
    confirmPassword: optionalConfirmPasswordSchema,
    phone: phoneSchema,
    verificationCode: verificationCodeSchema,
    bankName: bankNameSchema,
    accountNumber: accountNumberSchema,
    accountHolder: accountHolderSchema,
  })
  .refine(
    (data) => {
      return !(data.newPassword && data.newPassword !== data.confirmPassword);
    },
    {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
    },
  );

export type PasswordCheckData = z.infer<typeof passwordCheckSchema>;
export type EditInfoData = z.infer<typeof editInfoSchema>;

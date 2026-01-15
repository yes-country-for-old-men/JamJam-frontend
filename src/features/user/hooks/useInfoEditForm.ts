import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import {
  passwordCheckSchema,
  editInfoSchema,
  type PasswordCheckData,
  type EditInfoData,
} from '@/features/user/schemas/editableInfoSchema';

export type PasswordCheckForm = UseFormReturn<PasswordCheckData>;
export type InfoEditForm = UseFormReturn<EditInfoData>;

const useInfoEditForm = () => {
  const passwordForm = useForm<PasswordCheckData>({
    resolver: zodResolver(passwordCheckSchema),
    defaultValues: { currentPassword: '' },
  });

  const editForm = useForm<EditInfoData>({
    resolver: zodResolver(editInfoSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      profileUrl: null,
      newPassword: '',
      confirmPassword: '',
      phone: '',
      verificationCode: '',
      bankName: '',
      accountNumber: '',
      accountHolder: '',
    },
  });

  return {
    passwordForm,
    editForm,
  };
};

export default useInfoEditForm;

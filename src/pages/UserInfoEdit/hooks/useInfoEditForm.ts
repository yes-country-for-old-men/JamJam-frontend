import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  passwordCheckSchema,
  editInfoSchema,
  type PasswordCheckData,
  type EditInfoData,
} from '@pages/UserInfoEdit/schemas/editableInfoSchemas';

export type PasswordCheckForm = UseFormReturn<PasswordCheckData>;
export type InfoEditForm = UseFormReturn<EditInfoData>;

const useInfoEditForm = () => {
  const passwordForm = useForm<PasswordCheckData>({
    resolver: zodResolver(passwordCheckSchema),
    defaultValues: { currentPassword: '' },
  });

  const editForm = useForm<EditInfoData>({
    resolver: zodResolver(editInfoSchema),
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

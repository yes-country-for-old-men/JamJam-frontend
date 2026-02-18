import { useState, useCallback } from 'react';
import { checkNickname } from '@/features/signup/api/signUpApi';
import { useDialog } from '@/shared/hooks/useDialog';
import { getErrorMessage } from '@/shared/utils';

interface NicknameCheckForm {
  getValues: (field: 'nickname') => string;
  trigger: (field: 'nickname') => Promise<boolean>;
  setError: (field: 'nickname', error: { message: string }) => void;
  clearErrors: (field: 'nickname') => void;
}

export const useNicknameCheck = (form: NicknameCheckForm) => {
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  const { alert } = useDialog();

  const handleNicknameChange = useCallback(() => {
    setIsNicknameAvailable(null);
    form.clearErrors('nickname');
  }, [form]);

  const handleNicknameCheck = useCallback(async () => {
    const nickname = form.getValues('nickname');
    const validation = await form.trigger('nickname');

    if (!validation) {
      return;
    }

    setIsCheckingNickname(true);
    try {
      const response = await checkNickname(nickname);
      const isAvailable = response.data.content.available;
      setIsNicknameAvailable(isAvailable);

      if (!isAvailable) {
        form.setError('nickname', {
          message: '이미 사용 중인 닉네임입니다.',
        });
      } else {
        form.clearErrors('nickname');
      }
    } catch (error) {
      await alert({
        title: '중복 확인 실패',
        content: getErrorMessage(error),
      });
    } finally {
      setIsCheckingNickname(false);
    }
  }, [form, alert]);

  const resetNicknameCheck = useCallback(() => {
    setIsNicknameAvailable(null);
  }, []);

  return {
    isNicknameAvailable,
    isCheckingNickname,
    handleNicknameCheck,
    handleNicknameChange,
    resetNicknameCheck,
  };
};

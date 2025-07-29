import { useState, useCallback } from 'react';
import {
  type UseFormSetValue,
  type UseFormGetValues,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form';
import { type MessageState } from '@type/MessageState';
import {
  validateNickname,
  validateId,
  validatePassword,
} from '@utils/validation';
import { checkNickname, checkLoginId } from '@apis/signUp';
import getErrorMessage from '@utils/getErrorMessage';

type ValidationStatus = 'idle' | 'available' | 'duplicate';

interface FormData extends FieldValues {
  nickname?: string;
  id?: string;
  password?: string;
  confirmPassword?: string;
}

const useValidation = <T extends FormData = FormData>() => {
  const [nicknameMessage, setNicknameMessage] = useState<MessageState>(null);
  const [idMessage, setIdMessage] = useState<MessageState>(null);
  const [passwordMessage, setPasswordMessage] = useState<MessageState>(null);
  const [confirmPasswordMessage, setConfirmPasswordMessage] =
    useState<MessageState>(null);
  const [nicknameCheckStatus, setNicknameCheckStatus] =
    useState<ValidationStatus>('idle');
  const [idCheckStatus, setIdCheckStatus] = useState<ValidationStatus>('idle');
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);

  const handleNicknameChange = useCallback(
    (value: string, setValue: UseFormSetValue<T>) => {
      setValue('nickname' as Path<T>, value as PathValue<T, Path<T>>);
      setIsNicknameChecked(false);
      setNicknameCheckStatus('idle');

      const validationError = validateNickname(value);
      if (validationError) {
        setNicknameMessage({ text: validationError, type: 'error' });
      } else {
        setNicknameMessage(null);
      }
    },
    [],
  );

  const handleNicknameCheck = useCallback(async (nickname: string) => {
    const validationError = validateNickname(nickname);
    if (validationError) {
      setNicknameMessage({ text: validationError, type: 'error' });
      return;
    }

    setIsCheckingNickname(true);
    try {
      const response = await checkNickname(nickname);
      if (response.data.content.available) {
        setNicknameMessage({
          text: '사용 가능한 닉네임입니다.',
          type: 'success',
        });
        setNicknameCheckStatus('available');
        setIsNicknameChecked(true);
      } else {
        setNicknameMessage({
          text: '이미 사용 중인 닉네임입니다.',
          type: 'error',
        });
        setNicknameCheckStatus('duplicate');
        setIsNicknameChecked(false);
      }
    } catch (error) {
      setNicknameMessage({ text: getErrorMessage(error), type: 'error' });
      setNicknameCheckStatus('idle');
      setIsNicknameChecked(false);
    } finally {
      setIsCheckingNickname(false);
    }
  }, []);

  const handleIdChange = useCallback(
    (value: string, setValue: UseFormSetValue<T>) => {
      setValue('id' as Path<T>, value as PathValue<T, Path<T>>);
      setIsIdChecked(false);
      setIdCheckStatus('idle');

      const validationError = validateId(value);
      if (validationError) {
        setIdMessage({ text: validationError, type: 'error' });
      } else {
        setIdMessage(null);
      }
    },
    [],
  );

  const handleIdCheck = useCallback(async (id: string) => {
    const validationError = validateId(id);
    if (validationError) {
      setIdMessage({ text: validationError, type: 'error' });
      return;
    }

    setIsCheckingId(true);
    try {
      const response = await checkLoginId(id);
      if (response.data.content.available) {
        setIdMessage({ text: '사용 가능한 아이디입니다.', type: 'success' });
        setIdCheckStatus('available');
        setIsIdChecked(true);
      } else {
        setIdMessage({ text: '이미 사용 중인 아이디입니다.', type: 'error' });
        setIdCheckStatus('duplicate');
        setIsIdChecked(false);
      }
    } catch (error) {
      setIdMessage({ text: getErrorMessage(error), type: 'error' });
      setIdCheckStatus('idle');
      setIsIdChecked(false);
    } finally {
      setIsCheckingId(false);
    }
  }, []);

  const handlePasswordChange = useCallback(
    (value: string, setValue: UseFormSetValue<T>) => {
      setValue('password' as Path<T>, value as PathValue<T, Path<T>>);

      const validationError = validatePassword(value);
      if (validationError) {
        setPasswordMessage({ text: validationError, type: 'error' });
      } else if (value.length > 0) {
        setPasswordMessage({
          text: '사용 가능한 비밀번호입니다.',
          type: 'success',
        });
      } else {
        setPasswordMessage(null);
      }
    },
    [],
  );

  const handleConfirmPasswordChange = useCallback(
    (
      value: string,
      setValue: UseFormSetValue<T>,
      getValues: UseFormGetValues<T>,
    ) => {
      setValue('confirmPassword' as Path<T>, value as PathValue<T, Path<T>>);

      if (value.length === 0) {
        setConfirmPasswordMessage(null);
        return;
      }

      const password = getValues('password' as Path<T>);
      if (typeof password === 'string' && password.length === 0) {
        setConfirmPasswordMessage({
          text: '먼저 비밀번호를 입력해 주세요.',
          type: 'error',
        });
        return;
      }

      if (password === value) {
        setConfirmPasswordMessage({
          text: '비밀번호가 일치합니다.',
          type: 'success',
        });
      } else {
        setConfirmPasswordMessage({
          text: '비밀번호가 일치하지 않습니다.',
          type: 'error',
        });
      }
    },
    [],
  );

  return {
    nicknameMessage,
    idMessage,
    passwordMessage,
    confirmPasswordMessage,
    nicknameCheckStatus,
    idCheckStatus,
    isNicknameChecked,
    isIdChecked,
    isCheckingNickname,
    isCheckingId,
    handleNicknameChange,
    handleNicknameCheck,
    handleIdChange,
    handleIdCheck,
    handlePasswordChange,
    handleConfirmPasswordChange,
    setNicknameMessage,
    setIdMessage,
    setPasswordMessage,
    setConfirmPasswordMessage,
  };
};

export default useValidation;

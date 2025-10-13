import React, { useState, useCallback, useEffect } from 'react';
import useModal from '@hooks/useModal';
import usePhoneVerification from '@hooks/usePhoneVerification';
import useInfoEditForm from '@pages/UserInfoEdit/hooks/useInfoEditForm';
import useUserInfoQuery from '@hooks/queries/useUserInfoQuery';
import useCheckPasswordMutation from '@pages/UserInfoEdit/hooks/mutations/useCheckPasswordMutation';
import useUpdateUserInfoMutation from '@pages/UserInfoEdit/hooks/mutations/useUpdateUserInfoMutation';
import type { UpdateUserRequest } from '@apis/user';
import { checkNickname } from '@apis/signUp';
import { formatPhoneNumber } from '@utils/format';
import getErrorMessage from '@utils/getErrorMessage';
import * as S from '@pages/UserInfoEdit/UserInfoEdit.styles';
import Button from '@components/Button';
import PasswordCheck from '@pages/UserInfoEdit/components/PasswordCheck';
import BasicInfoSection from '@pages/UserInfoEdit/components/BasicInfoSection';
import PasswordSection from '@pages/UserInfoEdit/components/PasswordSection';
import PhoneSection from '@pages/UserInfoEdit/components/PhoneSection';
import AccountSection from '@pages/UserInfoEdit/components/AccountSection';
import BANK_CODE_MAP from '@constants/bankCodes';

const BANKS = Object.entries(BANK_CODE_MAP).map(([code, name]) => ({
  code,
  name,
}));

interface UserInfoFormData {
  nickname: string;
  profileUrl?: string | File | null;
  newPassword?: string;
  confirmPassword?: string;
  phone: string;
  verificationCode?: string;
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
}

interface ChangeFlags {
  isNicknameChanged: boolean;
  isPhoneChanged: boolean;
  isPasswordChange: boolean;
  isProfileImageChanged: boolean;
  isProfileImageDeleted: boolean;
  isNewProfileImageUploaded: boolean;
  isAccountChanged: boolean;
  hasChanges: boolean;
}

const UserInfoEdit: React.FC = () => {
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [originalPhone, setOriginalPhone] = useState('');
  const [originalProfileUrl, setOriginalProfileUrl] = useState<string | null>(
    null,
  );
  const [originalNickname, setOriginalNickname] = useState('');

  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  const { alert } = useModal();
  const { passwordForm, editForm } = useInfoEditForm();

  const { data: userInfo, refetch: refetchUserInfo } = useUserInfoQuery();
  const checkPasswordMutation = useCheckPasswordMutation();
  const updateUserInfoMutation = useUpdateUserInfoMutation();

  const {
    isVerificationSent,
    isPhoneVerified,
    verificationCountdown,
    phoneMessage,
    verificationMessage,
    isSendingSMS,
    isVerifyingSMS,
    sendVerification,
    verifyCode,
    resetVerification,
    formatCountdown,
  } = usePhoneVerification();

  useEffect(() => {
    if (userInfo) {
      const userProfileUrl = userInfo.profileUrl || null;
      setOriginalProfileUrl(userProfileUrl);
      setOriginalNickname(userInfo.nickname || '');

      const formattedPhone = userInfo.phoneNumber
        ? formatPhoneNumber(userInfo.phoneNumber)
        : '';

      editForm.reset({
        nickname: userInfo.nickname || '',
        profileUrl: userProfileUrl,
        newPassword: '',
        confirmPassword: '',
        phone: formattedPhone,
        verificationCode: '',
        bankName: userInfo.account?.bankName || '',
        accountNumber: userInfo.account?.accountNumber || '',
        accountHolder: userInfo.account?.depositor || '',
      });

      setOriginalPhone(userInfo.phoneNumber || '');
    }
  }, [userInfo, editForm]);

  const handleNicknameChange = useCallback(() => {
    setIsNicknameAvailable(null);
    editForm.clearErrors('nickname');
  }, [editForm]);

  const handleNicknameCheck = useCallback(async () => {
    const nickname = editForm.getValues('nickname');
    const validation = await editForm.trigger('nickname');

    if (!validation) {
      return;
    }

    setIsCheckingNickname(true);
    try {
      const response = await checkNickname(nickname);
      const isAvailable = response.data.content.available;
      setIsNicknameAvailable(isAvailable);

      if (!isAvailable) {
        editForm.setError('nickname', {
          message: '이미 사용 중인 닉네임입니다.',
        });
      } else {
        editForm.clearErrors('nickname');
      }
    } catch (error) {
      alert({
        title: '중복 확인 실패',
        content: getErrorMessage(error),
      });
    } finally {
      setIsCheckingNickname(false);
    }
  }, [editForm, alert]);

  const getChangeFlags = useCallback(
    (formData: UserInfoFormData): ChangeFlags => {
      const isNicknameChanged = originalNickname !== formData.nickname;
      const isPhoneChanged =
        userInfo?.phoneNumber !== formData.phone.replace(/-/g, '');
      const isPasswordChange = Boolean(
        formData.newPassword && formData.newPassword.trim() !== '',
      );

      const currentProfileUrl = formData.profileUrl;
      const isProfileImageDeleted = Boolean(
        originalProfileUrl && currentProfileUrl === null,
      );
      const isNewProfileImageUploaded = currentProfileUrl instanceof File;
      const isProfileImageChanged =
        isProfileImageDeleted || isNewProfileImageUploaded;

      const currentBankName = formData.bankName || '';
      const currentAccountNumber = formData.accountNumber || '';
      const currentAccountHolder = formData.accountHolder || '';

      const originalBankName = userInfo?.account?.bankName || '';
      const originalAccountNumber = userInfo?.account?.accountNumber || '';
      const originalAccountHolder = userInfo?.account?.depositor || '';

      const isBankNameChanged = originalBankName !== currentBankName;
      const isAccountNumberChanged =
        originalAccountNumber !== currentAccountNumber;
      const isAccountHolderChanged =
        originalAccountHolder !== currentAccountHolder;
      const isAccountChanged =
        isBankNameChanged || isAccountNumberChanged || isAccountHolderChanged;

      return {
        isNicknameChanged,
        isPhoneChanged,
        isPasswordChange,
        isProfileImageChanged,
        isProfileImageDeleted,
        isNewProfileImageUploaded,
        isAccountChanged,
        hasChanges:
          isNicknameChanged ||
          isPhoneChanged ||
          isPasswordChange ||
          isProfileImageChanged ||
          isAccountChanged,
      };
    },
    [userInfo, originalProfileUrl, originalNickname],
  );

  const validateChanges = useCallback(
    (changeFlags: ChangeFlags): { isValid: boolean; errors: string[] } => {
      const { isNicknameChanged, isPhoneChanged } = changeFlags;
      const validationErrors: string[] = [];

      if (isNicknameChanged && isNicknameAvailable !== true) {
        editForm.setError('nickname', {
          message: '닉네임 중복 확인이 필요합니다.',
        });
        return { isValid: false, errors: validationErrors };
      }

      if (isPhoneChanged) {
        if (!isVerificationSent) {
          editForm.setError('phone', {
            message: '휴대폰 인증번호를 전송해 주세요.',
          });
          return { isValid: false, errors: validationErrors };
        }

        if (!isPhoneVerified) {
          editForm.setError('verificationCode', {
            message: '인증번호를 입력하고 인증 확인을 완료해 주세요.',
          });
          return { isValid: false, errors: validationErrors };
        }
      }

      return {
        isValid: validationErrors.length === 0,
        errors: validationErrors,
      };
    },
    [isNicknameAvailable, isVerificationSent, isPhoneVerified, editForm],
  );

  const buildRequestData = useCallback(
    (
      formData: UserInfoFormData,
      changeFlags: ChangeFlags,
    ): UpdateUserRequest => {
      const {
        isNicknameChanged,
        isPhoneChanged,
        isPasswordChange,
        isProfileImageDeleted,
        isNewProfileImageUploaded,
        isAccountChanged,
      } = changeFlags;

      return {
        request: {
          ...(isNicknameChanged && { nickname: formData.nickname }),
          ...(isPhoneChanged && {
            phoneNumber: formData.phone.replace(/-/g, ''),
          }),
          ...(isPasswordChange &&
            formData.newPassword && { password: formData.newPassword }),
          ...(isProfileImageDeleted && { deleteProfileImage: true }),
          ...(isAccountChanged &&
            formData.bankName && {
              account: {
                bankCode:
                  BANKS.find((bank) => bank.name === formData.bankName)?.code ||
                  '',
                bankName: formData.bankName,
                accountNumber: formData.accountNumber || '',
                depositor: formData.accountHolder || '',
              },
            }),
        },
        ...(isNewProfileImageUploaded && {
          profileUrl: formData.profileUrl as File,
        }),
      };
    },
    [],
  );

  const updateFormAfterSubmit = useCallback(
    (formData: UserInfoFormData, changeFlags: ChangeFlags): void => {
      const {
        isNicknameChanged,
        isPhoneChanged,
        isProfileImageChanged,
        isProfileImageDeleted,
      } = changeFlags;

      editForm.setValue('newPassword', '');
      editForm.setValue('confirmPassword', '');

      if (isNicknameChanged) {
        setOriginalNickname(formData.nickname);
        setIsNicknameAvailable(null);
      }

      if (isPhoneChanged) {
        setOriginalPhone(formData.phone.replace(/-/g, ''));
        resetVerification();
      }

      if (isProfileImageChanged) {
        setOriginalProfileUrl(
          isProfileImageDeleted ? null : (formData.profileUrl as string),
        );
      }
    },
    [editForm, resetVerification],
  );

  const handlePasswordVerify = async (): Promise<void> => {
    const isValid = await passwordForm.trigger();
    if (!isValid) return;

    try {
      const password = passwordForm.getValues('currentPassword');
      const response = await checkPasswordMutation.mutateAsync({ password });

      if (response.data.content.isCorrect) {
        setIsPasswordVerified(true);
        await refetchUserInfo();
      } else {
        passwordForm.setError('currentPassword', {
          message: '비밀번호가 일치하지 않습니다.',
        });
      }
    } catch (error) {
      alert({
        title: '오류',
        content: getErrorMessage(error),
      });
    }
  };

  const handlePhoneChange = useCallback(
    (value: string): void => {
      const formatted = formatPhoneNumber(value);
      editForm.setValue('phone', formatted);

      const cleanValue = formatted.replace(/-/g, '');
      const cleanOriginal = originalPhone.replace(/-/g, '');
      if (cleanValue !== cleanOriginal) {
        resetVerification();
      }
    },
    [editForm, originalPhone, resetVerification],
  );

  const handleSendVerification = useCallback(async (): Promise<void> => {
    editForm.clearErrors('phone');
    editForm.clearErrors('verificationCode');

    const phone = editForm.getValues('phone');
    if (!phone) {
      editForm.setError('phone', { message: '휴대폰 번호를 입력해 주세요.' });
      return;
    }

    const isValid = await editForm.trigger('phone');
    if (!isValid) {
      return;
    }

    await sendVerification(phone);
  }, [editForm, sendVerification]);

  const handleVerifyCode = useCallback(async (): Promise<void> => {
    const verificationCode = editForm.getValues('verificationCode');
    const phone = editForm.getValues('phone');

    if (!verificationCode) return;

    await verifyCode(phone, verificationCode);
  }, [editForm, verifyCode]);

  const handleSubmit = useCallback((): void => {
    editForm.handleSubmit(async (formData: UserInfoFormData) => {
      const changeFlags = getChangeFlags(formData);

      const validation = validateChanges(changeFlags);
      if (!validation.isValid) {
        if (validation.errors.length > 0) {
          alert({
            title: '확인 필요',
            content: validation.errors.join('\n'),
          });
        }
        return;
      }

      if (!changeFlags.hasChanges) {
        alert({
          title: '변경 사항 없음',
          content: '수정할 정보가 없습니다.',
        });
        return;
      }

      try {
        const requestData = buildRequestData(formData, changeFlags);
        await updateUserInfoMutation.mutateAsync(requestData);

        alert({
          title: '정보 수정 완료',
          content: '기본 정보가 성공적으로 수정되었습니다.',
        });

        updateFormAfterSubmit(formData, changeFlags);
      } catch (error) {
        alert({
          title: '정보 수정 실패',
          content: getErrorMessage(error),
        });
      }
    })();
  }, [
    editForm,
    getChangeFlags,
    validateChanges,
    buildRequestData,
    updateFormAfterSubmit,
    updateUserInfoMutation,
    alert,
  ]);

  if (!isPasswordVerified) {
    return (
      <PasswordCheck
        form={passwordForm}
        isLoading={checkPasswordMutation.isPending}
        onPasswordVerify={handlePasswordVerify}
      />
    );
  }

  return (
    <S.Container>
      <BasicInfoSection
        form={editForm}
        isNicknameAvailable={isNicknameAvailable}
        isCheckingNickname={isCheckingNickname}
        onNicknameChange={handleNicknameChange}
        onNicknameCheck={handleNicknameCheck}
      />
      <PasswordSection form={editForm} />
      <PhoneSection
        form={editForm}
        phoneMessage={phoneMessage}
        verificationMessage={verificationMessage}
        isVerificationSent={isVerificationSent}
        isPhoneVerified={isPhoneVerified}
        verificationCountdown={verificationCountdown}
        isSendingSMS={isSendingSMS}
        isVerifyingSMS={isVerifyingSMS}
        onPhoneChange={handlePhoneChange}
        onSendVerification={handleSendVerification}
        onVerifyCode={handleVerifyCode}
        formatCountdown={formatCountdown}
      />
      <AccountSection form={editForm} />
      <S.SubmitButtonArea>
        <Button
          size="large"
          fullWidth
          variant="primary"
          onClick={handleSubmit}
          disabled={updateUserInfoMutation.isPending}
        >
          정보 수정
        </Button>
      </S.SubmitButtonArea>
    </S.Container>
  );
};

export default UserInfoEdit;

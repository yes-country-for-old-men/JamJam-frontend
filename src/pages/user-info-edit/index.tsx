import React, { useState, useCallback, useEffect } from 'react';
import { useUserInfoQuery } from '@/entities/user/model/useUserInfoQuery';
import { useCheckPasswordMutation } from '@/features/user/model/mutations/useCheckPasswordMutation';
import { useUpdateUserInfoMutation } from '@/features/user/model/mutations/useUpdateUserInfoMutation';
import { useInfoEditForm } from '@/features/user/model/useInfoEditForm';
import AccountSection from '@/features/user/ui/UserInfoEdit/AccountSection';
import BasicInfoSection from '@/features/user/ui/UserInfoEdit/BasicInfoSection';
import PasswordCheck from '@/features/user/ui/UserInfoEdit/PasswordCheck';
import PasswordSection from '@/features/user/ui/UserInfoEdit/PasswordSection';
import PhoneSection from '@/features/user/ui/UserInfoEdit/PhoneSection';
import * as S from '@/pages/user-info-edit/UserInfoEdit.styles';
import { BANK_CODE_MAP } from '@/shared/config';
import { formatPhoneNumber, getErrorMessage } from '@/shared/lib';
import { useDialog } from '@/shared/lib/useDialog';
import { useNicknameCheck } from '@/shared/lib/useNicknameCheck';
import { usePhoneVerification } from '@/shared/lib/usePhoneVerification';
import Button from '@/shared/ui/Button';
import type { UpdateUserRequest } from '@/entities/user/api/userApi';

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

  const { alert } = useDialog();
  const { passwordForm, editForm } = useInfoEditForm();

  const {
    isNicknameAvailable,
    isCheckingNickname,
    handleNicknameCheck,
    handleNicknameChange,
    resetNicknameCheck,
  } = useNicknameCheck(editForm);

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
    resetVerification,
    formatCountdown,
    createFormHandlers,
  } = usePhoneVerification();

  const { handleSendVerification, handleVerifyCode } =
    createFormHandlers(editForm);

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
        resetNicknameCheck();
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
    [editForm, resetVerification, resetNicknameCheck],
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
      await alert({
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

  const handleSubmit = useCallback((): void => {
    editForm.handleSubmit(async (formData: UserInfoFormData) => {
      const changeFlags = getChangeFlags(formData);

      const validation = validateChanges(changeFlags);
      if (!validation.isValid) {
        if (validation.errors.length > 0) {
          await alert({
            title: '확인 필요',
            content: validation.errors.join('\n'),
          });
        }
        return;
      }

      if (!changeFlags.hasChanges) {
        await alert({
          title: '변경 사항 없음',
          content: '수정할 정보가 없습니다.',
        });
        return;
      }

      try {
        const requestData = buildRequestData(formData, changeFlags);
        await updateUserInfoMutation.mutateAsync(requestData);

        await alert({
          title: '정보 수정 완료',
          content: '기본 정보가 성공적으로 수정되었습니다.',
        });

        updateFormAfterSubmit(formData, changeFlags);
      } catch (error) {
        await alert({
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

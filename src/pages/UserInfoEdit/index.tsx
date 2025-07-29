import React, { useCallback, useState } from 'react';
import { type FieldErrors } from 'react-hook-form';
import type { MessageState } from '@type/MessageState';
import type User from '@type/User';
import useModal from '@hooks/useModal';
import useValidation from '@hooks/useValidation';
import usePhoneVerification from '@hooks/usePhoneVerification';
import useInfoEditForm from '@pages/UserInfoEdit/hooks/useInfoEditForm';
import {
  fetchUserInfo,
  updateUserInfo,
  checkPassword,
  type UpdateUserRequest,
} from '@apis/user';
import { formatPhoneNumber } from '@utils/format';
import getErrorMessage from '@utils/getErrorMessage';
import { phoneSchema } from '@schemas/userInfoSchemas';
import * as S from '@pages/UserInfoEdit/UserInfoEdit.styles';
import Button from '@components/Button';
import PasswordCheck from '@pages/UserInfoEdit/components/PasswordCheck';
import BasicInfoSection from '@pages/UserInfoEdit/components/BasicInfoSection';
import PasswordSection from '@pages/UserInfoEdit/components/PasswordSection';
import PhoneSection from '@pages/UserInfoEdit/components/PhoneSection';
import AccountSection from '@pages/UserInfoEdit/components/AccountSection';
import BANK_CODE_MAP from '@constants/bankData';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [originalPhone, setOriginalPhone] = useState('');
  const [originalProfileUrl, setOriginalProfileUrl] = useState<string | null>(
    null,
  );

  const { alert } = useModal();
  const { passwordForm, editForm } = useInfoEditForm();

  const {
    nicknameMessage,
    nicknameCheckStatus,
    isNicknameChecked,
    isCheckingNickname,
    handleNicknameChange,
    handleNicknameCheck,
    setNicknameMessage,
  } = useValidation<UserInfoFormData>();

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

  const getChangeFlags = useCallback(
    (formData: UserInfoFormData): ChangeFlags => {
      const isNicknameChanged = userInfo?.nickname !== formData.nickname;
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
    [userInfo, originalProfileUrl],
  );

  const validateChanges = useCallback(
    (changeFlags: ChangeFlags): { isValid: boolean; errors: string[] } => {
      const { isNicknameChanged, isPhoneChanged } = changeFlags;
      const validationErrors: string[] = [];

      if (
        isNicknameChanged &&
        (!isNicknameChecked || nicknameCheckStatus !== 'available')
      ) {
        setNicknameMessage({
          text: '닉네임 중복 확인이 필요합니다.',
          type: 'error',
        });
        return { isValid: false, errors: validationErrors };
      }

      if (isPhoneChanged && !isPhoneVerified) {
        validationErrors.push('휴대폰 번호 인증이 필요합니다.');
      }

      return {
        isValid: validationErrors.length === 0,
        errors: validationErrors,
      };
    },
    [
      isNicknameChecked,
      nicknameCheckStatus,
      isPhoneVerified,
      setNicknameMessage,
    ],
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
      const { isPhoneChanged, isProfileImageChanged, isProfileImageDeleted } =
        changeFlags;

      editForm.setValue('newPassword', '');
      editForm.setValue('confirmPassword', '');

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

    setIsLoading(true);
    try {
      const password = passwordForm.getValues('currentPassword');
      const response = await checkPassword({ password });

      if (response.data.content.isCorrect) {
        setIsPasswordVerified(true);
        const userData = await fetchUserInfo();
        setUserInfo(userData);

        const userProfileUrl = userData.profileUrl || null;
        setOriginalProfileUrl(userProfileUrl);

        const formattedPhone = userData.phoneNumber
          ? formatPhoneNumber(userData.phoneNumber)
          : '';

        editForm.reset({
          nickname: userData.nickname || '',
          profileUrl: userProfileUrl,
          newPassword: '',
          confirmPassword: '',
          phone: formattedPhone,
          verificationCode: '',
          bankName: userData.account?.bankName || '',
          accountNumber: userData.account?.accountNumber || '',
          accountHolder: userData.account?.depositor || '',
        });

        setOriginalPhone(userData.phoneNumber || '');
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
    } finally {
      setIsLoading(false);
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

    const phoneValidation = phoneSchema.safeParse(phone);
    if (!phoneValidation.success) {
      editForm.setError('phone', {
        message:
          phoneValidation.error.errors[0]?.message ||
          '올바른 휴대폰 번호를 입력해 주세요.',
      });
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
    editForm.handleSubmit(
      async (formData: UserInfoFormData) => {
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

        setIsSubmitting(true);
        try {
          const requestData = buildRequestData(formData, changeFlags);
          await updateUserInfo(requestData);

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
        } finally {
          setIsSubmitting(false);
        }
      },
      (errors: FieldErrors<UserInfoFormData>) => {
        if (errors.nickname) {
          setNicknameMessage({
            text: errors.nickname.message || '',
            type: 'error',
          });
        }
      },
    )();
  }, [
    editForm,
    getChangeFlags,
    validateChanges,
    buildRequestData,
    updateFormAfterSubmit,
    alert,
    setNicknameMessage,
  ]);

  const renderMessage = (message: MessageState): React.ReactElement | null => {
    if (!message) return null;
    switch (message.type) {
      case 'success':
        return <S.SuccessMessage>{message.text}</S.SuccessMessage>;
      case 'error':
        return <S.InvalidMessage>{message.text}</S.InvalidMessage>;
      case 'info':
        return <S.InfoMessage>{message.text}</S.InfoMessage>;
      default:
        return null;
    }
  };

  if (!isPasswordVerified) {
    return (
      <PasswordCheck
        form={passwordForm}
        isLoading={isLoading}
        onPasswordVerify={handlePasswordVerify}
      />
    );
  }

  return (
    <S.Container>
      <BasicInfoSection
        form={editForm}
        nicknameMessage={nicknameMessage}
        isCheckingNickname={isCheckingNickname}
        onNicknameChange={handleNicknameChange}
        onNicknameCheck={handleNicknameCheck}
        renderMessage={renderMessage}
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
        renderMessage={renderMessage}
      />
      <AccountSection form={editForm} />
      <S.SubmitButtonArea>
        <Button
          size="large"
          fullWidth
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          정보 수정
        </Button>
      </S.SubmitButtonArea>
    </S.Container>
  );
};

export default UserInfoEdit;

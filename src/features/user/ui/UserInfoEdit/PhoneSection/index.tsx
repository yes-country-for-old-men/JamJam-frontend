import React from 'react';
import { type InfoEditForm } from '@/features/user/model/useInfoEditForm';
import * as S from '@/pages/user-info-edit/UserInfoEdit.styles';
import { type MessageState } from '@/shared/types/MessageState';
import Button from '@/shared/ui/Button';
import FormMessage from '@/shared/ui/FormMessage';
import Input from '@/shared/ui/Input';

interface PhoneSectionProps {
  form: InfoEditForm;
  phoneMessage: MessageState;
  verificationMessage: MessageState;
  isVerificationSent: boolean;
  isPhoneVerified: boolean;
  verificationCountdown: number;
  isSendingSMS: boolean;
  isVerifyingSMS: boolean;
  onPhoneChange: (value: string) => void;
  onSendVerification: () => Promise<void>;
  onVerifyCode: () => Promise<void>;
  formatCountdown: (seconds: number) => string;
}

const PhoneSection: React.FC<PhoneSectionProps> = ({
  form,
  phoneMessage,
  verificationMessage,
  isVerificationSent,
  isPhoneVerified,
  verificationCountdown,
  isSendingSMS,
  isVerifyingSMS,
  onPhoneChange,
  onSendVerification,
  onVerifyCode,
  formatCountdown,
}) => {
  const phoneError = form.formState.errors.phone;
  const verificationCodeError = form.formState.errors.verificationCode;

  return (
    <S.ContentSection>
      <S.SectionHeader>휴대폰 번호</S.SectionHeader>
      <S.FieldGroup>
        <S.FieldLabel>휴대폰 번호</S.FieldLabel>
        <S.FlexInputGroup>
          <S.FlexInputWrapper>
            <Input
              placeholder="하이픈(-) 제외하고 입력"
              {...form.register('phone', {
                onChange: (e) => onPhoneChange(e.target.value),
              })}
              maxLength={13}
            />
          </S.FlexInputWrapper>
          <S.ActionButtonWrapper>
            <Button
              type="button"
              fullWidth
              onClick={onSendVerification}
              disabled={isSendingSMS || isPhoneVerified}
            >
              {isVerificationSent ? '재전송' : '인증번호 전송'}
            </Button>
          </S.ActionButtonWrapper>
        </S.FlexInputGroup>
        {phoneError ? (
          <FormMessage type="error" message={phoneError.message || ''} />
        ) : (
          phoneMessage && (
            <FormMessage type={phoneMessage.type} message={phoneMessage.text} />
          )
        )}
      </S.FieldGroup>
      {isVerificationSent && (
        <S.FieldGroup>
          <S.FieldLabel>
            인증번호
            {verificationCountdown > 0 && (
              <S.TimerText>
                {' '}
                ({formatCountdown(verificationCountdown)})
              </S.TimerText>
            )}
          </S.FieldLabel>
          <S.FlexInputGroup>
            <S.FlexInputWrapper>
              <Input
                placeholder="인증번호 6자리를 입력해 주세요"
                {...form.register('verificationCode')}
                maxLength={6}
                disabled={isPhoneVerified}
              />
            </S.FlexInputWrapper>
            {!isPhoneVerified && (
              <S.ActionButtonWrapper>
                <Button
                  type="button"
                  fullWidth
                  onClick={onVerifyCode}
                  disabled={isVerifyingSMS}
                >
                  인증 확인
                </Button>
              </S.ActionButtonWrapper>
            )}
          </S.FlexInputGroup>
          {verificationMessage ? (
            <FormMessage
              type={verificationMessage.type}
              message={verificationMessage.text}
            />
          ) : (
            verificationCodeError && (
              <FormMessage
                type="error"
                message={verificationCodeError.message || ''}
              />
            )
          )}
        </S.FieldGroup>
      )}
    </S.ContentSection>
  );
};

export default PhoneSection;

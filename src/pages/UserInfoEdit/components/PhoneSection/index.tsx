import React from 'react';
import { type UseFormReturn, Controller } from 'react-hook-form';
import { type EditInfoData } from '@pages/UserInfoEdit/schemas/editableInfoSchemas';
import { type MessageState } from '@type/MessageState';
import * as S from '@pages/UserInfoEdit/UserInfoEdit.styles';
import Input from '@components/Input';
import Button from '@components/Button';

interface PhoneSectionProps {
  form: UseFormReturn<EditInfoData>;
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
  renderMessage: (message: MessageState) => React.ReactNode;
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
  renderMessage,
}) => {
  return (
    <S.ContentSection>
      <S.SectionHeader>휴대폰 번호</S.SectionHeader>
      <S.FieldGroup>
        <S.FieldLabel>휴대폰 번호</S.FieldLabel>
        <S.FlexInputGroup>
          <S.FlexInputWrapper>
            <Controller
              name="phone"
              control={form.control}
              render={({ field }) => (
                <Input
                  placeholder="하이픈(-) 제외하고 입력"
                  value={field.value}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  maxLength={13}
                />
              )}
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
        {form.formState.errors.phone && (
          <S.InvalidMessage>
            {form.formState.errors.phone.message}
          </S.InvalidMessage>
        )}
        {renderMessage(phoneMessage)}
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
              <Controller
                name="verificationCode"
                control={form.control}
                render={({ field }) => (
                  <Input
                    placeholder="인증번호 6자리를 입력해 주세요"
                    value={field.value || ''}
                    onChange={field.onChange}
                    maxLength={6}
                    disabled={isPhoneVerified}
                  />
                )}
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
          {renderMessage(verificationMessage)}
        </S.FieldGroup>
      )}
    </S.ContentSection>
  );
};

export default PhoneSection;

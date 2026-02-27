import React from 'react';
import { type Step3Form } from '@/features/signup/model/useSignUpForm';
import * as S from '@/pages/signup/SignUp.styles';
import FemaleIcon from '@/shared/assets/icons/female.svg?react';
import MaleIcon from '@/shared/assets/icons/male.svg?react';
import { removePaddingZero, formatPhoneNumber } from '@/shared/lib';
import { type MessageState } from '@/shared/types/MessageState';
import Button from '@/shared/ui/Button';
import FormMessage from '@/shared/ui/FormMessage';
import Input from '@/shared/ui/Input';
import ToggleButton from '@/shared/ui/ToggleButton';

interface Step3Props {
  form: Step3Form;
  phoneMessage: MessageState;
  verificationMessage: MessageState;
  isVerificationSent: boolean;
  isPhoneVerified: boolean;
  verificationCountdown: number;
  isSendingSMS: boolean;
  isVerifyingSMS: boolean;
  onSendVerification: () => Promise<void>;
  onVerifyCode: () => Promise<void>;
  formatCountdown: (seconds: number) => string;
}

const Step3: React.FC<Step3Props> = ({
  form,
  phoneMessage,
  verificationMessage,
  isVerificationSent,
  isPhoneVerified,
  verificationCountdown,
  isSendingSMS,
  isVerifyingSMS,
  onSendVerification,
  onVerifyCode,
  formatCountdown,
}) => {
  const { errors } = form.formState;

  return (
    <S.FormSection>
      <S.InputWrapper>
        <Input
          label="이름"
          placeholder="홍길동"
          {...form.register('name', {
            onChange: (e) => {
              const koreanAndEnglish = e.target.value.replace(
                /[^ㄱ-힣a-zA-Z\s]/g,
                '',
              );
              form.setValue('name', koreanAndEnglish);
            },
          })}
        />
        {errors.name && (
          <FormMessage type="error" message={errors.name.message || ''} />
        )}
      </S.InputWrapper>
      <S.InputWrapper>
        <S.FormLabel>생년월일</S.FormLabel>
        <S.DateInputContainer>
          <Input
            placeholder="년도"
            {...form.register('birthYear', {
              onChange: (e) => {
                const numbersOnly = e.target.value
                  .replace(/[^0-9]/g, '')
                  .slice(0, 4);
                form.setValue('birthYear', numbersOnly);
              },
            })}
            maxLength={4}
          />
          <Input
            placeholder="월"
            {...form.register('birthMonth', {
              onChange: (e) => {
                const numbersOnly = e.target.value
                  .replace(/[^0-9]/g, '')
                  .slice(0, 2);
                form.setValue('birthMonth', numbersOnly);
              },
              onBlur: (e) => {
                const cleaned = removePaddingZero(e.target.value);
                form.setValue('birthMonth', cleaned);
              },
            })}
            maxLength={2}
          />
          <Input
            placeholder="일"
            {...form.register('birthDay', {
              onChange: (e) => {
                const numbersOnly = e.target.value
                  .replace(/[^0-9]/g, '')
                  .slice(0, 2);
                form.setValue('birthDay', numbersOnly);
              },
              onBlur: (e) => {
                const cleaned = removePaddingZero(e.target.value);
                form.setValue('birthDay', cleaned);
              },
            })}
            maxLength={2}
          />
        </S.DateInputContainer>
        {(errors.birthYear || errors.birthMonth || errors.birthDay) && (
          <FormMessage
            type="error"
            message={
              errors.birthYear?.message ||
              errors.birthMonth?.message ||
              errors.birthDay?.message ||
              ''
            }
          />
        )}
      </S.InputWrapper>
      <S.InputWrapper>
        <S.FormLabel>성별</S.FormLabel>
        <S.GenderToggleContainer>
          <ToggleButton
            label="남성"
            icon={<MaleIcon width={14} height={14} />}
            selected={form.watch('gender') === 'MALE'}
            onClick={() => form.setValue('gender', 'MALE')}
          />
          <ToggleButton
            label="여성"
            icon={<FemaleIcon width={14} height={14} />}
            selected={form.watch('gender') === 'FEMALE'}
            onClick={() => form.setValue('gender', 'FEMALE')}
          />
        </S.GenderToggleContainer>
        {errors.gender && (
          <FormMessage type="error" message={errors.gender.message || ''} />
        )}
      </S.InputWrapper>
      <S.InputWrapper>
        <S.FormLabel>휴대폰 번호</S.FormLabel>
        <S.FlexInputGroup>
          <S.FlexInputWrapper>
            <Input
              placeholder="하이픈(-) 제외하고 입력"
              {...form.register('phone', {
                onChange: (e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  form.setValue('phone', formatted);
                },
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
        {errors.phone ? (
          <FormMessage type="error" message={errors.phone.message || ''} />
        ) : (
          phoneMessage && (
            <FormMessage type={phoneMessage.type} message={phoneMessage.text} />
          )
        )}
      </S.InputWrapper>
      {isVerificationSent && (
        <S.InputWrapper>
          <S.FormLabel>
            인증번호
            {verificationCountdown > 0 && (
              <S.TimerText>
                {' '}
                ({formatCountdown(verificationCountdown)})
              </S.TimerText>
            )}
          </S.FormLabel>
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
            errors.verificationCode && (
              <FormMessage
                type="error"
                message={errors.verificationCode.message || ''}
              />
            )
          )}
        </S.InputWrapper>
      )}
    </S.FormSection>
  );
};

export default Step3;

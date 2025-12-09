import React from 'react';
import FemaleIcon from '@assets/icons/female.svg?react';
import MaleIcon from '@assets/icons/male.svg?react';
import Button from '@components/Button';
import Input from '@components/Input';
import ToggleButton from '@components/ToggleButton';
import { type Step3Form } from '@pages/SignUp/hooks/useSignUpForm';
import * as S from '@pages/SignUp/SignUp.styles';
import { type MessageState } from '@type/MessageState';
import { removePaddingZero, formatPhoneNumber } from '@utils/format';

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

  const renderMessage = (message: MessageState) => {
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

  return (
    <S.FormSection>
      <div>
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
          <S.InvalidMessage>{errors.name.message}</S.InvalidMessage>
        )}
      </div>

      <div>
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
          <S.InvalidMessage>
            {errors.birthYear?.message ||
              errors.birthMonth?.message ||
              errors.birthDay?.message}
          </S.InvalidMessage>
        )}
      </div>

      <div>
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
          <S.InvalidMessage>{errors.gender.message}</S.InvalidMessage>
        )}
      </div>

      <div>
        <S.FormLabel>휴대폰 번호</S.FormLabel>
        <S.PhoneInputContainer>
          <S.PhoneInput>
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
          </S.PhoneInput>
          <S.ButtonWrapper>
            <Button
              type="button"
              fullWidth
              onClick={onSendVerification}
              disabled={isSendingSMS || isPhoneVerified}
            >
              {isVerificationSent ? '재전송' : '인증번호 전송'}
            </Button>
          </S.ButtonWrapper>
        </S.PhoneInputContainer>
        {errors.phone
          ? renderMessage({ text: errors.phone.message || '', type: 'error' })
          : renderMessage(phoneMessage)}
      </div>

      {isVerificationSent && (
        <div>
          <S.FormLabel>
            인증번호
            {verificationCountdown > 0 && (
              <S.CountdownText>
                {' '}
                ({formatCountdown(verificationCountdown)})
              </S.CountdownText>
            )}
          </S.FormLabel>
          <S.PhoneInputContainer>
            <S.PhoneInput>
              <Input
                placeholder="인증번호 6자리를 입력해 주세요"
                {...form.register('verificationCode')}
                maxLength={6}
                disabled={isPhoneVerified}
              />
            </S.PhoneInput>
            {!isPhoneVerified && (
              <S.ButtonWrapper>
                <Button
                  type="button"
                  fullWidth
                  onClick={onVerifyCode}
                  disabled={isVerifyingSMS}
                >
                  인증 확인
                </Button>
              </S.ButtonWrapper>
            )}
          </S.PhoneInputContainer>
          {verificationMessage
            ? renderMessage(verificationMessage)
            : errors.verificationCode &&
              renderMessage({
                text: errors.verificationCode.message || '',
                type: 'error',
              })}
        </div>
      )}
    </S.FormSection>
  );
};

export default Step3;

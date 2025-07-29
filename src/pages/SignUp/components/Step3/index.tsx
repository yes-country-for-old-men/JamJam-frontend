import React from 'react';
import { Controller } from 'react-hook-form';
import { type Step3Form } from '@pages/SignUp/hooks/useSignUpForm';
import { type MessageState } from '@type/MessageState';
import * as S from '@pages/SignUp/SignUp.styles';
import Input from '@components/Input';
import Button from '@components/Button';
import ToggleButton from '@components/ToggleButton';
import MaleIcon from '@assets/icons/male.svg?react';
import FemaleIcon from '@assets/icons/female.svg?react';

interface Step3Props {
  form: Step3Form;
  phoneMessage: MessageState;
  verificationMessage: MessageState;
  isVerificationSent: boolean;
  isPhoneVerified: boolean;
  verificationCountdown: number;
  isSendingSMS: boolean;
  isVerifyingSMS: boolean;
  onNameChange: (value: string) => void;
  onBirthYearChange: (value: string) => void;
  onBirthMonthChange: (value: string) => void;
  onBirthDayChange: (value: string) => void;
  onBirthMonthBlur: () => void;
  onBirthDayBlur: () => void;
  onPhoneChange: (value: string) => void;
  onSendVerification: () => Promise<void>;
  onVerifyCode: () => Promise<void>;
  formatCountdown: (seconds: number) => string;
  renderMessage: (message: MessageState) => React.ReactNode;
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
  onNameChange,
  onBirthYearChange,
  onBirthMonthChange,
  onBirthDayChange,
  onBirthMonthBlur,
  onBirthDayBlur,
  onPhoneChange,
  onSendVerification,
  onVerifyCode,
  formatCountdown,
  renderMessage,
}) => {
  return (
    <S.FormSection>
      <div>
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <Input
              label="이름"
              placeholder="홍길동"
              value={field.value}
              onChange={(e) => onNameChange(e.target.value)}
            />
          )}
        />
        {form.formState.errors.name && (
          <S.InvalidMessage>
            {form.formState.errors.name.message}
          </S.InvalidMessage>
        )}
      </div>
      <div>
        <S.FormLabel>생년월일</S.FormLabel>
        <S.DateInputContainer>
          <Controller
            name="birthYear"
            control={form.control}
            render={({ field }) => (
              <Input
                placeholder="년도"
                value={field.value}
                onChange={(e) => onBirthYearChange(e.target.value)}
                maxLength={4}
              />
            )}
          />
          <Controller
            name="birthMonth"
            control={form.control}
            render={({ field }) => (
              <Input
                placeholder="월"
                value={field.value}
                onChange={(e) => onBirthMonthChange(e.target.value)}
                onBlur={onBirthMonthBlur}
                maxLength={2}
              />
            )}
          />
          <Controller
            name="birthDay"
            control={form.control}
            render={({ field }) => (
              <Input
                placeholder="일"
                value={field.value}
                onChange={(e) => onBirthDayChange(e.target.value)}
                onBlur={onBirthDayBlur}
                maxLength={2}
              />
            )}
          />
        </S.DateInputContainer>
        {(form.formState.errors.birthYear ||
          form.formState.errors.birthMonth ||
          form.formState.errors.birthDay) && (
          <S.InvalidMessage>
            {form.formState.errors.birthYear?.message ||
              form.formState.errors.birthMonth?.message ||
              form.formState.errors.birthDay?.message}
          </S.InvalidMessage>
        )}
      </div>
      <div>
        <S.FormLabel>성별</S.FormLabel>
        <S.GenderToggleContainer>
          <Controller
            name="gender"
            control={form.control}
            render={({ field }) => (
              <ToggleButton
                label="남성"
                icon={<MaleIcon width={14} height={14} />}
                selected={field.value === 'MALE'}
                onClick={() => field.onChange('MALE')}
              />
            )}
          />
          <Controller
            name="gender"
            control={form.control}
            render={({ field }) => (
              <ToggleButton
                label="여성"
                icon={<FemaleIcon width={14} height={14} />}
                selected={field.value === 'FEMALE'}
                onClick={() => field.onChange('FEMALE')}
              />
            )}
          />
        </S.GenderToggleContainer>
        {form.formState.errors.gender && (
          <S.InvalidMessage>
            {form.formState.errors.gender.message}
          </S.InvalidMessage>
        )}
      </div>
      <div>
        <S.FormLabel>휴대폰 번호</S.FormLabel>
        <S.PhoneInputContainer>
          <S.PhoneInput>
            <Input
              placeholder="하이픈(-) 제외하고 입력"
              value={form.watch('phone')}
              onChange={(e) => onPhoneChange(e.target.value)}
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
        {form.formState.errors.phone && (
          <S.InvalidMessage>
            {form.formState.errors.phone.message}
          </S.InvalidMessage>
        )}
        {renderMessage(phoneMessage)}
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
              <Controller
                name="verificationCode"
                control={form.control}
                render={({ field }) => (
                  <Input
                    placeholder="인증번호 6자리를 입력해 주세요"
                    value={field.value}
                    onChange={field.onChange}
                    maxLength={6}
                    disabled={isPhoneVerified}
                  />
                )}
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
          {renderMessage(verificationMessage)}
        </div>
      )}
    </S.FormSection>
  );
};

export default Step3;

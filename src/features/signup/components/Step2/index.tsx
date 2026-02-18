import React from 'react';
import { type Step2Form } from '@/features/signup/hooks/useSignUpForm';
import * as S from '@/features/signup/pages/SignUp.styles';
import Button from '@/shared/components/Button';
import FormMessage from '@/shared/components/FormMessage';
import Input from '@/shared/components/Input';

interface Step2Props {
  form: Step2Form;
  isNicknameAvailable: boolean | null;
  isIdAvailable: boolean | null;
  isCheckingNickname: boolean;
  isCheckingId: boolean;
  onNicknameCheck: () => void;
  onIdCheck: () => void;
  onNicknameChange: () => void;
  onIdChange: () => void;
}

const Step2: React.FC<Step2Props> = ({
  form,
  isNicknameAvailable,
  isIdAvailable,
  isCheckingNickname,
  isCheckingId,
  onNicknameCheck,
  onIdCheck,
  onNicknameChange,
  onIdChange,
}) => {
  const nicknameError = form.formState.errors.nickname;
  const idError = form.formState.errors.id;
  const passwordError = form.formState.errors.password;
  const confirmPasswordError = form.formState.errors.confirmPassword;

  const getNicknameMessage = () => {
    if (nicknameError) {
      return <FormMessage type="error" message={nicknameError.message || ''} />;
    }
    if (isNicknameAvailable === true) {
      return <FormMessage type="success" message="사용 가능한 닉네임입니다." />;
    }
    if (isNicknameAvailable === false) {
      return (
        <FormMessage type="error" message="이미 사용 중인 닉네임입니다." />
      );
    }
    return null;
  };

  const getIdMessage = () => {
    if (idError) {
      return <FormMessage type="error" message={idError.message || ''} />;
    }
    if (isIdAvailable === true) {
      return <FormMessage type="success" message="사용 가능한 아이디입니다." />;
    }
    if (isIdAvailable === false) {
      return (
        <FormMessage type="error" message="이미 사용 중인 아이디입니다." />
      );
    }
    return null;
  };

  return (
    <S.FormSection>
      <S.InputWrapper>
        <S.FormLabel>닉네임</S.FormLabel>
        <S.FlexInputGroup>
          <S.FlexInputWrapper>
            <Input
              placeholder="10자 이내의 한글, 영문, 숫자 조합"
              {...form.register('nickname', {
                onChange: onNicknameChange,
              })}
            />
          </S.FlexInputWrapper>
          <S.ActionButtonWrapper>
            <Button
              type="button"
              fullWidth
              onClick={onNicknameCheck}
              disabled={isCheckingNickname || !form.watch('nickname')}
            >
              중복 확인
            </Button>
          </S.ActionButtonWrapper>
        </S.FlexInputGroup>
        {getNicknameMessage()}
      </S.InputWrapper>
      <S.InputWrapper>
        <S.FormLabel>아이디</S.FormLabel>
        <S.FlexInputGroup>
          <S.FlexInputWrapper>
            <Input
              placeholder="소문자로 시작, 소문자와 숫자만 허용"
              {...form.register('id', {
                onChange: onIdChange,
              })}
            />
          </S.FlexInputWrapper>
          <S.ActionButtonWrapper>
            <Button
              type="button"
              fullWidth
              onClick={onIdCheck}
              disabled={isCheckingId || !form.watch('id')}
            >
              중복 확인
            </Button>
          </S.ActionButtonWrapper>
        </S.FlexInputGroup>
        {getIdMessage()}
      </S.InputWrapper>
      <S.InputWrapper>
        <Input
          label="비밀번호"
          type="password"
          showPasswordToggle
          placeholder="영문과 숫자를 포함한 최소 8자"
          {...form.register('password')}
        />
        {passwordError && (
          <FormMessage type="error" message={passwordError.message || ''} />
        )}
      </S.InputWrapper>
      <S.InputWrapper>
        <Input
          label="비밀번호 확인"
          type="password"
          showPasswordToggle
          placeholder="비밀번호를 한번 더 입력해 주세요"
          {...form.register('confirmPassword')}
        />
        {confirmPasswordError && (
          <FormMessage
            type="error"
            message={confirmPasswordError.message || ''}
          />
        )}
      </S.InputWrapper>
    </S.FormSection>
  );
};

export default Step2;

import React from 'react';
import { type Step2Form } from '@/features/signup/hooks/useSignUpForm';
import * as S from '@/features/signup/pages/SignUp.styles';
import Button from '@/shared/components/Button';
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
      return <S.InvalidMessage>{nicknameError.message}</S.InvalidMessage>;
    }
    if (isNicknameAvailable === true) {
      return <S.SuccessMessage>사용 가능한 닉네임입니다.</S.SuccessMessage>;
    }
    if (isNicknameAvailable === false) {
      return <S.InvalidMessage>이미 사용 중인 닉네임입니다.</S.InvalidMessage>;
    }
    return null;
  };

  const getIdMessage = () => {
    if (idError) {
      return <S.InvalidMessage>{idError.message}</S.InvalidMessage>;
    }
    if (isIdAvailable === true) {
      return <S.SuccessMessage>사용 가능한 아이디입니다.</S.SuccessMessage>;
    }
    if (isIdAvailable === false) {
      return <S.InvalidMessage>이미 사용 중인 아이디입니다.</S.InvalidMessage>;
    }
    return null;
  };

  return (
    <S.FormSection>
      <S.InputWrapper>
        <S.FormLabel>닉네임</S.FormLabel>
        <S.NicknameInputContainer>
          <S.NicknameInput>
            <Input
              placeholder="10자 이내의 한글, 영문, 숫자 조합"
              {...form.register('nickname', {
                onChange: onNicknameChange,
              })}
            />
          </S.NicknameInput>
          <S.ButtonWrapper>
            <Button
              type="button"
              fullWidth
              onClick={onNicknameCheck}
              disabled={isCheckingNickname || !form.watch('nickname')}
            >
              중복 확인
            </Button>
          </S.ButtonWrapper>
        </S.NicknameInputContainer>
        {getNicknameMessage()}
      </S.InputWrapper>

      <S.InputWrapper>
        <S.FormLabel>아이디</S.FormLabel>
        <S.IdInputContainer>
          <S.IdInput>
            <Input
              placeholder="소문자로 시작, 소문자와 숫자만 허용"
              {...form.register('id', {
                onChange: onIdChange,
              })}
            />
          </S.IdInput>
          <S.ButtonWrapper>
            <Button
              type="button"
              fullWidth
              onClick={onIdCheck}
              disabled={isCheckingId || !form.watch('id')}
            >
              중복 확인
            </Button>
          </S.ButtonWrapper>
        </S.IdInputContainer>
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
          <S.InvalidMessage>{passwordError.message}</S.InvalidMessage>
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
          <S.InvalidMessage>{confirmPasswordError.message}</S.InvalidMessage>
        )}
      </S.InputWrapper>
    </S.FormSection>
  );
};

export default Step2;

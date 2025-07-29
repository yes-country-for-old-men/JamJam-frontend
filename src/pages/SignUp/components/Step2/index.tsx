import React from 'react';
import { type Step2Form } from '@pages/SignUp/hooks/useSignUpForm';
import { type MessageState } from '@type/MessageState';
import * as S from '@pages/SignUp/SignUp.styles';
import Input from '@components/Input';
import Button from '@components/Button';

interface Step2Props {
  form: Step2Form;
  nicknameMessage: MessageState;
  idMessage: MessageState;
  passwordMessage: MessageState;
  confirmPasswordMessage: MessageState;
  isCheckingNickname: boolean;
  isCheckingId: boolean;
  onNicknameChange: (value: string, setValue: Step2Form['setValue']) => void;
  onIdChange: (value: string, setValue: Step2Form['setValue']) => void;
  onPasswordChange: (value: string, setValue: Step2Form['setValue']) => void;
  onConfirmPasswordChange: (
    value: string,
    setValue: Step2Form['setValue'],
    getValues: Step2Form['getValues'],
  ) => void;
  onNicknameCheck: (nickname: string) => void;
  onIdCheck: (id: string) => void;
  renderMessage: (message: MessageState) => React.ReactNode;
}

const Step2: React.FC<Step2Props> = ({
  form,
  nicknameMessage,
  idMessage,
  passwordMessage,
  confirmPasswordMessage,
  isCheckingNickname,
  isCheckingId,
  onNicknameChange,
  onIdChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onNicknameCheck,
  onIdCheck,
  renderMessage,
}) => {
  return (
    <S.FormSection>
      <S.InputWrapper>
        <S.FormLabel>닉네임</S.FormLabel>
        <S.NicknameInputContainer>
          <S.NicknameInput>
            <Input
              placeholder="10자 이내의 한글, 영문, 숫자 조합"
              value={form.watch('nickname')}
              onChange={(e) => onNicknameChange(e.target.value, form.setValue)}
            />
          </S.NicknameInput>
          <S.ButtonWrapper>
            <Button
              type="button"
              fullWidth
              onClick={() => onNicknameCheck(form.getValues('nickname'))}
              disabled={isCheckingNickname || !form.watch('nickname')}
            >
              중복 확인
            </Button>
          </S.ButtonWrapper>
        </S.NicknameInputContainer>
        {renderMessage(nicknameMessage)}
      </S.InputWrapper>
      <S.InputWrapper>
        <S.FormLabel>아이디</S.FormLabel>
        <S.IdInputContainer>
          <S.IdInput>
            <Input
              placeholder="소문자로 시작, 소문자와 숫자만 허용"
              value={form.watch('id')}
              onChange={(e) => onIdChange(e.target.value, form.setValue)}
            />
          </S.IdInput>
          <S.ButtonWrapper>
            <Button
              type="button"
              fullWidth
              onClick={() => onIdCheck(form.getValues('id'))}
              disabled={isCheckingId || !form.watch('id')}
            >
              중복 확인
            </Button>
          </S.ButtonWrapper>
        </S.IdInputContainer>
        {renderMessage(idMessage)}
      </S.InputWrapper>
      <S.InputWrapper>
        <Input
          label="비밀번호"
          type="password"
          showPasswordToggle
          placeholder="영문과 숫자를 포함한 최소 8자"
          value={form.watch('password')}
          onChange={(e) => onPasswordChange(e.target.value, form.setValue)}
        />
        {renderMessage(passwordMessage)}
      </S.InputWrapper>
      <S.InputWrapper>
        <Input
          label="비밀번호 확인"
          type="password"
          showPasswordToggle
          placeholder="비밀번호를 한번 더 입력해 주세요"
          value={form.watch('confirmPassword')}
          onChange={(e) =>
            onConfirmPasswordChange(
              e.target.value,
              form.setValue,
              form.getValues,
            )
          }
        />
        {renderMessage(confirmPasswordMessage)}
      </S.InputWrapper>
    </S.FormSection>
  );
};

export default Step2;

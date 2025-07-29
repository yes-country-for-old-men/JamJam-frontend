import React from 'react';
import { Controller } from 'react-hook-form';
import { type PasswordCheckForm } from '@pages/UserInfoEdit/hooks/useInfoEditForm';
import * as S from '@pages/UserInfoEdit/UserInfoEdit.styles';
import Input from '@components/Input';
import Button from '@components/Button';
import PasswordIcon from '@assets/icons/password.svg?react';

interface PasswordCheckProps {
  form: PasswordCheckForm;
  isLoading: boolean;
  onPasswordVerify: () => void;
}

const PasswordCheck: React.FC<PasswordCheckProps> = ({
  form,
  isLoading,
  onPasswordVerify,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onPasswordVerify();
    }
  };

  return (
    <S.Container>
      <S.PasswordCheckWrapper>
        <PasswordIcon />
        <S.PasswordCheckTitle>비밀번호 확인</S.PasswordCheckTitle>
        <S.FieldGroup>
          <S.PasswordCheckPrompt>
            회원 정보를 수정하려면 비밀번호를 입력해 주세요.
          </S.PasswordCheckPrompt>
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field }) => (
              <Input
                type="password"
                showPasswordToggle
                placeholder="현재 비밀번호를 입력하세요"
                value={field.value}
                onChange={field.onChange}
                onKeyDown={handleKeyDown}
              />
            )}
          />
          {form.formState.errors.currentPassword && (
            <S.InvalidMessage>
              {form.formState.errors.currentPassword.message}
            </S.InvalidMessage>
          )}
        </S.FieldGroup>
        <Button
          size="large"
          fullWidth
          variant="primary"
          onClick={onPasswordVerify}
          disabled={isLoading}
        >
          비밀번호 확인
        </Button>
      </S.PasswordCheckWrapper>
    </S.Container>
  );
};

export default PasswordCheck;

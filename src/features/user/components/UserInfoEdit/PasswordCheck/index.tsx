import React from 'react';
import { type PasswordCheckForm } from '@/features/user/hooks/useInfoEditForm';
import * as S from '@/features/user/pages/UserInfoEdit/UserInfoEdit.styles';
import PasswordIcon from '@/shared/assets/icons/password.svg?react';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/Input';

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
          <Input
            type="password"
            showPasswordToggle
            placeholder="현재 비밀번호를 입력하세요"
            {...form.register('currentPassword')}
            onKeyDown={handleKeyDown}
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

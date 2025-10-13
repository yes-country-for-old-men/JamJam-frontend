import React from 'react';
import { type InfoEditForm } from '@pages/UserInfoEdit/hooks/useInfoEditForm';
import * as S from '@pages/UserInfoEdit/UserInfoEdit.styles';
import Input from '@components/Input';

interface PasswordSectionProps {
  form: InfoEditForm;
}

const PasswordSection: React.FC<PasswordSectionProps> = ({ form }) => {
  const newPasswordError = form.formState.errors.newPassword;
  const confirmPasswordError = form.formState.errors.confirmPassword;

  return (
    <S.ContentSection>
      <S.SectionHeader>비밀번호 변경</S.SectionHeader>
      <S.FieldGroup>
        <S.FieldLabel>새 비밀번호</S.FieldLabel>
        <Input
          type="password"
          showPasswordToggle
          placeholder="영문과 숫자를 포함한 최소 8자"
          {...form.register('newPassword')}
        />
        {newPasswordError && (
          <S.InvalidMessage>{newPasswordError.message}</S.InvalidMessage>
        )}
      </S.FieldGroup>
      <S.FieldGroup>
        <S.FieldLabel>새 비밀번호 확인</S.FieldLabel>
        <Input
          type="password"
          showPasswordToggle
          placeholder="새 비밀번호를 한번 더 입력하세요"
          {...form.register('confirmPassword')}
        />
        {confirmPasswordError && (
          <S.InvalidMessage>{confirmPasswordError.message}</S.InvalidMessage>
        )}
      </S.FieldGroup>
    </S.ContentSection>
  );
};

export default PasswordSection;

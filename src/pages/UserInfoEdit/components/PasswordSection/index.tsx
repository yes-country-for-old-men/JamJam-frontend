import React from 'react';
import { Controller } from 'react-hook-form';
import { type InfoEditForm } from '@pages/UserInfoEdit/hooks/useInfoEditForm';
import * as S from '@pages/UserInfoEdit/UserInfoEdit.styles';
import Input from '@components/Input';

interface PasswordSectionProps {
  form: InfoEditForm;
}

const PasswordSection: React.FC<PasswordSectionProps> = ({ form }) => {
  return (
    <S.ContentSection>
      <S.SectionHeader>비밀번호 변경</S.SectionHeader>
      <S.FieldGroup>
        <S.FieldLabel>새 비밀번호</S.FieldLabel>
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field }) => (
            <Input
              type="password"
              showPasswordToggle
              placeholder="영문과 숫자를 포함한 최소 8자"
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
        {form.formState.errors.newPassword && (
          <S.InvalidMessage>
            {form.formState.errors.newPassword.message}
          </S.InvalidMessage>
        )}
      </S.FieldGroup>
      <S.FieldGroup>
        <S.FieldLabel>새 비밀번호 확인</S.FieldLabel>
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <Input
              type="password"
              showPasswordToggle
              placeholder="새 비밀번호를 한번 더 입력하세요"
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
        {form.formState.errors.confirmPassword && (
          <S.InvalidMessage>
            {form.formState.errors.confirmPassword.message}
          </S.InvalidMessage>
        )}
      </S.FieldGroup>
    </S.ContentSection>
  );
};

export default PasswordSection;

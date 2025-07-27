import React from 'react';
import { type UseFormReturn } from 'react-hook-form';
import * as S from '@pages/SignUp/SignUp.styles';
import RoleSelection from '@pages/SignUp/components/RoleSelection';

interface Step1Data {
  role: 'provider' | 'client';
}

interface Step1Props {
  form: UseFormReturn<Step1Data>;
  onRoleSelect: (role: 'provider' | 'client') => void;
}

const Step1: React.FC<Step1Props> = ({ form, onRoleSelect }) => {
  return (
    <div>
      <RoleSelection
        selectedRole={form.watch('role') || null}
        onRoleSelect={onRoleSelect}
      />
      {form.formState.errors.role && (
        <S.InvalidMessage>
          {form.formState.errors.role.message}
        </S.InvalidMessage>
      )}
    </div>
  );
};

export default Step1;

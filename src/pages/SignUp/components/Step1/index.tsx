import React from 'react';
import { type Step1Form } from '@pages/SignUp/hooks/useSignUpForm';
import * as S from '@pages/SignUp/SignUp.styles';
import RoleSelection from '@pages/SignUp/components/RoleSelection';

interface Step1Props {
  form: Step1Form;
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

import React from 'react';
import { type Step1Form } from '@pages/SignUp/hooks/useSignUpForm';
import * as S from '@pages/SignUp/SignUp.styles';
import RoleSelection from '@pages/SignUp/components/RoleSelection';

interface Step1Props {
  form: Step1Form;
}

const Step1: React.FC<Step1Props> = ({ form }) => {
  const handleRoleSelect = (role: 'provider' | 'client') => {
    form.setValue('role', role);
    form.clearErrors('role');
  };

  return (
    <div>
      <RoleSelection
        selectedRole={form.watch('role') || null}
        onRoleSelect={handleRoleSelect}
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

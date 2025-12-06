import { useState } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  step1Schema,
  step2Schema,
  createStep3Schema,
  type Step1Data,
  type Step2Data,
  type Step3Data,
} from '@pages/SignUp/schemas/signUpSchema';

export type Step1Form = UseFormReturn<Step1Data>;
export type Step2Form = UseFormReturn<Step2Data>;
export type Step3Form = UseFormReturn<Step3Data>;

const useSignUpForm = () => {
  const [step, setStep] = useState(1);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { role: undefined },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      id: '',
      password: '',
      confirmPassword: '',
    },
  });

  const selectedRole = step1Form.watch('role');
  const currentStep3Schema = createStep3Schema(selectedRole);

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(currentStep3Schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      gender: undefined,
      phone: '',
      verificationCode: '',
    },
  });

  return {
    step,
    setStep,
    step1Form,
    step2Form,
    step3Form,
    selectedRole,
  };
};

export default useSignUpForm;

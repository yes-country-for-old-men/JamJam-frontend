import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import * as S from '@pages/SignUp/SignUp.styles';
import { type MessageState } from '@type/MessageState';
import { clientSignUp, providerSignUp } from '@apis/signUp';
import useModal from '@hooks/useModal';
import useSignUpForm from '@pages/SignUp/hooks/useSignUpForm';
import useValidation from '@hooks/useValidation';
import usePhoneVerification from '@hooks/usePhoneVerification';
import { removePaddingZero, formatPhoneNumber } from '@utils/format';
import getErrorMessage from '@utils/getErrorMessage';
import Button from '@components/Button';
import StepIndicator from '@pages/SignUp/components/StepIndicator';
import Step1 from '@pages/SignUp/components/Step1';
import Step2 from '@pages/SignUp/components/Step2';
import Step3 from '@pages/SignUp/components/Step3';
import CompletionScreen from '@pages/SignUp/components/CompletionScreen';
import LogoIcon from '@assets/icons/logo-icon.svg?react';

const SignUp: React.FC = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedUserNickname, setCompletedUserNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { alert } = useModal();

  const { step, setStep, step1Form, step2Form, step3Form } = useSignUpForm();

  const {
    nicknameMessage,
    idMessage,
    passwordMessage,
    confirmPasswordMessage,
    nicknameCheckStatus,
    idCheckStatus,
    isNicknameChecked,
    isIdChecked,
    isCheckingNickname,
    isCheckingId,
    handleNicknameChange,
    handleNicknameCheck,
    handleIdChange,
    handleIdCheck,
    handlePasswordChange,
    handleConfirmPasswordChange,
    setNicknameMessage,
    setIdMessage,
    setPasswordMessage,
    setConfirmPasswordMessage,
  } = useValidation();

  const {
    isVerificationSent,
    isPhoneVerified,
    verificationCountdown,
    phoneMessage,
    verificationMessage,
    isSendingSMS,
    isVerifyingSMS,
    sendVerification,
    verifyCode,
    resetVerification,
    formatCountdown,
  } = usePhoneVerification();

  const handleLogoClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleRoleSelect = useCallback(
    (role: 'provider' | 'client') => {
      step1Form.setValue('role', role);
      step1Form.clearErrors('role');
    },
    [step1Form],
  );

  const handleNameChange = useCallback(
    (value: string) => {
      const koreanAndEnglish = value.replace(/[^ㄱ-힣a-zA-Z\s]/g, '');
      step3Form.setValue('name', koreanAndEnglish);
    },
    [step3Form],
  );

  const handleBirthYearChange = useCallback(
    (value: string) => {
      const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 4);
      step3Form.setValue('birthYear', numbersOnly);
    },
    [step3Form],
  );

  const handleBirthMonthChange = useCallback(
    (value: string) => {
      const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 2);
      step3Form.setValue('birthMonth', numbersOnly);
    },
    [step3Form],
  );

  const handleBirthDayChange = useCallback(
    (value: string) => {
      const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 2);
      step3Form.setValue('birthDay', numbersOnly);
    },
    [step3Form],
  );

  const handleBirthMonthBlur = useCallback(() => {
    const value = step3Form.getValues('birthMonth');
    if (value) {
      const cleaned = removePaddingZero(value);
      step3Form.setValue('birthMonth', cleaned);
    }
  }, [step3Form]);

  const handleBirthDayBlur = useCallback(() => {
    const value = step3Form.getValues('birthDay');
    if (value) {
      const cleaned = removePaddingZero(value);
      step3Form.setValue('birthDay', cleaned);
    }
  }, [step3Form]);

  const handlePhoneChange = useCallback(
    (value: string) => {
      const formatted = formatPhoneNumber(value);
      step3Form.setValue('phone', formatted);
      resetVerification();
    },
    [step3Form, resetVerification],
  );

  const handleSendVerification = useCallback(async () => {
    step3Form.clearErrors('phone');
    step3Form.clearErrors('verificationCode');

    const phone = step3Form.getValues('phone');
    if (!phone) {
      step3Form.setError('phone', { message: '휴대폰 번호를 입력해 주세요.' });
      return;
    }

    const phoneSchema = z.object({
      phone: z
        .string()
        .min(1, '휴대폰 번호를 입력해 주세요.')
        .regex(
          /^010-?[0-9]{4}-?[0-9]{4}$/,
          '올바른 휴대폰 번호 형식이 아닙니다.',
        ),
    });

    const validation = phoneSchema.safeParse({ phone });
    if (!validation.success) {
      step3Form.setError('phone', {
        message: '올바른 휴대폰 번호를 입력해 주세요.',
      });
      return;
    }

    await sendVerification(phone);
  }, [step3Form, sendVerification]);

  const handleVerifyCode = useCallback(async () => {
    const verificationCode = step3Form.getValues('verificationCode');
    const phone = step3Form.getValues('phone');

    if (!verificationCode) {
      return;
    }

    await verifyCode(phone, verificationCode);
  }, [step3Form, verifyCode]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step, setStep]);

  const handleNext = useCallback(() => {
    if (step === 1) {
      step1Form.handleSubmit(() => {
        setStep(2);
      })();
    } else if (step === 2) {
      step2Form.handleSubmit(
        () => {
          if (!isNicknameChecked || nicknameCheckStatus !== 'available') {
            setNicknameMessage({
              text: '닉네임 중복 확인이 필요합니다.',
              type: 'error',
            });
            return;
          }

          if (!isIdChecked || idCheckStatus !== 'available') {
            setIdMessage({
              text: '아이디 중복 확인이 필요합니다.',
              type: 'error',
            });
            return;
          }

          setStep(3);
        },
        (errors) => {
          if (errors.nickname) {
            setNicknameMessage({
              text: errors.nickname.message || '',
              type: 'error',
            });
          } else if (
            !isNicknameChecked ||
            nicknameCheckStatus !== 'available'
          ) {
            setNicknameMessage({
              text: '닉네임 중복 확인이 필요합니다.',
              type: 'error',
            });
          }

          if (errors.id) {
            setIdMessage({ text: errors.id.message || '', type: 'error' });
          } else if (!isIdChecked || idCheckStatus !== 'available') {
            setIdMessage({
              text: '아이디 중복 확인이 필요합니다.',
              type: 'error',
            });
          }

          if (errors.password) {
            setPasswordMessage({
              text: errors.password.message || '',
              type: 'error',
            });
          }

          if (errors.confirmPassword) {
            setConfirmPasswordMessage({
              text: errors.confirmPassword.message || '',
              type: 'error',
            });
          }
        },
      )();
    }
  }, [
    step,
    step1Form,
    step2Form,
    setStep,
    isNicknameChecked,
    nicknameCheckStatus,
    isIdChecked,
    idCheckStatus,
    setNicknameMessage,
    setIdMessage,
    setPasswordMessage,
    setConfirmPasswordMessage,
  ]);

  const handleSubmit = useCallback(() => {
    step3Form.handleSubmit(async (data) => {
      if (!isVerificationSent || !isPhoneVerified) {
        return;
      }

      setIsSubmitting(true);

      try {
        const step1Data = step1Form.getValues();
        const step2Data = step2Form.getValues();

        const birth = `${data.birthYear}-${data.birthMonth.padStart(2, '0')}-${data.birthDay.padStart(2, '0')}`;
        const gender = data.gender as 'MALE' | 'FEMALE';
        const phoneNumber = data.phone.replace(/-/g, '');

        const signUpData = {
          name: data.name,
          nickname: step2Data.nickname,
          loginId: step2Data.id,
          phoneNumber,
          password: step2Data.password,
          birth,
          gender,
        };

        if (step1Data.role === 'client') {
          await clientSignUp(signUpData);
        } else {
          await providerSignUp(signUpData);
        }

        setCompletedUserNickname(step2Data.nickname);
        setIsCompleted(true);
      } catch (error) {
        alert({
          title: '회원가입 실패',
          content: getErrorMessage(error),
        });
      } finally {
        setIsSubmitting(false);
      }
    })();
  }, [
    step3Form,
    isVerificationSent,
    isPhoneVerified,
    step1Form,
    step2Form,
    alert,
  ]);

  const getTitleText = () => {
    switch (step) {
      case 1:
        return '어떤 역할로 잼잼과\n함께 하시겠어요?';
      case 2:
        return '계정 정보를 입력하고,\n이어서 진행해 주세요.';
      case 3:
        return '잼잼 서비스 이용을 위해\n개인 정보를 입력해 주세요.';
      default:
        return '';
    }
  };

  const renderMessage = (message: MessageState) => {
    if (!message) return null;

    switch (message.type) {
      case 'success':
        return <S.SuccessMessage>{message.text}</S.SuccessMessage>;
      case 'error':
        return <S.InvalidMessage>{message.text}</S.InvalidMessage>;
      case 'info':
        return <S.InfoMessage>{message.text}</S.InfoMessage>;
      default:
        return null;
    }
  };

  const renderNavButtons = () => {
    if (step === 1) {
      return (
        <Button
          fullWidth
          size="large"
          disabled={!step1Form.watch('role')}
          onClick={handleNext}
        >
          다음
        </Button>
      );
    }

    const isLastStep = step === 3;

    return (
      <>
        <Button variant="outline" fullWidth size="large" onClick={handleBack}>
          이전
        </Button>
        <Button
          fullWidth
          size="large"
          disabled={isSubmitting}
          onClick={isLastStep ? handleSubmit : handleNext}
        >
          {isLastStep ? '완료' : '다음'}
        </Button>
      </>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1 form={step1Form} onRoleSelect={handleRoleSelect} />;

      case 2:
        return (
          <Step2
            form={step2Form}
            nicknameMessage={nicknameMessage}
            idMessage={idMessage}
            passwordMessage={passwordMessage}
            confirmPasswordMessage={confirmPasswordMessage}
            isCheckingNickname={isCheckingNickname}
            isCheckingId={isCheckingId}
            onNicknameChange={handleNicknameChange}
            onIdChange={handleIdChange}
            onPasswordChange={handlePasswordChange}
            onConfirmPasswordChange={handleConfirmPasswordChange}
            onNicknameCheck={handleNicknameCheck}
            onIdCheck={handleIdCheck}
            renderMessage={renderMessage}
          />
        );

      case 3:
        return (
          <Step3
            form={step3Form}
            phoneMessage={phoneMessage}
            verificationMessage={verificationMessage}
            isVerificationSent={isVerificationSent}
            isPhoneVerified={isPhoneVerified}
            verificationCountdown={verificationCountdown}
            isSendingSMS={isSendingSMS}
            isVerifyingSMS={isVerifyingSMS}
            onNameChange={handleNameChange}
            onBirthYearChange={handleBirthYearChange}
            onBirthMonthChange={handleBirthMonthChange}
            onBirthDayChange={handleBirthDayChange}
            onBirthMonthBlur={handleBirthMonthBlur}
            onBirthDayBlur={handleBirthDayBlur}
            onPhoneChange={handlePhoneChange}
            onSendVerification={handleSendVerification}
            onVerifyCode={handleVerifyCode}
            formatCountdown={formatCountdown}
            renderMessage={renderMessage}
          />
        );

      default:
        return null;
    }
  };

  if (isCompleted) {
    return (
      <S.Container>
        <S.FormContainer>
          <CompletionScreen userNickname={completedUserNickname} />
        </S.FormContainer>
        <S.NavigationButtonsWrapper>
          <Button fullWidth size="large" onClick={handleGoHome}>
            홈으로 이동
          </Button>
        </S.NavigationButtonsWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.FormContainer>
        <S.Header>
          <S.LogoButton onClick={handleLogoClick}>
            <LogoIcon height={44} />
          </S.LogoButton>
          <StepIndicator currentStep={step} totalSteps={3} />
          <S.Title>{getTitleText()}</S.Title>
        </S.Header>
        {renderStepContent()}
      </S.FormContainer>
      <S.NavigationButtonsWrapper>
        {renderNavButtons()}
      </S.NavigationButtonsWrapper>
    </S.Container>
  );
};

export default SignUp;

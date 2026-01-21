import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  clientSignUp,
  providerSignUp,
  checkNickname,
  checkLoginId,
} from '@/features/signup/api/signUpApi';
import CompletionScreen from '@/features/signup/components/CompletionScreen';
import Step1 from '@/features/signup/components/Step1';
import Step2 from '@/features/signup/components/Step2';
import Step3 from '@/features/signup/components/Step3';
import StepIndicator from '@/features/signup/components/StepIndicator';
import { useSignUpForm } from '@/features/signup/hooks/useSignUpForm';
import * as S from '@/features/signup/pages/SignUp.styles';
import LogoIcon from '@/shared/assets/icons/logo-icon.svg?react';
import Button from '@/shared/components/Button';
import { useModal } from '@/shared/hooks/useModal';
import { usePhoneVerification } from '@/shared/hooks/usePhoneVerification';
import { getErrorMessage } from '@/shared/utils';

const SignUp: React.FC = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedUserNickname, setCompletedUserNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);

  const navigate = useNavigate();
  const { alert } = useModal();

  const { step, setStep, step1Form, step2Form, step3Form } = useSignUpForm();

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
    formatCountdown,
  } = usePhoneVerification();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleNicknameChange = () => {
    setIsNicknameAvailable(null);
    step2Form.clearErrors('nickname');
  };

  const handleIdChange = () => {
    setIsIdAvailable(null);
    step2Form.clearErrors('id');
  };

  const handleNicknameCheck = async () => {
    const nickname = step2Form.getValues('nickname');
    const validation = await step2Form.trigger('nickname');

    if (!validation) {
      return;
    }

    setIsCheckingNickname(true);
    try {
      const response = await checkNickname(nickname);
      const isAvailable = response.data.content.available;
      setIsNicknameAvailable(isAvailable);

      if (!isAvailable) {
        step2Form.setError('nickname', {
          message: '이미 사용 중인 닉네임입니다.',
        });
      } else {
        step2Form.clearErrors('nickname');
      }
    } catch (error) {
      await alert({
        title: '중복 확인 실패',
        content: getErrorMessage(error),
      });
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const handleIdCheck = async () => {
    const id = step2Form.getValues('id');
    const validation = await step2Form.trigger('id');

    if (!validation) {
      return;
    }

    setIsCheckingId(true);
    try {
      const response = await checkLoginId(id);
      const isAvailable = response.data.content.available;
      setIsIdAvailable(isAvailable);

      if (!isAvailable) {
        step2Form.setError('id', {
          message: '이미 사용 중인 아이디입니다.',
        });
      } else {
        step2Form.clearErrors('id');
      }
    } catch (error) {
      await alert({
        title: '중복 확인 실패',
        content: getErrorMessage(error),
      });
    } finally {
      setIsCheckingId(false);
    }
  };

  const handleSendVerification = async () => {
    step3Form.clearErrors('phone');
    step3Form.clearErrors('verificationCode');

    const phone = step3Form.getValues('phone');
    if (!phone) {
      step3Form.setError('phone', { message: '휴대폰 번호를 입력해 주세요.' });
      return;
    }

    const isValid = await step3Form.trigger('phone');
    if (!isValid) {
      return;
    }

    await sendVerification(phone);
  };

  const handleVerifyCode = async () => {
    const verificationCode = step3Form.getValues('verificationCode');
    const phone = step3Form.getValues('phone');

    if (!verificationCode) {
      return;
    }

    await verifyCode(phone, verificationCode);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      step1Form.handleSubmit(() => {
        setStep(2);
      })();
    } else if (step === 2) {
      step2Form.handleSubmit(() => {
        if (isNicknameAvailable !== true) {
          step2Form.setError('nickname', {
            message: '닉네임 중복 확인이 필요합니다.',
          });
          return;
        }

        if (isIdAvailable !== true) {
          step2Form.setError('id', {
            message: '아이디 중복 확인이 필요합니다.',
          });
          return;
        }

        setStep(3);
      })();
    }
  };

  const handleSubmit = () => {
    step3Form.handleSubmit(async (data) => {
      if (!isVerificationSent) {
        step3Form.setError('phone', {
          message: '휴대폰 인증번호를 전송해 주세요.',
        });
        return;
      }

      if (!isPhoneVerified) {
        step3Form.setError('verificationCode', {
          message: '인증번호를 입력하고 인증 확인을 완료해 주세요.',
        });
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
        await alert({
          title: '회원가입 실패',
          content: getErrorMessage(error),
        });
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

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
        return <Step1 form={step1Form} />;

      case 2:
        return (
          <Step2
            form={step2Form}
            isNicknameAvailable={isNicknameAvailable}
            isIdAvailable={isIdAvailable}
            isCheckingNickname={isCheckingNickname}
            isCheckingId={isCheckingId}
            onNicknameCheck={handleNicknameCheck}
            onIdCheck={handleIdCheck}
            onNicknameChange={handleNicknameChange}
            onIdChange={handleIdChange}
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
            onSendVerification={handleSendVerification}
            onVerifyCode={handleVerifyCode}
            formatCountdown={formatCountdown}
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

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { z } from 'zod';
import styled from '@emotion/styled';
import { type MessageState } from '@type/MessageState';
import { clientSignUp, providerSignUp } from '@apis/signUp';
import useModal from '@hooks/useModal';
import useSignUpForm from '@hooks/useSignUpForm';
import useValidation from '@hooks/useValidation';
import usePhoneVerification from '@hooks/usePhoneVerification';
import { removePaddingZero, formatPhoneNumber } from '@utils/format';
import getErrorMessage from '@utils/getErrorMessage';
import Button from '@components/Button';
import Input from '@components/Input';
import RoleSelection from '@pages/SignUp/components/RoleSelection';
import ToggleButton from '@components/ToggleButton';
import LogoIcon from '@assets/icons/logo-icon.svg?react';
import MaleIcon from '@assets/icons/male.svg?react';
import FemaleIcon from '@assets/icons/female.svg?react';
import CompletionIcon from '@assets/icons/completion.svg?react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100dvh;
  padding: 72px 16px 24px 16px;
`;

const FormContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 90dvw;
  max-width: 420px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 36px;
  margin-bottom: 36px;
`;

const LogoButton = styled.button``;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
`;

const StepDot = styled.div<{ active: boolean }>`
  width: 40px;
  height: 4px;
  background-color: ${(props) =>
    props.active
      ? props.theme.COLORS.JAMJAM_PRIMARY[1]
      : props.theme.COLORS.GRAY[3]};
  border-radius: 2px;
  margin: 0 4px;
  transition: all 0.3s ease;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.4;
  white-space: pre-line;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
`;

const InvalidMessage = styled.div`
  color: ${(props) => props.theme.COLORS.RED};
  font-size: 12px;
  margin: 4px 0 0 4px;
`;

const SuccessMessage = styled.div`
  color: ${(props) => props.theme.COLORS.GREEN};
  font-size: 12px;
  margin: 4px 0 0 4px;
`;

const InfoMessage = styled.div`
  color: ${(props) => props.theme.COLORS.GRAY[6]};
  font-size: 12px;
  margin: 4px 0 0 4px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const DateInputContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
`;

const IdInputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const IdInput = styled.div`
  flex: 1;
`;

const NicknameInputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const NicknameInput = styled.div`
  flex: 1;
`;

const PhoneInputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const PhoneInput = styled.div`
  flex: 1;
`;

const ButtonWrapper = styled.div`
  width: 100px;
`;

const NavigationButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 420px;
  gap: 12px;
  padding-top: 24px;
`;

const GenderToggleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const CountdownText = styled.span`
  font-weight: 600;
`;

const CompletionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CompletionIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const CompletionTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const CompletionPrompt = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  margin: 0;
  line-height: 1.6;
  white-space: pre-line;
`;

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
        const gender: 'MALE' | 'FEMALE' =
          data.gender === '남성' ? 'MALE' : 'FEMALE';
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
        return <SuccessMessage>{message.text}</SuccessMessage>;
      case 'error':
        return <InvalidMessage>{message.text}</InvalidMessage>;
      case 'info':
        return <InfoMessage>{message.text}</InfoMessage>;
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
        return (
          <div>
            <RoleSelection
              selectedRole={step1Form.watch('role') || null}
              onRoleSelect={handleRoleSelect}
            />
            {step1Form.formState.errors.role && (
              <InvalidMessage>
                {step1Form.formState.errors.role.message}
              </InvalidMessage>
            )}
          </div>
        );

      case 2:
        return (
          <FormSection>
            <InputWrapper>
              <FormLabel>닉네임</FormLabel>
              <NicknameInputContainer>
                <NicknameInput>
                  <Input
                    placeholder="10자 이내의 한글, 영문, 숫자 조합"
                    value={step2Form.watch('nickname')}
                    onChange={(e) =>
                      handleNicknameChange(e.target.value, step2Form.setValue)
                    }
                  />
                </NicknameInput>
                <ButtonWrapper>
                  <Button
                    type="button"
                    fullWidth
                    onClick={() =>
                      handleNicknameCheck(step2Form.getValues('nickname'))
                    }
                    disabled={
                      isCheckingNickname || !step2Form.watch('nickname')
                    }
                  >
                    중복 확인
                  </Button>
                </ButtonWrapper>
              </NicknameInputContainer>
              {renderMessage(nicknameMessage)}
            </InputWrapper>

            <InputWrapper>
              <FormLabel>아이디</FormLabel>
              <IdInputContainer>
                <IdInput>
                  <Input
                    placeholder="소문자로 시작, 소문자와 숫자만 허용"
                    value={step2Form.watch('id')}
                    onChange={(e) =>
                      handleIdChange(e.target.value, step2Form.setValue)
                    }
                  />
                </IdInput>
                <ButtonWrapper>
                  <Button
                    type="button"
                    fullWidth
                    onClick={() => handleIdCheck(step2Form.getValues('id'))}
                    disabled={isCheckingId || !step2Form.watch('id')}
                  >
                    중복 확인
                  </Button>
                </ButtonWrapper>
              </IdInputContainer>
              {renderMessage(idMessage)}
            </InputWrapper>

            <InputWrapper>
              <Input
                label="비밀번호"
                type="password"
                showPasswordToggle
                placeholder="영문과 숫자를 포함한 최소 8자"
                value={step2Form.watch('password')}
                onChange={(e) =>
                  handlePasswordChange(e.target.value, step2Form.setValue)
                }
              />
              {renderMessage(passwordMessage)}
            </InputWrapper>

            <InputWrapper>
              <Input
                label="비밀번호 확인"
                type="password"
                showPasswordToggle
                placeholder="비밀번호를 한번 더 입력해 주세요"
                value={step2Form.watch('confirmPassword')}
                onChange={(e) =>
                  handleConfirmPasswordChange(
                    e.target.value,
                    step2Form.setValue,
                    step2Form.getValues,
                  )
                }
              />
              {renderMessage(confirmPasswordMessage)}
            </InputWrapper>
          </FormSection>
        );

      case 3:
        return (
          <FormSection>
            <div>
              <Controller
                name="name"
                control={step3Form.control}
                render={({ field }) => (
                  <Input
                    label="이름"
                    placeholder="홍길동"
                    value={field.value}
                    onChange={(e) => handleNameChange(e.target.value)}
                  />
                )}
              />
              {step3Form.formState.errors.name && (
                <InvalidMessage>
                  {step3Form.formState.errors.name.message}
                </InvalidMessage>
              )}
            </div>

            <div>
              <FormLabel>생년월일</FormLabel>
              <DateInputContainer>
                <Controller
                  name="birthYear"
                  control={step3Form.control}
                  render={({ field }) => (
                    <Input
                      placeholder="년도"
                      value={field.value}
                      onChange={(e) => handleBirthYearChange(e.target.value)}
                      maxLength={4}
                    />
                  )}
                />
                <Controller
                  name="birthMonth"
                  control={step3Form.control}
                  render={({ field }) => (
                    <Input
                      placeholder="월"
                      value={field.value}
                      onChange={(e) => handleBirthMonthChange(e.target.value)}
                      onBlur={handleBirthMonthBlur}
                      maxLength={2}
                    />
                  )}
                />
                <Controller
                  name="birthDay"
                  control={step3Form.control}
                  render={({ field }) => (
                    <Input
                      placeholder="일"
                      value={field.value}
                      onChange={(e) => handleBirthDayChange(e.target.value)}
                      onBlur={handleBirthDayBlur}
                      maxLength={2}
                    />
                  )}
                />
              </DateInputContainer>
              {(step3Form.formState.errors.birthYear ||
                step3Form.formState.errors.birthMonth ||
                step3Form.formState.errors.birthDay) && (
                <InvalidMessage>
                  {step3Form.formState.errors.birthYear?.message ||
                    step3Form.formState.errors.birthMonth?.message ||
                    step3Form.formState.errors.birthDay?.message}
                </InvalidMessage>
              )}
            </div>

            <div>
              <FormLabel>성별</FormLabel>
              <GenderToggleContainer>
                <Controller
                  name="gender"
                  control={step3Form.control}
                  render={({ field }) => (
                    <ToggleButton
                      label="남성"
                      icon={<MaleIcon width={14} height={14} />}
                      selected={field.value === '남성'}
                      onClick={() => field.onChange('남성')}
                    />
                  )}
                />
                <Controller
                  name="gender"
                  control={step3Form.control}
                  render={({ field }) => (
                    <ToggleButton
                      label="여성"
                      icon={<FemaleIcon width={14} height={14} />}
                      selected={field.value === '여성'}
                      onClick={() => field.onChange('여성')}
                    />
                  )}
                />
              </GenderToggleContainer>
              {step3Form.formState.errors.gender && (
                <InvalidMessage>
                  {step3Form.formState.errors.gender.message}
                </InvalidMessage>
              )}
            </div>

            <div>
              <FormLabel>휴대폰 번호</FormLabel>
              <PhoneInputContainer>
                <PhoneInput>
                  <Input
                    placeholder="하이픈(-) 제외하고 입력"
                    value={step3Form.watch('phone')}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    maxLength={13}
                  />
                </PhoneInput>
                <ButtonWrapper>
                  <Button
                    type="button"
                    fullWidth
                    onClick={handleSendVerification}
                    disabled={isSendingSMS || isPhoneVerified}
                  >
                    {isVerificationSent ? '재전송' : '인증번호 전송'}
                  </Button>
                </ButtonWrapper>
              </PhoneInputContainer>
              {step3Form.formState.errors.phone && (
                <InvalidMessage>
                  {step3Form.formState.errors.phone.message}
                </InvalidMessage>
              )}
              {renderMessage(phoneMessage)}
            </div>

            {isVerificationSent && (
              <div>
                <FormLabel>
                  인증번호
                  {verificationCountdown > 0 && (
                    <CountdownText>
                      {' '}
                      ({formatCountdown(verificationCountdown)})
                    </CountdownText>
                  )}
                </FormLabel>
                <PhoneInputContainer>
                  <PhoneInput>
                    <Controller
                      name="verificationCode"
                      control={step3Form.control}
                      render={({ field }) => (
                        <Input
                          placeholder="인증번호 6자리를 입력해 주세요"
                          value={field.value}
                          onChange={field.onChange}
                          maxLength={6}
                          disabled={isPhoneVerified}
                        />
                      )}
                    />
                  </PhoneInput>
                  {!isPhoneVerified && (
                    <ButtonWrapper>
                      <Button
                        type="button"
                        fullWidth
                        onClick={handleVerifyCode}
                        disabled={isVerifyingSMS}
                      >
                        인증 확인
                      </Button>
                    </ButtonWrapper>
                  )}
                </PhoneInputContainer>
                {renderMessage(verificationMessage)}
              </div>
            )}
          </FormSection>
        );

      default:
        return null;
    }
  };

  const renderCompletionScreen = () => {
    return (
      <CompletionContainer>
        <CompletionIconWrapper>
          <CompletionIcon />
        </CompletionIconWrapper>
        <div>
          <CompletionTitle>회원가입이 완료되었어요!</CompletionTitle>
          <CompletionPrompt>
            {completedUserNickname} 님의 회원가입을 환영합니다.
            {'\n'}
            이제 잼잼의 다양한 서비스를 이용하실 수 있습니다.
          </CompletionPrompt>
        </div>
      </CompletionContainer>
    );
  };

  if (isCompleted) {
    return (
      <Container>
        <FormContainer>{renderCompletionScreen()}</FormContainer>
        <NavigationButtonsWrapper>
          <Button fullWidth size="large" onClick={handleGoHome}>
            홈으로 이동
          </Button>
        </NavigationButtonsWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <FormContainer>
        <Header>
          <LogoButton onClick={handleLogoClick}>
            <LogoIcon height={44} />
          </LogoButton>
          <StepIndicator>
            <StepDot active={step >= 1} />
            <StepDot active={step >= 2} />
            <StepDot active={step >= 3} />
          </StepIndicator>
          <Title>{getTitleText()}</Title>
        </Header>
        {renderStepContent()}
      </FormContainer>
      <NavigationButtonsWrapper>{renderNavButtons()}</NavigationButtonsWrapper>
    </Container>
  );
};

export default SignUp;

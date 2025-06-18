import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styled from '@emotion/styled';
import Button from '@components/Button';
import Input from '@components/Input';
import {
  validateNickname,
  validateId,
  validatePassword,
} from '@utils/validation';
import { removePaddingZero, formatPhoneNumber } from '@utils/format';
import {
  step1Schema,
  step2Schema,
  createStep3Schema,
  type Step1Data,
  type Step2Data,
  type Step3Data,
} from '@pages/SignUp/schemas';
import RoleSelection from '@pages/SignUp/components/RoleSelection';
import ToggleButton from '@components/ToggleButton';
import LogoIcon from '@assets/icons/logo-icon.svg?react';
import MaleIcon from '@assets/icons/male.svg?react';
import FemaleIcon from '@assets/icons/female.svg?react';
import { useNavigate } from 'react-router-dom';

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

const ButtonsWrapper = styled.div`
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

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
  const [phoneMessage, setPhoneMessage] = useState('');
  const [phoneMessageType, setPhoneMessageType] = useState<
    'success' | 'error' | 'info'
  >('info');
  const [nicknameCheckStatus, setNicknameCheckStatus] = useState<
    'idle' | 'checking' | 'available' | 'duplicate'
  >('idle');
  const [idCheckStatus, setIdCheckStatus] = useState<
    'idle' | 'checking' | 'available' | 'duplicate'
  >('idle');
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);

  const navigate = useNavigate();

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      role: undefined,
    },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
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
    defaultValues: {
      name: '',
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      gender: '',
      phone: '',
      verificationCode: '',
    },
  });

  useEffect(() => {
    if (selectedRole) {
      step3Form.trigger();
    }
  }, [selectedRole, step3Form]);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleRoleSelect = (role: 'provider' | 'client') => {
    step1Form.setValue('role', role);
    step1Form.clearErrors('role');
  };

  const handleConfirmPasswordChange = (value: string) => {
    step2Form.setValue('confirmPassword', value);

    if (value.length === 0) {
      setConfirmPasswordMessage('');
      return;
    }

    const password = step2Form.getValues('password');

    if (password.length === 0) {
      setConfirmPasswordMessage('먼저 비밀번호를 입력해 주세요.');
      return;
    }

    if (password === value) {
      setConfirmPasswordMessage('비밀번호가 일치합니다.');
    } else {
      setConfirmPasswordMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleNicknameChange = (value: string) => {
    step2Form.setValue('nickname', value);

    setIsNicknameChecked(false);
    setNicknameCheckStatus('idle');

    const validationError = validateNickname(value);

    if (validationError) {
      setNicknameMessage(validationError);
    } else if (value.length > 0) {
      setNicknameMessage('중복 확인이 필요합니다.');
    } else {
      setNicknameMessage('');
    }
  };

  const handleNicknameCheck = async () => {
    const nickname = step2Form.getValues('nickname');
    const validationError = validateNickname(nickname);

    if (validationError) {
      setNicknameMessage(validationError);
      return;
    }

    setNicknameCheckStatus('checking');

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 200);
      });

      setNicknameMessage('사용 가능한 닉네임입니다.');
      setNicknameCheckStatus('available');
      setIsNicknameChecked(true);
    } catch {
      setNicknameMessage('중복 확인 중 오류가 발생했습니다.');
      setNicknameCheckStatus('idle');
      setIsNicknameChecked(false);
    }
  };

  const handleIdChange = (value: string) => {
    step2Form.setValue('id', value);

    setIsIdChecked(false);
    setIdCheckStatus('idle');

    const validationError = validateId(value);

    if (validationError) {
      setIdMessage(validationError);
    } else if (value.length > 0) {
      setIdMessage('중복 확인이 필요합니다.');
    } else {
      setIdMessage('');
    }
  };

  const handleIdCheck = async () => {
    const id = step2Form.getValues('id');
    const validationError = validateId(id);

    if (validationError) {
      setIdMessage(validationError);
      return;
    }

    setIdCheckStatus('checking');

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 200);
      });

      setIdMessage('사용 가능한 아이디입니다.');
      setIdCheckStatus('available');
      setIsIdChecked(true);
    } catch {
      setIdMessage('중복 확인 중 오류가 발생했습니다.');
      setIdCheckStatus('idle');
      setIsIdChecked(false);
    }
  };

  const handlePasswordChange = (value: string) => {
    step2Form.setValue('password', value);

    const validationError = validatePassword(value);

    if (validationError) {
      setPasswordMessage(validationError);
    } else if (value.length > 0) {
      setPasswordMessage('사용 가능한 비밀번호입니다.');
    } else {
      setPasswordMessage('');
    }

    const confirmPassword = step2Form.getValues('confirmPassword');
    if (confirmPassword) {
      handleConfirmPasswordChange(confirmPassword);
    }
  };

  const handleNameChange = (value: string) => {
    const koreanAndEnglish = value.replace(/[^ㄱ-힣a-zA-Z\s]/g, '');
    step3Form.setValue('name', koreanAndEnglish);
  };

  const handleBirthYearChange = (value: string) => {
    const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 4);
    step3Form.setValue('birthYear', numbersOnly);
  };

  const handleBirthMonthChange = (value: string) => {
    const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 2);
    step3Form.setValue('birthMonth', numbersOnly);
  };

  const handleBirthDayChange = (value: string) => {
    const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 2);
    step3Form.setValue('birthDay', numbersOnly);
  };

  const handleBirthMonthBlur = () => {
    const value = step3Form.getValues('birthMonth');
    if (value) {
      const cleaned = removePaddingZero(value);
      step3Form.setValue('birthMonth', cleaned);
    }
  };

  const handleBirthDayBlur = () => {
    const value = step3Form.getValues('birthDay');
    if (value) {
      const cleaned = removePaddingZero(value);
      step3Form.setValue('birthDay', cleaned);
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    step3Form.setValue('phone', formatted);

    setPhoneMessage('');
    setIsVerificationSent(false);
  };

  const handleSendVerification = () => {
    step3Form.clearErrors('phone');
    step3Form.clearErrors('verificationCode');
    setPhoneMessage('');

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

    setPhoneMessage('인증번호가 전송되었습니다.');
    setPhoneMessageType('success');
    setIsVerificationSent(true);
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
      step2Form.handleSubmit(
        () => {
          if (!isNicknameChecked || nicknameCheckStatus !== 'available') {
            setNicknameMessage('닉네임 중복 확인이 필요합니다.');
            return;
          }

          if (!isIdChecked || idCheckStatus !== 'available') {
            setIdMessage('아이디 중복 확인이 필요합니다.');
            return;
          }

          setStep(3);
        },
        (errors) => {
          if (errors.nickname) {
            setNicknameMessage(errors.nickname.message || '');
          } else if (
            !isNicknameChecked ||
            nicknameCheckStatus !== 'available'
          ) {
            setNicknameMessage('닉네임 중복 확인이 필요합니다.');
          }

          if (errors.id) {
            setIdMessage(errors.id.message || '');
          } else if (!isIdChecked || idCheckStatus !== 'available') {
            setIdMessage('아이디 중복 확인이 필요합니다.');
          }

          if (errors.password) {
            setPasswordMessage(errors.password.message || '');
          }

          if (errors.confirmPassword) {
            setConfirmPasswordMessage(errors.confirmPassword.message || '');
          }
        },
      )();
    }
  };

  const handleSubmit = () => {
    step3Form.handleSubmit((data) => {
      if (!isVerificationSent) {
        step3Form.setError('phone', {
          message: '휴대폰 번호를 인증해 주세요.',
        });
        return;
      }

      if (!data.verificationCode) {
        step3Form.setError('verificationCode', {
          message: '인증번호를 입력해 주세요.',
        });
        return;
      }

      if (!/^\d{6}$/.test(data.verificationCode)) {
        step3Form.setError('verificationCode', {
          message: '인증번호는 6자리 숫자입니다.',
        });
        return;
      }

      const allData = {
        selectedRole: step1Form.getValues('role'),
        ...step2Form.getValues(),
        ...data,
      };

      // eslint-disable-next-line
      console.log(JSON.stringify(allData));
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

  const getMessageComponent = (
    message: string,
    type: 'success' | 'error' | 'info',
  ) => {
    if (!message) return null;

    if (type === 'success') {
      return <SuccessMessage>{message}</SuccessMessage>;
    }
    if (type === 'error') {
      return <InvalidMessage>{message}</InvalidMessage>;
    }
    return <InfoMessage>{message}</InfoMessage>;
  };

  const renderButtons = () => {
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
                    onChange={(e) => handleNicknameChange(e.target.value)}
                  />
                </NicknameInput>
                <Button
                  type="button"
                  onClick={handleNicknameCheck}
                  disabled={
                    nicknameCheckStatus === 'checking' ||
                    !step2Form.watch('nickname') ||
                    !!validateNickname(step2Form.watch('nickname'))
                  }
                >
                  중복 확인
                </Button>
              </NicknameInputContainer>
              {nicknameCheckStatus === 'checking' &&
                getMessageComponent(nicknameMessage, 'info')}
              {nicknameCheckStatus === 'available' &&
                getMessageComponent(nicknameMessage, 'success')}
              {nicknameCheckStatus === 'duplicate' &&
                getMessageComponent(nicknameMessage, 'error')}
              {nicknameCheckStatus === 'idle' &&
                nicknameMessage &&
                getMessageComponent(
                  nicknameMessage,
                  nicknameMessage === '중복 확인이 필요합니다.'
                    ? 'info'
                    : 'error',
                )}
            </InputWrapper>

            <InputWrapper>
              <FormLabel>아이디</FormLabel>
              <IdInputContainer>
                <IdInput>
                  <Input
                    placeholder="소문자로 시작, 소문자와 숫자만 허용"
                    value={step2Form.watch('id')}
                    onChange={(e) => handleIdChange(e.target.value)}
                  />
                </IdInput>
                <Button
                  type="button"
                  onClick={handleIdCheck}
                  disabled={
                    idCheckStatus === 'checking' ||
                    !step2Form.watch('id') ||
                    !!validateId(step2Form.watch('id'))
                  }
                >
                  중복 확인
                </Button>
              </IdInputContainer>
              {idCheckStatus === 'checking' &&
                getMessageComponent(idMessage, 'info')}
              {idCheckStatus === 'available' &&
                getMessageComponent(idMessage, 'success')}
              {idCheckStatus === 'duplicate' &&
                getMessageComponent(idMessage, 'error')}
              {idCheckStatus === 'idle' &&
                idMessage &&
                getMessageComponent(
                  idMessage,
                  idMessage === '중복 확인이 필요합니다.' ? 'info' : 'error',
                )}
            </InputWrapper>

            <InputWrapper>
              <Input
                label="비밀번호"
                type="password"
                showPasswordToggle
                placeholder="영문과 숫자를 포함한 최소 8자"
                value={step2Form.watch('password')}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              {passwordMessage === '사용 가능한 비밀번호입니다.' &&
                getMessageComponent(passwordMessage, 'success')}
              {passwordMessage !== '사용 가능한 비밀번호입니다.' &&
                passwordMessage &&
                getMessageComponent(passwordMessage, 'error')}
            </InputWrapper>

            <InputWrapper>
              <Input
                label="비밀번호 확인"
                type="password"
                showPasswordToggle
                placeholder="비밀번호를 한번 더 입력해 주세요"
                value={step2Form.watch('confirmPassword')}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              />
              {confirmPasswordMessage === '비밀번호가 일치합니다.' &&
                getMessageComponent(confirmPasswordMessage, 'success')}
              {confirmPasswordMessage !== '비밀번호가 일치합니다.' &&
                confirmPasswordMessage &&
                getMessageComponent(confirmPasswordMessage, 'error')}
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
                <Button type="button" onClick={handleSendVerification}>
                  {isVerificationSent ? '재전송' : '인증번호 받기'}
                </Button>
              </PhoneInputContainer>
              {step3Form.formState.errors.phone && (
                <InvalidMessage>
                  {step3Form.formState.errors.phone.message}
                </InvalidMessage>
              )}
              {phoneMessage &&
                getMessageComponent(phoneMessage, phoneMessageType)}
            </div>

            {isVerificationSent && (
              <div>
                <Controller
                  name="verificationCode"
                  control={step3Form.control}
                  render={({ field }) => (
                    <Input
                      label="인증번호"
                      placeholder="인증번호 6자리를 입력해 주세요"
                      value={field.value}
                      onChange={field.onChange}
                      maxLength={6}
                    />
                  )}
                />
                {step3Form.formState.errors.verificationCode && (
                  <InvalidMessage>
                    {step3Form.formState.errors.verificationCode.message}
                  </InvalidMessage>
                )}
              </div>
            )}
          </FormSection>
        );

      default:
        return null;
    }
  };

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
      <ButtonsWrapper>{renderButtons()}</ButtonsWrapper>
    </Container>
  );
};

export default SignUp;

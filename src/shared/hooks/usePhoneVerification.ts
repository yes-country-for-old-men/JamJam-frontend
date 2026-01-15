import { useState, useEffect, useCallback } from 'react';
import { sendSMS, verifySMS } from '@/features/signup/api/signUpApi';
import { getErrorMessage } from '@/shared/utils';

type MessageState = {
  text: string;
  type: 'success' | 'error' | 'info';
} | null;

const usePhoneVerification = () => {
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verificationCountdown, setVerificationCountdown] = useState(0);
  const [phoneMessage, setPhoneMessage] = useState<MessageState>(null);
  const [verificationMessage, setVerificationMessage] =
    useState<MessageState>(null);
  const [isSendingSMS, setIsSendingSMS] = useState(false);
  const [isVerifyingSMS, setIsVerifyingSMS] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (verificationCountdown > 0) {
      interval = setInterval(() => {
        setVerificationCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [verificationCountdown]);

  const formatCountdown = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const sendVerification = useCallback(async (phone: string) => {
    setIsSendingSMS(true);
    try {
      const cleanPhone = phone.replace(/-/g, '');
      await sendSMS({ phoneNumber: cleanPhone });

      setPhoneMessage({ text: '인증번호가 전송되었습니다.', type: 'success' });
      setIsVerificationSent(true);
      setIsPhoneVerified(false);
      setVerificationCountdown(300);
      setVerificationMessage(null);
    } catch (error) {
      setPhoneMessage({ text: getErrorMessage(error), type: 'error' });
      setIsVerificationSent(false);
    } finally {
      setIsSendingSMS(false);
    }
  }, []);

  const verifyCode = useCallback(async (phone: string, code: string) => {
    if (!code || !/^\d{6}$/.test(code)) {
      setVerificationMessage({
        text: '인증번호는 6자리 숫자입니다.',
        type: 'error',
      });
      return;
    }

    setIsVerifyingSMS(true);
    try {
      const cleanPhone = phone.replace(/-/g, '');
      await verifySMS({ phoneNumber: cleanPhone, code });

      setVerificationMessage({
        text: '인증이 완료되었습니다.',
        type: 'success',
      });
      setIsPhoneVerified(true);
      setVerificationCountdown(0);
    } catch (error) {
      const response = error as {
        response?: { status?: number; data?: { message?: string } };
      };
      if (response.response?.status === 400) {
        setVerificationMessage({
          text: '인증번호가 올바르지 않습니다.',
          type: 'error',
        });
      } else if (response.response?.status === 410) {
        setIsVerificationSent(false);
        setVerificationCountdown(0);
        setPhoneMessage({ text: '인증번호가 만료되었습니다.', type: 'error' });
        setVerificationMessage(null);
      } else {
        setVerificationMessage({
          text: '알 수 없는 에러가 발생했습니다.',
          type: 'error',
        });
      }
      setIsPhoneVerified(false);
    } finally {
      setIsVerifyingSMS(false);
    }
  }, []);

  const resetVerification = useCallback(() => {
    setPhoneMessage(null);
    setIsVerificationSent(false);
    setIsPhoneVerified(false);
    setVerificationMessage(null);
    setVerificationCountdown(0);
  }, []);

  return {
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
  };
};

export default usePhoneVerification;

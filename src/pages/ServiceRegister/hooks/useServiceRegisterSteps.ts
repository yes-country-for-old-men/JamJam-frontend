import { useState, useEffect } from 'react';
import { getProviderProfile } from '@apis/provider';
import useModal from '@hooks/useModal';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const useServiceRegisterSteps = () => {
  const [step, setStep] = useState(1);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);
  const [hasGeneratedThumbnail, setHasGeneratedThumbnail] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [serviceNames, setServiceNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { confirm } = useModal();
  const navigate = useNavigate();

  const goToNextStep = () => {
    setStep(step + 1);
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const goToStep = (stepNumber: number) => {
    setStep(stepNumber);
  };

  useEffect(() => {
    const checkProviderProfile = async () => {
      const showProfileRequiredModal = () => {
        confirm({
          title: '프로필 등록 필요',
          content:
            '서비스를 등록하기 전에 전문가 프로필 정보를 먼저 등록해 주세요.',
          onConfirm: () => navigate('/my/profile-edit'),
        });
      };

      try {
        const response = await getProviderProfile();
        if (!response.data.content) {
          showProfileRequiredModal();
          return;
        }
        setIsLoading(false);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) {
          showProfileRequiredModal();
        }
      }
    };

    checkProviderProfile();
  }, [navigate, confirm]);

  return {
    step,
    isLoading,
    isGeneratingThumbnail,
    hasGeneratedThumbnail,
    isRegistering,
    serviceNames,
    setServiceNames,
    setIsGeneratingThumbnail,
    setHasGeneratedThumbnail,
    setIsRegistering,
    goToNextStep,
    goToPreviousStep,
    goToStep,
  };
};

export default useServiceRegisterSteps;

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { type UseFormReturn } from 'react-hook-form';
import { type ServiceRegisterData } from '@pages/ServiceRegister/schemas/serviceRegisterSchema';
import useModal from '@hooks/useModal';
import {
  generateService,
  generateAiThumbnail,
  registerService,
  type ServiceRegisterRequest,
} from '@apis/service';
import { getProviderProfile } from '@apis/provider';
import base64ToFile from '@utils/base64ToFile';

interface UseServiceRegisterLogicProps {
  form: UseFormReturn<ServiceRegisterData>;
}

const useServiceRegisterSteps = ({ form }: UseServiceRegisterLogicProps) => {
  const [step, setStep] = useState(1);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);
  const [hasGeneratedThumbnail, setHasGeneratedThumbnail] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [serviceNames, setServiceNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { alert, confirm, loading, closeModal } = useModal();
  const navigate = useNavigate();

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

  const handleAIGenerate = useCallback(async () => {
    const isValid = await form.trigger('description');
    if (!isValid) {
      return;
    }

    const description = form.getValues('description');
    loading({ loadingText: 'AI가 콘텐츠를 생성하고 있습니다' });

    try {
      const response = await generateService({
        description,
      });

      const {
        serviceNames: generatedServiceNames,
        category,
        description: generatedDescription,
      } = response.data.content;

      setServiceNames(generatedServiceNames);
      form.setValue('serviceDetail', generatedDescription);
      form.setValue('category', category);
      setStep(2);
    } catch {
      alert({
        title: '콘텐츠 생성 실패',
        content: 'AI 콘텐츠 생성 중 오류가 발생했습니다.',
      });
    } finally {
      closeModal();
    }
  }, [form, alert, loading, closeModal]);

  const handleAIGenerateThumbnail = useCallback(async () => {
    const isValid = await form.trigger('serviceName');
    if (!isValid) {
      return;
    }

    const serviceName = form.getValues('serviceName');
    const serviceDetail = form.getValues('serviceDetail');
    const includeTitleInThumbnail = form.getValues('includeTitleInThumbnail');

    setIsGeneratingThumbnail(true);

    try {
      const response = await generateAiThumbnail({
        serviceName,
        description: serviceDetail,
        typography: includeTitleInThumbnail,
      });

      const { imageBase64 } = response.data.content;
      const thumbnailFile = base64ToFile(imageBase64, 'ai-thumbnail.png');
      form.setValue('thumbnailImage', thumbnailFile);
      setHasGeneratedThumbnail(true);
    } catch {
      alert({
        title: '썸네일 생성 실패',
        content: 'AI 썸네일 생성 중 오류가 발생했습니다.',
      });
    } finally {
      setIsGeneratingThumbnail(false);
    }
  }, [form, alert]);

  const handleSave = useCallback(async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    const formData = form.getValues();

    setIsRegistering(true);

    try {
      const requestData: ServiceRegisterRequest = {
        request: {
          serviceName: formData.serviceName,
          categoryId: formData.category as number,
          salary: formData.price,
          description: formData.serviceDetail,
        },
        thumbnail: formData.thumbnailImage as File,
        portfolioImages: formData.portfolioImages?.map(
          (fileWithId) => fileWithId.file,
        ),
      };

      await registerService(requestData);

      alert({
        title: '등록 완료',
        content: '서비스가 성공적으로 등록되었습니다.',
        onConfirm: () => window.location.reload(),
      });
    } catch {
      alert({
        title: '서비스 등록 실패',
        content: '서비스 등록 중 오류가 발생했습니다.',
      });
    } finally {
      setIsRegistering(false);
    }
  }, [form, alert]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step]);

  const handleNext = useCallback(async () => {
    let isValid = true;

    if (step === 1) {
      isValid = await form.trigger('description');
    } else if (step === 2) {
      isValid = await form.trigger([
        'serviceName',
        'serviceDetail',
        'category',
        'price',
      ]);
    }

    if (isValid) {
      setStep(step + 1);
    }
  }, [step, form]);

  return {
    step,
    isLoading,
    isGeneratingThumbnail,
    hasGeneratedThumbnail,
    isRegistering,
    serviceNames,
    handleAIGenerate,
    handleAIGenerateThumbnail,
    handleSave,
    handleBack,
    handleNext,
  };
};

export default useServiceRegisterSteps;

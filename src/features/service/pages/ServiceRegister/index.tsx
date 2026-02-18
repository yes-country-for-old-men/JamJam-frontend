import React from 'react';
import {
  generateService,
  generateAiThumbnail,
  registerService,
  type ServiceRegisterRequest,
} from '@/features/service/api/serviceApi';
import IntroductionStep from '@/features/service/components/ServiceRegister/IntroductionStep';
import MediaUploadStep from '@/features/service/components/ServiceRegister/MediaUploadStep';
import ServiceDetailsStep from '@/features/service/components/ServiceRegister/ServiceDetailsStep';
import { useServiceRegisterForm } from '@/features/service/hooks/useServiceRegisterForm';
import { useServiceRegisterSteps } from '@/features/service/hooks/useServiceRegisterSteps';
import * as S from '@/features/service/pages/ServiceRegister/ServiceRegister.styles';
import { useDialog } from '@/shared/hooks/useDialog';
import { base64ToFile, parsePrice } from '@/shared/utils';

const ServiceRegister: React.FC = () => {
  const { form, formData, updatePrice, updatePortfolioImages } =
    useServiceRegisterForm();

  const {
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
  } = useServiceRegisterSteps();

  const { alert, loading } = useDialog();

  const handlePriceChange = (value: string) => {
    const numericValue = parsePrice(value);
    updatePrice(numericValue);
  };

  const handleAIGenerate = async () => {
    const isValid = await form.trigger('description');
    if (!isValid) {
      return;
    }

    const description = form.getValues('description');
    const close = loading({ text: 'AI가 콘텐츠를 생성하고 있습니다' });

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
      goToNextStep();
    } catch {
      await alert({
        title: '콘텐츠 생성 실패',
        content: 'AI 콘텐츠 생성 중 오류가 발생했습니다.',
      });
    } finally {
      close();
    }
  };

  const handleAIGenerateThumbnail = async () => {
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
      await alert({
        title: '썸네일 생성 실패',
        content: 'AI 썸네일 생성 중 오류가 발생했습니다.',
      });
    } finally {
      setIsGeneratingThumbnail(false);
    }
  };

  const handleSave = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    const formValues = form.getValues();

    setIsRegistering(true);

    try {
      const requestData: ServiceRegisterRequest = {
        request: {
          serviceName: formValues.serviceName,
          categoryId: formValues.category as number,
          salary: formValues.price,
          description: formValues.serviceDetail,
        },
        thumbnail: formValues.thumbnailImage as File,
        portfolioImages: formValues.portfolioImages?.map(
          (fileWithId) => fileWithId.file,
        ),
      };

      await registerService(requestData);

      await alert({
        title: '등록 완료',
        content: '서비스가 성공적으로 등록되었습니다.',
      });
      window.location.reload();
    } catch {
      await alert({
        title: '서비스 등록 실패',
        content: '서비스 등록 중 오류가 발생했습니다.',
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  const handleNext = async () => {
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
      goToNextStep();
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <IntroductionStep form={form} onAIGenerate={handleAIGenerate} />;
      case 2:
        return (
          <ServiceDetailsStep
            form={form}
            priceDisplay={formData.priceDisplay}
            serviceNames={serviceNames}
            onPriceChange={handlePriceChange}
            onNext={handleNext}
            onPrevious={handleBack}
          />
        );
      case 3:
        return (
          <MediaUploadStep
            form={form}
            isGeneratingThumbnail={isGeneratingThumbnail}
            hasGeneratedThumbnail={hasGeneratedThumbnail}
            isRegistering={isRegistering}
            onPortfolioImagesChange={updatePortfolioImages}
            onAIGenerateThumbnail={handleAIGenerateThumbnail}
            onPrevious={handleBack}
            onSave={handleSave}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <S.Container />;
  }

  return <S.Container>{renderStepContent()}</S.Container>;
};

export default ServiceRegister;

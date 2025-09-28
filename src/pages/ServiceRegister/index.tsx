import React from 'react';
import useServiceRegisterForm from '@pages/ServiceRegister/hooks/useServiceRegisterForm';
import useServiceRegisterSteps from '@pages/ServiceRegister/hooks/useServiceRegisterSteps';
import useModal from '@hooks/useModal';
import {
  generateService,
  generateAiThumbnail,
  registerService,
  type ServiceRegisterRequest,
} from '@apis/service';
import base64ToFile from '@utils/base64ToFile';
import * as S from '@pages/ServiceRegister/ServiceRegister.styles';
import IntroductionStep from '@pages/ServiceRegister/components/IntroductionStep';
import ServiceDetailsStep from '@pages/ServiceRegister/components/ServiceDetailsStep';
import MediaUploadStep from '@pages/ServiceRegister/components/MediaUploadStep';

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
    updateServiceNames,
    updateGeneratingThumbnail,
    updateHasGeneratedThumbnail,
    updateIsRegistering,
    goToNextStep,
    goToPreviousStep,
  } = useServiceRegisterSteps();

  const { alert, loading, closeModal } = useModal();

  const parsePrice = (str: string): number => {
    const cleanStr = str.replace(/\D/g, '');
    return parseInt(cleanStr, 10) || 0;
  };

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

      updateServiceNames(generatedServiceNames);
      form.setValue('serviceDetail', generatedDescription);
      form.setValue('category', category);
      goToNextStep();
    } catch {
      alert({
        title: '콘텐츠 생성 실패',
        content: 'AI 콘텐츠 생성 중 오류가 발생했습니다.',
      });
    } finally {
      closeModal();
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

    updateGeneratingThumbnail(true);

    try {
      const response = await generateAiThumbnail({
        serviceName,
        description: serviceDetail,
        typography: includeTitleInThumbnail,
      });

      const { imageBase64 } = response.data.content;
      const thumbnailFile = base64ToFile(imageBase64, 'ai-thumbnail.png');
      form.setValue('thumbnailImage', thumbnailFile);
      updateHasGeneratedThumbnail(true);
    } catch {
      alert({
        title: '썸네일 생성 실패',
        content: 'AI 썸네일 생성 중 오류가 발생했습니다.',
      });
    } finally {
      updateGeneratingThumbnail(false);
    }
  };

  const handleSave = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    const formValues = form.getValues();

    updateIsRegistering(true);

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
      updateIsRegistering(false);
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

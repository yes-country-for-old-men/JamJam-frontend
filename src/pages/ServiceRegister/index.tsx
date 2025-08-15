import React from 'react';
import useServiceRegisterForm from '@pages/ServiceRegister/hooks/useServiceRegisterForm';
import useServiceRegisterSteps from '@pages/ServiceRegister/hooks/useServiceRegisterSteps';
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
    handleAIGenerate,
    handleAIGenerateThumbnail,
    handleSave,
    handleBack,
    handleNext,
  } = useServiceRegisterSteps({ form });

  const parsePrice = (str: string): number => {
    const cleanStr = str.replace(/\D/g, '');
    return parseInt(cleanStr, 10) || 0;
  };

  const handlePriceChange = (value: string) => {
    const numericValue = parsePrice(value);
    updatePrice(numericValue);
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

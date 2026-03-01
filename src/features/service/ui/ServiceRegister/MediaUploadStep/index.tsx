import React, { useState } from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { type ServiceRegisterData } from '@/features/service/model/serviceRegisterSchema';
import * as S from '@/pages/service-register/ServiceRegister.styles';
import AIIcon from '@/shared/assets/icons/ai.svg?react';
import Button from '@/shared/ui/Button';
import FormMessage from '@/shared/ui/FormMessage';
import GradientButton from '@/shared/ui/GradientButton';
import MultiImageUpload from '@/shared/ui/MultiImageUpload';
import SingleImageUpload from '@/shared/ui/SingleImageUpload';
import Spinner from '@/shared/ui/Spinner';
import type { FileWithId } from '@/shared/types/FileWithId';

const MAX_PORTFOLIO_IMAGES = 10;

type ThumbnailTab = 'upload' | 'ai';

interface MediaUploadStepProps {
  form: UseFormReturn<ServiceRegisterData>;
  isGeneratingThumbnail: boolean;
  hasGeneratedThumbnail: boolean;
  isRegistering: boolean;
  onPortfolioImagesChange: (images: FileWithId[]) => void;
  onAIGenerateThumbnail: () => void;
  onPrevious: () => void;
  onSave: () => void;
}

const ThumbnailAIContent: React.FC<{
  isGeneratingThumbnail: boolean;
  hasGeneratedThumbnail: boolean;
  thumbnailImage: File | null;
  onAIGenerateThumbnail: () => void;
}> = ({
  isGeneratingThumbnail,
  hasGeneratedThumbnail,
  thumbnailImage,
  onAIGenerateThumbnail,
}) => {
  if (isGeneratingThumbnail) {
    return (
      <S.ThumbnailLoadingOverlay>
        <Spinner />
        <S.ThumbnailLoadingText>AI 썸네일 생성 중</S.ThumbnailLoadingText>
      </S.ThumbnailLoadingOverlay>
    );
  }
  if (hasGeneratedThumbnail && thumbnailImage) {
    return (
      <S.ThumbnailGeneratedImage
        src={URL.createObjectURL(thumbnailImage)}
        alt="AI 생성 썸네일"
      />
    );
  }
  return (
    <GradientButton
      onClick={onAIGenerateThumbnail}
      disabled={isGeneratingThumbnail}
    >
      <AIIcon />
      AI 생성하기
    </GradientButton>
  );
};

const MediaUploadStep: React.FC<MediaUploadStepProps> = ({
  form,
  isGeneratingThumbnail,
  hasGeneratedThumbnail,
  isRegistering,
  onPortfolioImagesChange,
  onAIGenerateThumbnail,
  onPrevious,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<ThumbnailTab>('upload');
  const thumbnailImage = form.watch('thumbnailImage');

  return (
    <>
      <S.Label>썸네일 사진</S.Label>
      <S.Section>
        <S.ThumbnailTabBar>
          <S.ThumbnailTab
            active={activeTab === 'upload'}
            onClick={() => setActiveTab('upload')}
          >
            직접 업로드
          </S.ThumbnailTab>
          <S.ThumbnailTab
            active={activeTab === 'ai'}
            onClick={() => setActiveTab('ai')}
          >
            AI 생성
          </S.ThumbnailTab>
        </S.ThumbnailTabBar>
        {activeTab === 'upload' ? (
          <S.ThumbnailUploadBox>
            <Controller
              name="thumbnailImage"
              control={form.control}
              render={({ field }) => (
                <SingleImageUpload
                  image={field.value}
                  onImageChange={field.onChange}
                  width={280}
                  height={280}
                />
              )}
            />
          </S.ThumbnailUploadBox>
        ) : (
          <S.ThumbnailAIBox>
            <ThumbnailAIContent
              isGeneratingThumbnail={isGeneratingThumbnail}
              hasGeneratedThumbnail={hasGeneratedThumbnail}
              thumbnailImage={thumbnailImage}
              onAIGenerateThumbnail={onAIGenerateThumbnail}
            />
          </S.ThumbnailAIBox>
        )}
        {form.formState.errors.thumbnailImage?.message && (
          <FormMessage
            type="error"
            message={form.formState.errors.thumbnailImage.message as string}
          />
        )}
      </S.Section>
      <S.Label>포트폴리오 사진</S.Label>
      <S.Section>
        <Controller
          name="portfolioImages"
          control={form.control}
          render={({ field }) => (
            <MultiImageUpload
              images={field.value ?? []}
              onImagesChange={(images) => {
                field.onChange(images);
                onPortfolioImagesChange(images);
              }}
              maxImages={MAX_PORTFOLIO_IMAGES}
            />
          )}
        />
        {form.formState.errors.portfolioImages?.message && (
          <FormMessage
            type="error"
            message={form.formState.errors.portfolioImages.message as string}
          />
        )}
      </S.Section>
      <S.NavigationButtonsWrapper>
        <Button
          size="large"
          variant="outline"
          onClick={onPrevious}
          disabled={isRegistering}
        >
          이전
        </Button>
        <Button
          size="large"
          variant="primary"
          onClick={onSave}
          disabled={isRegistering}
        >
          등록
        </Button>
      </S.NavigationButtonsWrapper>
    </>
  );
};

export default MediaUploadStep;

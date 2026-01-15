import React from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';
import * as S from '@/features/service/pages/ServiceRegister/ServiceRegister.styles';
import { type ServiceRegisterData } from '@/features/service/schemas/serviceRegisterSchema';
import AIIcon from '@/shared/assets/icons/ai.svg?react';
import InfoIcon from '@/shared/assets/icons/info.svg?react';
import ThumbnailErrorImage from '@/shared/assets/images/thumbnail-error.png';
import ThumbnailNormalImage from '@/shared/assets/images/thumbnail-normal.png';
import Button from '@/shared/components/Button';
import Checkbox from '@/shared/components/Checkbox';
import GradientButton from '@/shared/components/GradientButton';
import ImageUpload from '@/shared/components/ImageUpload';
import Spinner from '@/shared/components/Spinner';
import type FileWithId from '@/shared/types/FileWithId';

const MAX_PORTFOLIO_IMAGES = 10;

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
  return (
    <>
      <S.Label>썸네일 사진</S.Label>
      <S.Section>
        <S.ThumbnailUploadArea>
          <S.ThumbnailUploadBox>
            <Controller
              name="thumbnailImage"
              control={form.control}
              render={({ field }) => (
                <ImageUpload
                  image={field.value}
                  onImageChange={field.onChange}
                  width={280}
                  height={280}
                />
              )}
            />
            {isGeneratingThumbnail && (
              <S.ThumbnailLoadingOverlay>
                <Spinner />
                <S.ThumbnailLoadingText>
                  AI 썸네일 생성 중
                </S.ThumbnailLoadingText>
              </S.ThumbnailLoadingOverlay>
            )}
          </S.ThumbnailUploadBox>
          <S.ThumbnailGenerateSection>
            <S.ServiceNameWarning>
              <InfoIcon />
              AI가 생성한 썸네일에서 서비스 명이 잘못 표기될 수 있습니다.
            </S.ServiceNameWarning>
            <S.ExampleThumbnailsContainer>
              <S.ExampleThumbnailWrapper>
                <S.ExampleThumbnailImage src={ThumbnailNormalImage} />
                <S.StatusBadge isSuccess>정상</S.StatusBadge>
              </S.ExampleThumbnailWrapper>
              <S.ExampleThumbnailWrapper>
                <S.ExampleThumbnailImage src={ThumbnailErrorImage} />
                <S.StatusBadge isSuccess={false}>오류</S.StatusBadge>
              </S.ExampleThumbnailWrapper>
            </S.ExampleThumbnailsContainer>
            <Controller
              name="includeTitleInThumbnail"
              control={form.control}
              render={({ field }) => (
                <Checkbox
                  label="썸네일에 서비스 명 표기"
                  selected={field.value}
                  onClick={() => field.onChange(!field.value)}
                />
              )}
            />
            <S.ThumbnailGenerateButtonWrapper>
              <GradientButton
                onClick={onAIGenerateThumbnail}
                disabled={isGeneratingThumbnail || hasGeneratedThumbnail}
              >
                <AIIcon />
                AI 생성하기
              </GradientButton>
            </S.ThumbnailGenerateButtonWrapper>
          </S.ThumbnailGenerateSection>
        </S.ThumbnailUploadArea>
        {form.formState.errors.thumbnailImage?.message && (
          <S.InvalidMessage>
            {form.formState.errors.thumbnailImage.message as string}
          </S.InvalidMessage>
        )}
      </S.Section>
      <S.Label>포트폴리오 사진</S.Label>
      <S.Section>
        <Controller
          name="portfolioImages"
          control={form.control}
          render={({ field }) => (
            <ImageUpload
              images={field.value}
              onImagesChange={(images) => {
                field.onChange(images);
                onPortfolioImagesChange(images);
              }}
              multiple
              maxImages={MAX_PORTFOLIO_IMAGES}
            />
          )}
        />
        {form.formState.errors.portfolioImages?.message && (
          <S.InvalidMessage>
            {form.formState.errors.portfolioImages.message as string}
          </S.InvalidMessage>
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

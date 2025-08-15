import React from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { type ServiceRegisterData } from '@pages/ServiceRegister/schemas/serviceRegisterSchema';
import * as S from '@pages/ServiceRegister/ServiceRegister.styles';
import GradientButton from '@components/GradientButton';
import AIIcon from '@assets/icons/ai.svg?react';

const DESCRIPTION_MAX_LENGTH = 1000;

interface IntroductionStepProps {
  form: UseFormReturn<ServiceRegisterData>;
  onAIGenerate: () => void;
  isGeneratingContent?: boolean;
}

const IntroductionStep: React.FC<IntroductionStepProps> = ({
  form,
  onAIGenerate,
  isGeneratingContent,
}) => {
  const descriptionValue = form.watch('description') || '';

  return (
    <>
      <S.PageTitle>서비스 소개를 자유롭게 적어주세요.</S.PageTitle>
      <S.GuideContainer>
        <S.GuideContent>
          <S.GuideHeader>✨ 아래 질문을 참고해서 작성해 보세요!</S.GuideHeader>
          <S.GuideItem>
            어떤 도움을 드릴 수 있나요? (주요 서비스나 전문 분야를 간단히 설명해
            주세요.)
          </S.GuideItem>
          <S.GuideItem>
            이 서비스를 추천하고 싶은 대상은 누구인가요? (어떤 상황에 있는
            사람에게 도움이 될까요?)
          </S.GuideItem>
          <S.GuideItem>
            비슷한 경험이나 경력, 프로젝트가 있으신가요? 있다면 간단히 소개해
            주세요.
          </S.GuideItem>
          <S.GuideItem>
            어떤 점에서 본인의 서비스가 차별화된다고 생각하시나요? (예:
            커뮤니케이션, 전문성, 결과물 등)
          </S.GuideItem>
          <S.GuideItem>
            작업 방식이나 일정에 대해 알려주실 수 있나요? (예: 상담 → 작업 →
            피드백 반영 등)
          </S.GuideItem>
        </S.GuideContent>
      </S.GuideContainer>
      <S.Section>
        <Controller
          name="description"
          control={form.control}
          render={({ field }) => (
            <S.DescriptionTextArea
              value={field.value}
              onChange={(e) => {
                const { value } = e.target;
                if (value.length <= DESCRIPTION_MAX_LENGTH) {
                  field.onChange(value);
                }
              }}
              placeholder="서비스에 대해 간략하게 설명해 주세요"
              maxLength={DESCRIPTION_MAX_LENGTH}
            />
          )}
        />
        <S.MessageAndCounterWrapper>
          <div>
            {form.formState.errors.description && (
              <S.InvalidMessage>
                {form.formState.errors.description.message}
              </S.InvalidMessage>
            )}
          </div>
          <S.CharacterCounter>
            {descriptionValue.length}/{DESCRIPTION_MAX_LENGTH}자
          </S.CharacterCounter>
        </S.MessageAndCounterWrapper>
      </S.Section>
      <S.ContentGenerateButtonWrapper>
        <GradientButton onClick={onAIGenerate} disabled={isGeneratingContent}>
          <AIIcon />
          AI 생성하기
        </GradientButton>
      </S.ContentGenerateButtonWrapper>
    </>
  );
};

export default IntroductionStep;

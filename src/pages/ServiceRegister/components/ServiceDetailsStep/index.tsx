import React, { useCallback } from 'react';
import Button from '@components/Button';
import Input from '@components/Input';
import RichTextEditor from '@components/RichTextEditor';
import Select from '@components/Select';
import CATEGORIES from '@constants/serviceCategories';
import { type ServiceRegisterData } from '@pages/ServiceRegister/schemas/serviceRegisterSchema';
import * as S from '@pages/ServiceRegister/ServiceRegister.styles';
import { Controller, type UseFormReturn } from 'react-hook-form';

interface ServiceDetailsStepProps {
  form: UseFormReturn<ServiceRegisterData>;
  priceDisplay: string;
  serviceNames: string[];
  onPriceChange: (value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ServiceDetailsStep: React.FC<ServiceDetailsStepProps> = ({
  form,
  priceDisplay,
  serviceNames,
  onPriceChange,
  onNext,
  onPrevious,
}) => {
  const parsePrice = (str: string): number => {
    const cleanStr = str.replace(/\D/g, '');
    return parseInt(cleanStr, 10) || 0;
  };

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const numericValue = parsePrice(e.target.value);
      const formattedValue = numericValue.toLocaleString();
      onPriceChange(formattedValue);
    },
    [onPriceChange],
  );

  const handleRecommendationClick = (recommendation: string) => {
    form.setValue('serviceName', recommendation);
  };

  return (
    <>
      <S.Section>
        <S.Label>서비스 명</S.Label>
        <Controller
          name="serviceName"
          control={form.control}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="서비스 명을 입력해 주세요"
            />
          )}
        />
        {form.formState.errors.serviceName && (
          <S.InvalidMessage>
            {form.formState.errors.serviceName.message}
          </S.InvalidMessage>
        )}
        {serviceNames.length > 0 && (
          <S.RecommendationWrapper>
            {serviceNames.map((name) => (
              <S.RecommendationChip
                key={name}
                onClick={() => handleRecommendationClick(name)}
              >
                {name}
              </S.RecommendationChip>
            ))}
          </S.RecommendationWrapper>
        )}
      </S.Section>
      <S.Section>
        <S.Label>서비스 상세 설명</S.Label>
        <Controller
          name="serviceDetail"
          control={form.control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              height={540}
            />
          )}
        />
        {form.formState.errors.serviceDetail && (
          <S.InvalidMessage>
            {form.formState.errors.serviceDetail.message}
          </S.InvalidMessage>
        )}
      </S.Section>
      <S.Section>
        <S.Label>카테고리</S.Label>
        <Controller
          name="category"
          control={form.control}
          render={({ field }) => (
            <Select
              value={field.value || ''}
              onChange={(e) =>
                field.onChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            >
              <option value={undefined}>전문 분야를 선택하세요</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          )}
        />
        {form.formState.errors.category && (
          <S.InvalidMessage>
            {form.formState.errors.category.message}
          </S.InvalidMessage>
        )}
      </S.Section>
      <S.Section>
        <S.Label>가격 (VAT 포함가)</S.Label>
        <Input
          type="text"
          value={priceDisplay}
          onChange={handlePriceChange}
          placeholder="가격을 입력해 주세요"
        />
        {form.formState.errors.price && (
          <S.InvalidMessage>
            {form.formState.errors.price.message}
          </S.InvalidMessage>
        )}
      </S.Section>
      <S.NavigationButtonsWrapper>
        <Button size="large" variant="outline" onClick={onPrevious}>
          이전
        </Button>
        <Button size="large" onClick={onNext}>
          다음
        </Button>
      </S.NavigationButtonsWrapper>
    </>
  );
};

export default ServiceDetailsStep;

import React from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { type ServiceRegisterData } from '@/features/service/model/serviceRegisterSchema';
import * as S from '@/pages/service-register/ServiceRegister.styles';
import Button from '@/shared/components/Button';
import FormMessage from '@/shared/components/FormMessage';
import Input from '@/shared/components/Input';
import RichTextEditor from '@/shared/components/RichTextEditor';
import Select from '@/shared/components/Select';
import { CATEGORIES } from '@/shared/constants';
import { parsePrice } from '@/shared/utils';

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
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parsePrice(e.target.value);
    const formattedValue = numericValue.toLocaleString();
    onPriceChange(formattedValue);
  };

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
          <FormMessage
            type="error"
            message={form.formState.errors.serviceName.message || ''}
          />
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
          <FormMessage
            type="error"
            message={form.formState.errors.serviceDetail.message || ''}
          />
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
          <FormMessage
            type="error"
            message={form.formState.errors.category.message || ''}
          />
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
          <FormMessage
            type="error"
            message={form.formState.errors.price.message || ''}
          />
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

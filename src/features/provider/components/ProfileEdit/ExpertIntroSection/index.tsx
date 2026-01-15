import React from 'react';
import { Controller } from 'react-hook-form';
import CATEGORIES from '@/features/category/constants/serviceCategories';
import { type ProfileForm } from '@/features/provider/hooks/useProfileForm';
import * as S from '@/features/provider/pages/ProfileEdit/ProfileEdit.styles';
import Select from '@/shared/components/Select';
import LOCATIONS from '@/shared/constants/locations';

interface ExpertIntroSectionProps {
  form: ProfileForm;
}

const ExpertIntroSection: React.FC<ExpertIntroSectionProps> = ({ form }) => (
  <S.Section>
    <S.SectionTitle>전문가 소개</S.SectionTitle>
    <S.FormGroup>
      <S.Label>자기 소개</S.Label>
      <Controller
        name="introduction"
        control={form.control}
        render={({ field }) => (
          <S.TextArea
            placeholder="자기 소개를 입력하세요"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </S.FormGroup>
    <S.FormGroup>
      <S.Label>지역</S.Label>
      <Controller
        name="selectedLocation"
        control={form.control}
        render={({ field }) => (
          <Select
            value={field.value || ''}
            onChange={(e) =>
              field.onChange(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">지역을 선택하세요</option>
            {LOCATIONS.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </Select>
        )}
      />
    </S.FormGroup>
    <S.FormGroup>
      <S.Label>전문 분야</S.Label>
      <Controller
        name="selectedCategory"
        control={form.control}
        render={({ field }) => (
          <Select
            value={field.value || ''}
            onChange={(e) =>
              field.onChange(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">전문 분야를 선택하세요</option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        )}
      />
    </S.FormGroup>
  </S.Section>
);

export default ExpertIntroSection;

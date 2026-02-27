import React from 'react';
import CategoryCard from '@/features/main/ui/CategoryCard';
import { CATEGORIES } from '@/shared/config';
import * as S from './CategorySection.styles';

const CategorySection: React.FC = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>어떤 도움이 필요하신가요?</S.Title>
      </S.Header>
      <S.Grid>
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            icon={category.icon}
          />
        ))}
      </S.Grid>
    </S.Container>
  );
};

export default CategorySection;

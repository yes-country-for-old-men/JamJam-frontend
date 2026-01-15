import React from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { categoryExpandedAtom } from '@/features/category/atoms/categoryAtoms';
import CATEGORIES from '@/features/category/constants/serviceCategories';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg?react';
import CategoryIcon from '@/shared/assets/icons/category.svg?react';
import theme from '@/shared/styles/theme';
import * as S from './CategoryTabNavigator.styles';

interface CategoryTabNavigatorProps {
  currentCategoryId?: number | null;
}

const CategoryTabNavigator: React.FC<CategoryTabNavigatorProps> = ({
  currentCategoryId,
}) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useAtom(categoryExpandedAtom);
  const topCategories = CATEGORIES.slice(0, 6);
  const expandedCategories = CATEGORIES.slice(6);
  const iconColor = isExpanded
    ? theme.COLORS.MAIN.PRIMARY
    : theme.COLORS.LABEL.SECONDARY;

  const handleCategoryClick = (newCategoryId: number) => {
    navigate(`/category/${newCategoryId}`);
  };

  const handleExpansionToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <S.Container role="navigation" aria-label="category-navigator">
      <S.ExpansionButton
        isExpanded={isExpanded}
        onClick={handleExpansionToggle}
        aria-expanded={isExpanded}
        aria-controls="expanded-categories"
      >
        <CategoryIcon stroke={iconColor} />
        카테고리
        <S.ArrowIconWrapper isExpanded={isExpanded}>
          <ArrowDownIcon fill={iconColor} />
        </S.ArrowIconWrapper>
      </S.ExpansionButton>
      <S.CategoryList role="tablist">
        {topCategories.map((category) => (
          <S.CategoryItem key={category.id}>
            <S.CategoryButton
              isActive={currentCategoryId === category.id}
              onClick={() => handleCategoryClick(category.id)}
              role="tab"
              aria-selected={currentCategoryId === category.id}
            >
              {category.name}
            </S.CategoryButton>
          </S.CategoryItem>
        ))}
      </S.CategoryList>
      <S.ExpandedSection id="expanded-categories" isExpanded={isExpanded}>
        <S.ExpandedContent>
          <S.CategoryList role="tablist">
            {expandedCategories.map((category) => (
              <S.CategoryItem key={category.id}>
                <S.CategoryButton
                  isActive={currentCategoryId === category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  role="tab"
                  aria-selected={currentCategoryId === category.id}
                >
                  {category.name}
                </S.CategoryButton>
              </S.CategoryItem>
            ))}
          </S.CategoryList>
        </S.ExpandedContent>
      </S.ExpandedSection>
    </S.Container>
  );
};

export default CategoryTabNavigator;

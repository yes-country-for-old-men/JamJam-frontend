import React from 'react';
import ArrowDownIcon from '@assets/icons/arrow-down.svg?react';
import CategoryIcon from '@assets/icons/category.svg?react';
import { categoryExpandedAtom } from '@atoms/categoryAtoms';
import CATEGORIES from '@constants/serviceCategories';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

interface CategoryTabNavigatorProps {
  currentCategoryId?: number | null;
}

const Container = styled.nav`
  position: relative;
  width: 100%;
  min-width: 1200px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  margin-bottom: 36px;
`;

const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

const CategoryItem = styled.li``;

const CategoryButton = styled.button<{ isActive?: boolean }>`
  padding: 12px;
  color: ${(props) =>
    props.isActive
      ? props.theme.COLORS.LABEL.PRIMARY
      : props.theme.COLORS.LABEL.SECONDARY};
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  border-bottom: 2.5px solid transparent;

  &:hover {
    border-bottom-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }
`;

const ExpansionButton = styled.button<{ isExpanded: boolean }>`
  position: absolute;
  left: max(24px, calc(50vw - (600px - 24px)));
  bottom: 0;
  display: flex;
  align-items: center;
  border-bottom: 2.5px solid transparent;
  color: ${(props) =>
    props.isExpanded
      ? props.theme.COLORS.MAIN.PRIMARY
      : props.theme.COLORS.LABEL.SECONDARY};
  font-size: 16px;
  font-weight: 600;
  padding: 12px 0;
  gap: 8px;
`;

const ArrowIconWrapper = styled.div<{ isExpanded: boolean }>`
  display: flex;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(${(props) => (props.isExpanded ? 180 : 0)}deg);
`;

const ExpandedSection = styled.section<{ isExpanded: boolean }>`
  display: grid;
  grid-template-rows: ${(props) => (props.isExpanded ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ExpandedContent = styled.div`
  overflow: hidden;
`;

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
    <Container role="navigation" aria-label="category-navigator">
      <ExpansionButton
        isExpanded={isExpanded}
        onClick={handleExpansionToggle}
        aria-expanded={isExpanded}
        aria-controls="expanded-categories"
      >
        <CategoryIcon stroke={iconColor} />
        카테고리
        <ArrowIconWrapper isExpanded={isExpanded}>
          <ArrowDownIcon fill={iconColor} />
        </ArrowIconWrapper>
      </ExpansionButton>
      <CategoryList role="tablist">
        {topCategories.map((category) => (
          <CategoryItem key={category.id}>
            <CategoryButton
              isActive={currentCategoryId === category.id}
              onClick={() => handleCategoryClick(category.id)}
              role="tab"
              aria-selected={currentCategoryId === category.id}
            >
              {category.name}
            </CategoryButton>
          </CategoryItem>
        ))}
      </CategoryList>
      <ExpandedSection id="expanded-categories" isExpanded={isExpanded}>
        <ExpandedContent>
          <CategoryList role="tablist">
            {expandedCategories.map((category) => (
              <CategoryItem key={category.id}>
                <CategoryButton
                  isActive={currentCategoryId === category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  role="tab"
                  aria-selected={currentCategoryId === category.id}
                >
                  {category.name}
                </CategoryButton>
              </CategoryItem>
            ))}
          </CategoryList>
        </ExpandedContent>
      </ExpandedSection>
    </Container>
  );
};

export default CategoryTabNavigator;

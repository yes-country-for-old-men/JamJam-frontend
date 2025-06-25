import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import type Category from '@type/Category';
import theme from '@styles/theme';
import CategoryIcon from '@assets/icons/category.svg?react';
import ArrowDownIcon from '@assets/icons/arrow-down.svg?react';

interface CategoryTabNavigatorProps {
  categories: readonly Category[];
  currentCategoryId?: number | null;
  onCategoryClick?: (categoryId: number) => void;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  background: ${(props) => props.theme.COLORS.BACKGROUND};
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  margin-bottom: 36px;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

const CategoryButton = styled(motion.button)<{ isActive?: boolean }>`
  padding: 12px;
  color: ${(props) =>
    props.isActive
      ? props.theme.COLORS.LABEL_PRIMARY
      : props.theme.COLORS.LABEL_SECONDARY};
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  border-bottom: 2.5px solid transparent;

  &:hover {
    border-bottom-color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
  }
`;

const CategoryExpansionButton = styled(motion.button)<{ isExpanded: boolean }>`
  position: absolute;
  left: max(24px, calc(50vw - (600px - 24px)));
  bottom: 0;
  display: flex;
  align-items: center;
  border-bottom: 2.5px solid transparent;
  color: ${(props) =>
    props.isExpanded
      ? props.theme.COLORS.JAMJAM_PRIMARY[1]
      : props.theme.COLORS.LABEL_SECONDARY};
  font-size: 16px;
  font-weight: 600;
  padding: 12px 0;
  gap: 8px;
`;

const CategoryTabNavigator: React.FC<CategoryTabNavigatorProps> = ({
  categories,
  currentCategoryId,
  onCategoryClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const topCategories = categories.slice(0, 6);
  const expandedCategories = categories.slice(6);
  const iconColor = isExpanded
    ? theme.COLORS.JAMJAM_PRIMARY[1]
    : theme.COLORS.LABEL_SECONDARY;

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expandedCategories]);

  const handleCategoryClick = (categoryId: number) => {
    onCategoryClick?.(categoryId);
  };

  return (
    <Container>
      <CategoryExpansionButton
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CategoryIcon stroke={iconColor} />
        카테고리
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          <ArrowDownIcon fill={iconColor} />
        </motion.div>
      </CategoryExpansionButton>
      <CategoryContainer>
        {topCategories.map((category) => (
          <CategoryButton
            key={category.id}
            isActive={currentCategoryId === category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryContainer>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: contentHeight, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2, delay: isExpanded ? 0.1 : 0 },
            }}
            style={{ overflow: 'hidden' }}
          >
            <div ref={contentRef}>
              <CategoryContainer>
                {expandedCategories.map((category) => (
                  <CategoryButton
                    key={category.id}
                    isActive={currentCategoryId === category.id}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.name}
                  </CategoryButton>
                ))}
              </CategoryContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default CategoryTabNavigator;

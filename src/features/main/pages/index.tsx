import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import CATEGORIES from '@/features/category/constants/serviceCategories';
import Carousel from '@/features/main/components/Carousel';
import CategoryCard from '@/features/main/components/CategoryCard';
import SearchBar from '@/shared/components/SearchBar';
import SLIDE_IMAGES from '@/shared/constants/slideImages';

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  },
  gridContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  gridItem: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
    hover: {
      y: -8,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 20,
      },
    },
  },
} as const;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: max-content;
  overflow-x: auto;
  padding: 0;
`;

const ScrollableContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
  gap: 72px;
  padding: 72px 24px;
`;

const TopSection = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 64px;
`;

const LeftSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled(motion.div)`
  font-size: 42px;
  font-weight: 700;
  text-align: start;
  line-height: 1.4;
  white-space: pre-line;
  margin-bottom: 36px;
  word-break: keep-all;
`;

const SearchBarWrapper = styled(motion.div)`
  width: 100%;
  min-width: 300px;
`;

const CarouselWrapper = styled(motion.div)`
  flex-shrink: 0;
`;

const CategorySection = styled(motion.div)`
  width: 100%;
`;

const CategoryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  gap: 24px;
`;

const Main: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  return (
    <Container>
      <ScrollableContent>
        <TopSection
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          <LeftSection variants={ANIMATION_VARIANTS.item}>
            <Title variants={ANIMATION_VARIANTS.item}>
              잊혀지는 경력이 아니라,{'\n'}이어지는 기회가 되도록
            </Title>
            <SearchBarWrapper variants={ANIMATION_VARIANTS.item}>
              <SearchBar
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="필요한 손길을 찾아보세요"
              />
            </SearchBarWrapper>
          </LeftSection>
          <CarouselWrapper variants={ANIMATION_VARIANTS.item}>
            <Carousel slides={SLIDE_IMAGES} />
          </CarouselWrapper>
        </TopSection>

        <CategorySection
          variants={ANIMATION_VARIANTS.item}
          initial="hidden"
          animate="visible"
        >
          <CategoryGrid
            variants={ANIMATION_VARIANTS.gridContainer}
            initial="hidden"
            animate="visible"
          >
            {CATEGORIES.map((category) => (
              <motion.div
                key={category.id}
                variants={ANIMATION_VARIANTS.gridItem}
                whileHover="hover"
              >
                <CategoryCard
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                />
              </motion.div>
            ))}
          </CategoryGrid>
        </CategorySection>
      </ScrollableContent>
    </Container>
  );
};

export default Main;

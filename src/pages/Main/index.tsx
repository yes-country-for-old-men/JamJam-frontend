import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Carousel from '@pages/Main/components/Carousel';
import SearchBar from '@components/SearchBar';
import CategoryCard from '@pages/Main/components/CategoryCard';
import CATEGORIES from '@constants/categoryData';
import { MOCK_SLIDES } from '@constants/mockData';

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
  },
} as const;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
  overflow-x: auto;
  overflow-y: auto;
  padding: 0 48px;
  gap: 80px;
`;

const TopSection = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
`;

const LeftSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-shrink: 0;
`;

const Title = styled(motion.div)`
  min-width: max-content;
  font-size: 42px;
  font-weight: 700;
  text-align: start;
  line-height: 1.4;
  white-space: pre-line;
  margin-bottom: 36px;
`;

const SearchBarWrapper = styled(motion.div)`
  width: 100%;
`;

const CarouselWrapper = styled(motion.div)`
  flex-shrink: 0;
`;

const CategorySection = styled(motion.div)`
  width: 1200px;
`;

const CategoryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;
  width: 1200px;
`;

const Main: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  return (
    <Container>
      <TopSection
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="visible"
      >
        <LeftSection variants={ANIMATION_VARIANTS.item}>
          <Title variants={ANIMATION_VARIANTS.item}>
            경험이 필요할 땐,{'\n'}경험이 있는 사람이 답입니다.
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
          <Carousel slides={MOCK_SLIDES} />
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
    </Container>
  );
};

export default Main;

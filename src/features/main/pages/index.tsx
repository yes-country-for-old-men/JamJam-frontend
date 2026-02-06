import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Carousel from '@/features/main/components/Carousel';
import CategoryCard from '@/features/main/components/CategoryCard';
import SearchBar from '@/shared/components/SearchBar';
import { CATEGORIES, SLIDE_IMAGES } from '@/shared/constants';
import * as S from './Main.styles';

const Main: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const SPRING_TRANSITION = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  };

  return (
    <S.Container>
      <S.ScrollableContent>
        <S.TopSection initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <S.LeftSection
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...SPRING_TRANSITION, delay: 0.1 }}
          >
            <S.Title
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...SPRING_TRANSITION, delay: 0.2 }}
            >
              잊혀지는 경력이 아니라,{'\n'}이어지는 기회가 되도록
            </S.Title>
            <S.SearchBarWrapper
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...SPRING_TRANSITION, delay: 0.2 }}
            >
              <SearchBar
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="필요한 손길을 찾아보세요"
              />
            </S.SearchBarWrapper>
          </S.LeftSection>
          <S.CarouselWrapper
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...SPRING_TRANSITION, delay: 0.3 }}
          >
            <Carousel slides={SLIDE_IMAGES} />
          </S.CarouselWrapper>
        </S.TopSection>
        <S.CategorySection>
          <S.CategoryGrid>
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ y: -8 }}
                transition={{ ...SPRING_TRANSITION, delay: 0.4 + index * 0.05 }}
              >
                <CategoryCard
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                />
              </motion.div>
            ))}
          </S.CategoryGrid>
        </S.CategorySection>
      </S.ScrollableContent>
    </S.Container>
  );
};

export default Main;

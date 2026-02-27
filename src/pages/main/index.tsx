import React from 'react';
import CategorySection from '@/features/main/ui/CategorySection';
import HeroBanner from '@/features/main/ui/HeroBanner';
import SearchBar from '@/shared/components/SearchBar';
import * as S from './Main.styles';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

const Main: React.FC = () => {
  return (
    <S.Container>
      <S.Content>
        <S.Section {...fadeUp(0)}>
          <S.TitleSection>
            <S.Title>잊히지 않도록, 다시 이어지도록</S.Title>
            <S.SubTitle>
              당신의 경험이 필요한 곳과 다시 만날 수 있도록 연결합니다.
            </S.SubTitle>
            <S.SearchSection>
              <SearchBar placeholder="필요한 손길을 찾아보세요" />
            </S.SearchSection>
          </S.TitleSection>
        </S.Section>
        <S.Section {...fadeUp(0.2)}>
          <HeroBanner />
        </S.Section>
        <S.Section {...fadeUp(0.4)}>
          <CategorySection />
        </S.Section>
      </S.Content>
    </S.Container>
  );
};

export default Main;

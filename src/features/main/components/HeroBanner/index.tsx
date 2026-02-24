import React, { useMemo } from 'react';
import { BANNER_CONFIG } from '@/features/main/components/HeroBanner/constants';
import { SLIDE_IMAGES } from '@/shared/constants';
import * as S from './HeroBanner.styles';
import { useHeroBanner } from './useHeroBanner';

const HeroBanner: React.FC = () => {
  const slides = SLIDE_IMAGES;

  const {
    containerRef,
    trackRef,
    getSlideStyle,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useHeroBanner(slides.length);

  const displaySlides = useMemo(() => {
    if (slides.length === 0) return [];

    const before = slides.slice(-BANNER_CONFIG.CLONE_COUNT);
    const after = slides.slice(0, BANNER_CONFIG.CLONE_COUNT);

    return [...before, ...slides, ...after].map((slide, index) => ({
      ...slide,
      id: index,
    }));
  }, [slides]);

  return (
    <S.Section
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <S.GradientLeft />
      <S.GradientRight />
      <S.Track ref={trackRef}>
        {displaySlides.map((slide, index) => (
          <S.Slide key={slide.id}>
            <S.SlideInner style={getSlideStyle(index)}>
              <img
                src={slide.thumbnailUrl}
                alt={`slide-${slide.id}`}
                draggable={false}
                loading={index === BANNER_CONFIG.CLONE_COUNT ? 'eager' : 'lazy'}
              />
            </S.SlideInner>
          </S.Slide>
        ))}
      </S.Track>
    </S.Section>
  );
};

export default HeroBanner;

import React, { useCallback, useMemo } from 'react';
import { type PanInfo } from 'framer-motion';
import * as S from './Carousel.styles';
import {
  useAutoSlide,
  useSlideTransition,
  useDragDetection,
} from './useCarousel';

export interface CarouselSlide {
  id: number;
  thumbnailUrl: string;
  alt?: string;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
}

type DragHandler = (
  event: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo,
) => void;

interface SlideImageProps {
  slide: CarouselSlide;
  offset: number;
  onDragStart: DragHandler;
  onDrag: DragHandler;
  onDragEnd: DragHandler;
}

const getSlideTransform = (offset: number) => {
  const transformMap: Record<
    number,
    { x: number; scale: number; opacity: number }
  > = {
    0: { x: 0, scale: 1, opacity: 1 },
    1: { x: 100, scale: 0.8, opacity: 0.8 },
    [-1]: { x: -100, scale: 0.8, opacity: 0.8 },
  };

  return transformMap[offset] || { x: 0, scale: 0, opacity: 0 };
};

const SlideImage: React.FC<SlideImageProps> = ({
  slide,
  offset,
  onDragStart,
  onDrag,
  onDragEnd,
}) => {
  const isActive = offset === 0;

  return (
    <S.SlideItem
      style={{
        zIndex: isActive ? 1 : 0,
        cursor: isActive ? 'grab' : 'default',
      }}
      animate={getSlideTransform(offset)}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      drag={isActive ? 'x' : false}
      dragConstraints={{ left: -50, right: 50 }}
      dragElastic={0}
      dragSnapToOrigin
      dragMomentum={false}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      whileHover={isActive ? { scale: 1.05 } : {}}
      whileTap={isActive ? { scale: 0.95 } : {}}
      whileDrag={isActive ? { cursor: 'grabbing' } : {}}
    >
      <img
        src={slide.thumbnailUrl}
        alt={slide.alt || 'slide'}
        draggable={false}
      />
    </S.SlideItem>
  );
};

const Carousel: React.FC<CarouselProps> = ({ slides, autoPlay = true }) => {
  const {
    hasMoved,
    handleDragStart: onDragStartDetection,
    handleDrag,
    handleDragEnd: onDragEndDetection,
  } = useDragDetection();

  const { currentIndex, goToNext, goToPrev } = useSlideTransition(
    slides.length,
  );

  const { startTimer, stopTimer } = useAutoSlide(
    goToNext,
    autoPlay && slides.length > 1,
  );

  const handleDragStart = useCallback(() => {
    stopTimer();
    onDragStartDetection();
  }, [stopTimer, onDragStartDetection]);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (hasMoved && Math.abs(info.offset.x) > 25) {
        if (info.offset.x < 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
      onDragEndDetection();
      startTimer();
    },
    [hasMoved, goToNext, goToPrev, onDragEndDetection, startTimer],
  );

  const visibleSlides = useMemo(() => {
    const total = slides.length;
    if (total === 0) return [];

    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    return [
      { slide: slides[prevIndex], offset: -1 },
      { slide: slides[currentIndex], offset: 0 },
      { slide: slides[nextIndex], offset: 1 },
    ];
  }, [slides, currentIndex]);

  return (
    <S.Container>
      <S.SlideStack>
        {visibleSlides.map(({ slide, offset }) => (
          <SlideImage
            key={slide.id}
            slide={slide}
            offset={offset}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          />
        ))}
      </S.SlideStack>
    </S.Container>
  );
};

export default Carousel;

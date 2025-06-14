import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, type PanInfo } from 'framer-motion';

export interface CarouselSlide {
  id: number;
  thumbnailUrl: string;
  alt?: string;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  onSlideClick?: (slide: CarouselSlide, index: number) => void;
}

interface SlideImageProps {
  slide: CarouselSlide;
  index: number;
  currentIndex: number;
  totalSlides: number;
  onDragStart: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
  onDrag: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
  onDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
  onSlideClick?: (slide: CarouselSlide, index: number) => void;
  hasMoved: boolean;
}

const CAROUSEL_CONFIG = {
  SLIDE_DELAY_MS: 5000,
  SIDE_SLIDE_SCALE: 0.8,
  SIDE_SLIDE_OPACITY: 0.8,
  HOVER_SCALE: 1.05,
  TAP_SCALE: 0.95,
  TRANSLATE_X_RATIO: 0.18,
  SWIPE_DISTANCE_THRESHOLD: 25,
} as const;

const ANIMATION_CONFIG = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 25,
};

const Container = styled.div`
  position: relative;
  flex: 1;
  width: 560px;
  aspect-ratio: 7/4;
  touch-action: pan-x;
`;

const SlideStack = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SlideItem = styled(motion.div)`
  position: absolute;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  width: 80%;
  height: 100%;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const EmptySlideContainer = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 40px;
`;

const calculateCircularDistance = (
  from: number,
  to: number,
  total: number,
): number => {
  const directDistance = to - from;
  const wrapAroundDistance =
    directDistance > 0 ? directDistance - total : directDistance + total;

  return Math.abs(directDistance) <= Math.abs(wrapAroundDistance)
    ? directDistance
    : wrapAroundDistance;
};

const getSlideTransform = (offset: number) => {
  const translateX = 560 * CAROUSEL_CONFIG.TRANSLATE_X_RATIO;

  const transformMap = {
    0: { x: 0, scale: 1, opacity: 1 },
    1: {
      x: translateX,
      scale: CAROUSEL_CONFIG.SIDE_SLIDE_SCALE,
      opacity: CAROUSEL_CONFIG.SIDE_SLIDE_OPACITY,
    },
    [-1]: {
      x: -translateX,
      scale: CAROUSEL_CONFIG.SIDE_SLIDE_SCALE,
      opacity: CAROUSEL_CONFIG.SIDE_SLIDE_OPACITY,
    },
  };

  return (
    transformMap[offset as keyof typeof transformMap] || {
      x: 0,
      scale: 0.8,
      opacity: 0,
    }
  );
};

const useCarouselNavigation = (totalSlides: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  return { currentIndex, goToNext, goToPrev };
};

const useAutoSlide = (goToNext: () => void, isEnabled: boolean = true) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (!isEnabled) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(goToNext, CAROUSEL_CONFIG.SLIDE_DELAY_MS);
  }, [goToNext, isEnabled]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isEnabled) {
      startTimer();
    }
    return stopTimer;
  }, [startTimer, stopTimer, isEnabled]);

  return { startTimer, stopTimer };
};

const useDragDetection = () => {
  const [hasMoved, setHasMoved] = useState(false);

  const handleDragStart = useCallback(() => {
    setHasMoved(false);
  }, []);

  const handleDrag = useCallback(() => {
    setHasMoved(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (hasMoved) {
      setTimeout(() => setHasMoved(false), 50);
    }
  }, [hasMoved]);

  return {
    hasMoved,
    handleDragStart,
    handleDrag,
    handleDragEnd,
  };
};

const SlideImage: React.FC<SlideImageProps> = ({
  slide,
  index,
  currentIndex,
  totalSlides,
  onDragStart,
  onDrag,
  onDragEnd,
  onSlideClick,
  hasMoved,
}) => {
  const offset = calculateCircularDistance(currentIndex, index, totalSlides);
  const absOffset = Math.abs(offset);

  const handleClick = useCallback(() => {
    if (hasMoved || absOffset !== 0) return;
    onSlideClick?.(slide, index);
  }, [hasMoved, absOffset, onSlideClick, slide, index]);

  if (absOffset > 1) return null;

  const transform = getSlideTransform(offset);
  const zIndex = absOffset === 0 ? 1 : 0;
  const isActive = offset === 0;

  const motionProps = {
    style: { zIndex, cursor: isActive ? 'grab' : 'default' },
    animate: transform,
    transition: ANIMATION_CONFIG,
    drag: isActive ? ('x' as const) : false,
    dragConstraints: { left: -50, right: 50 },
    dragElastic: 0,
    dragSnapToOrigin: true,
    dragMomentum: false,
    onDragStart: isActive ? onDragStart : undefined,
    onDrag: isActive ? onDrag : undefined,
    onDragEnd: isActive ? onDragEnd : undefined,
    onClick: handleClick,
    whileHover: isActive ? { scale: CAROUSEL_CONFIG.HOVER_SCALE } : {},
    whileTap: isActive ? { scale: CAROUSEL_CONFIG.TAP_SCALE } : {},
    whileDrag: isActive ? { cursor: 'grabbing' } : {},
  };

  return (
    <SlideItem {...motionProps}>
      <img
        src={slide.thumbnailUrl}
        alt={slide.alt || 'slide'}
        draggable={false}
      />
    </SlideItem>
  );
};

const EmptyCarousel: React.FC = () => (
  <Container>
    <EmptySlideContainer />
  </Container>
);

const SingleSlideCarousel: React.FC<{
  slide: CarouselSlide;
  onSlideClick?: (slide: CarouselSlide, index: number) => void;
}> = ({ slide, onSlideClick }) => (
  <Container>
    <SlideStack>
      <SlideItem
        animate={{ x: 0, scale: 1, opacity: 1 }}
        onClick={() => onSlideClick?.(slide, 0)}
        whileHover={{ scale: CAROUSEL_CONFIG.HOVER_SCALE }}
        whileTap={{ scale: CAROUSEL_CONFIG.TAP_SCALE }}
      >
        <img
          src={slide.thumbnailUrl}
          alt={slide.alt || 'slide'}
          draggable={false}
        />
      </SlideItem>
    </SlideStack>
  </Container>
);

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlay = true,
  onSlideClick,
}) => {
  const {
    hasMoved,
    handleDragStart: onDragStartDetection,
    handleDrag,
    handleDragEnd: onDragEndDetection,
  } = useDragDetection();

  const { currentIndex, goToNext, goToPrev } = useCarouselNavigation(
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
      const { offset } = info;

      if (hasMoved) {
        const dragDistance = Math.abs(offset.x);

        if (dragDistance > CAROUSEL_CONFIG.SWIPE_DISTANCE_THRESHOLD) {
          if (offset.x < 0) {
            goToNext();
          } else {
            goToPrev();
          }
        }
      }

      onDragEndDetection();
      startTimer();
    },
    [hasMoved, goToNext, goToPrev, onDragEndDetection, startTimer],
  );

  const handleSlideClick = useCallback(
    (slide: CarouselSlide, index: number) => {
      if (index === currentIndex) {
        onSlideClick?.(slide, index);
      }
    },
    [currentIndex, onSlideClick],
  );

  if (slides.length === 0) {
    return <EmptyCarousel />;
  }

  if (slides.length === 1) {
    return (
      <SingleSlideCarousel slide={slides[0]} onSlideClick={onSlideClick} />
    );
  }

  return (
    <Container role="region" aria-label="carousel">
      <SlideStack>
        {slides.map((slide, index) => (
          <SlideImage
            key={slide.id}
            slide={slide}
            index={index}
            currentIndex={currentIndex}
            totalSlides={slides.length}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onSlideClick={handleSlideClick}
            hasMoved={hasMoved}
          />
        ))}
      </SlideStack>
    </Container>
  );
};

export default Carousel;

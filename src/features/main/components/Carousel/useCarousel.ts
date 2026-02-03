import { useState, useRef, useCallback, useEffect } from 'react';

export const useSlideTransition = (totalSlides: number) => {
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

export const useAutoSlide = (
  goToNext: () => void,
  isEnabled: boolean = true,
) => {
  const SLIDE_DELAY_MS = 5000;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (!isEnabled) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(goToNext, SLIDE_DELAY_MS);
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

export const useDragDetection = () => {
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

  return { hasMoved, handleDragStart, handleDrag, handleDragEnd };
};

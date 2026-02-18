import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import { BANNER_CONFIG } from '@/features/main/components/HeroBanner/constants';

const calculateTrackX = (index: number, containerWidth: number) => {
  const centerOffset = containerWidth / 2 - BANNER_CONFIG.SLIDE_WIDTH / 2;
  return (
    centerOffset - index * (BANNER_CONFIG.SLIDE_WIDTH + BANNER_CONFIG.SLIDE_GAP)
  );
};

export const useHeroBanner = (
  totalSlides: number,
  autoPlay: boolean = true,
) => {
  const [displayIndex, setDisplayIndex] = useState(BANNER_CONFIG.CLONE_COUNT);
  const [isAnimating, setIsAnimating] = useState(false);

  const displayIndexRef = useRef(BANNER_CONFIG.CLONE_COUNT);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidthRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartXRef = useRef(0);
  const dragDeltaXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const baseTrackXRef = useRef(0);
  const isJumpingRef = useRef(false);

  const setTrackPosition = useCallback((index: number, animate: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(${calculateTrackX(index, containerWidthRef.current)}px)`;
    if (animate) {
      track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
      track.style.transition = 'none';
    }
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return undefined;

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        containerWidthRef.current = entry.contentRect.width;
        setTrackPosition(displayIndexRef.current, false);
      });
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [setTrackPosition]);

  const jumpTo = useCallback(
    (index: number) => {
      isJumpingRef.current = true;

      displayIndexRef.current = index;
      setDisplayIndex(index);
      setTrackPosition(index, false);

      requestAnimationFrame(() => {
        isJumpingRef.current = false;
        setIsAnimating(false);
      });
    },
    [setTrackPosition],
  );

  const slideTo = useCallback(
    (targetIndex: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      displayIndexRef.current = targetIndex;
      setDisplayIndex(targetIndex);
      setTrackPosition(targetIndex, true);

      let resetIndex: number | null = null;
      if (targetIndex >= totalSlides + BANNER_CONFIG.CLONE_COUNT) {
        resetIndex = targetIndex - totalSlides;
      } else if (targetIndex < BANNER_CONFIG.CLONE_COUNT) {
        resetIndex = targetIndex + totalSlides;
      }

      if (resetIndex !== null) {
        setTimeout(() => jumpTo(resetIndex!), BANNER_CONFIG.TRACK_DURATION_MS);
      } else {
        setTimeout(
          () => setIsAnimating(false),
          BANNER_CONFIG.TRACK_DURATION_MS,
        );
      }
    },
    [totalSlides, isAnimating, jumpTo, setTrackPosition],
  );

  const goToNext = useCallback(() => {
    if (totalSlides <= 1) return;
    slideTo(displayIndexRef.current + 1);
  }, [totalSlides, slideTo]);

  const goToPrev = useCallback(() => {
    if (totalSlides <= 1) return;
    slideTo(displayIndexRef.current - 1);
  }, [totalSlides, slideTo]);

  const startTimer = useCallback(() => {
    if (!autoPlay || totalSlides <= 1) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goToNext, BANNER_CONFIG.SLIDE_DELAY_MS);
  }, [goToNext, autoPlay, totalSlides]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    startTimer();
  }, [stopTimer, startTimer]);

  useEffect(() => {
    if (autoPlay) startTimer();
    return stopTimer;
  }, [startTimer, stopTimer, autoPlay]);

  const getSlideStyle = useCallback(
    (index: number) => {
      const isCenter = index === displayIndex;
      const transitionStyle = isJumpingRef.current ? 'none' : 'all 0.4s ease';

      return {
        width: isCenter
          ? BANNER_CONFIG.SLIDE_WIDTH
          : BANNER_CONFIG.SLIDE_WIDTH - 40,
        height: isCenter ? 310 : 280,
        opacity: isCenter ? 1 : 0.6,
        transition: transitionStyle,
      };
    },
    [displayIndex],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isAnimating) return;
      isDraggingRef.current = true;
      dragStartXRef.current = e.clientX;
      dragDeltaXRef.current = 0;
      baseTrackXRef.current = calculateTrackX(
        displayIndexRef.current,
        containerWidthRef.current,
      );
      stopTimer();

      const track = trackRef.current;
      if (track) {
        track.style.transition = 'none';
      }
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [isAnimating, stopTimer],
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    dragDeltaXRef.current = e.clientX - dragStartXRef.current;

    const track = trackRef.current;
    if (track) {
      track.style.transform = `translateX(${baseTrackXRef.current + dragDeltaXRef.current}px)`;
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const delta = dragDeltaXRef.current;
    if (Math.abs(delta) > BANNER_CONFIG.SWIPE_THRESHOLD) {
      if (delta < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    } else {
      setTrackPosition(displayIndexRef.current, true);
    }

    resetTimer();
  }, [goToNext, goToPrev, setTrackPosition, resetTimer]);

  return {
    containerRef,
    trackRef,
    displayIndex,
    getSlideStyle,
    goToNext,
    goToPrev,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};

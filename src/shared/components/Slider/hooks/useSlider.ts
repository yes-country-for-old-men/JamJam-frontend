import { useState, useCallback } from 'react';

export interface SliderRange {
  start: number;
  end: number;
}

interface UseSliderProps {
  min: number;
  max: number;
  step?: number;
  value: SliderRange;
  onChange: (value: SliderRange) => void;
}

export const useSlider = ({
  min,
  max,
  step = 1,
  value,
  onChange,
}: UseSliderProps) => {
  const [isDragging, setIsDragging] = useState<'start' | 'end' | null>(null);

  const handleMouseDown = useCallback((type: 'start' | 'end') => {
    setIsDragging(type);
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent, sliderRect: DOMRect) => {
      if (!isDragging) return;

      const percentage = Math.max(
        0,
        Math.min(1, (event.clientX - sliderRect.left) / sliderRect.width),
      );
      const rawValue = min + percentage * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      if (isDragging === 'start') {
        const newStart = Math.min(clampedValue, value.end - step);
        onChange({ ...value, start: newStart });
      } else if (isDragging === 'end') {
        const newEnd = Math.max(clampedValue, value.start + step);
        onChange({ ...value, end: newEnd });
      }
    },
    [isDragging, min, max, step, value, onChange],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  const getPosition = useCallback(
    (val: number) => {
      return ((val - min) / (max - min)) * 100;
    },
    [min, max],
  );

  return {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    getPosition,
  };
};

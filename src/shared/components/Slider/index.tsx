import React, { useRef, useEffect } from 'react';
import {
  useSlider,
  type SliderRange,
} from '@/shared/components/Slider/hooks/useSlider';
import * as S from './Slider.styles';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: SliderRange;
  onChange: (value: SliderRange) => void;
  labels?: string[];
}

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  labels,
}) => {
  const {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    getPosition,
  } = useSlider({ min, max, step, value, onChange });

  const sliderRef = useRef<HTMLDivElement>(null);

  const startPosition = getPosition(value.start);
  const endPosition = getPosition(value.end);
  const trackWidth = endPosition - startPosition;

  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        handleMouseMove(event, rect);
      }
    };

    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <>
      <S.SliderContainer ref={sliderRef}>
        <S.SliderTrack left={startPosition} width={trackWidth} />
        <S.SliderHandle
          position={startPosition}
          isDragging={isDragging === 'start'}
          onMouseDown={() => handleMouseDown('start')}
        />
        <S.SliderHandle
          position={endPosition}
          isDragging={isDragging === 'end'}
          onMouseDown={() => handleMouseDown('end')}
        />
      </S.SliderContainer>
      {labels && (
        <S.SliderLabels>
          {labels.map((labelValue) => (
            <S.SliderLabel key={labelValue}>{labelValue}</S.SliderLabel>
          ))}
        </S.SliderLabels>
      )}
    </>
  );
};

export default Slider;

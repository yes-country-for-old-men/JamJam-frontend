import React, { useRef, useEffect } from 'react';
import useSlider, {
  type SliderRange,
} from '@components/Slider/hooks/useSlider';
import styled from '@emotion/styled';

const SliderContainer = styled.div`
  position: relative;
  height: 8px;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 4px;
  margin: 0 16px;
`;

const SliderTrack = styled.div<{ left: number; width: number }>`
  position: absolute;
  left: ${(props) => props.left}%;
  width: ${(props) => props.width}%;
  height: 100%;
  background-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  border-radius: 4px;
`;

const SliderHandle = styled.div<{ position: number; isDragging: boolean }>`
  position: absolute;
  top: -6px;
  left: ${(props) => props.position}%;
  width: 20px;
  height: 20px;
  background-color: white;
  border: 3px solid ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  border-radius: 50%;
  cursor: pointer;
  transform: translateX(-50%);
  transition: ${(props) => (props.isDragging ? 'none' : 'all 0.2s ease')};

  &:hover {
    transform: translateX(-50%) scale(1.1);
  }
`;

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const SliderLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

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
      <SliderContainer ref={sliderRef}>
        <SliderTrack left={startPosition} width={trackWidth} />
        <SliderHandle
          position={startPosition}
          isDragging={isDragging === 'start'}
          onMouseDown={() => handleMouseDown('start')}
        />
        <SliderHandle
          position={endPosition}
          isDragging={isDragging === 'end'}
          onMouseDown={() => handleMouseDown('end')}
        />
      </SliderContainer>
      {labels && (
        <SliderLabels>
          {labels.map((labelValue) => (
            <SliderLabel key={labelValue}>{labelValue}</SliderLabel>
          ))}
        </SliderLabels>
      )}
    </>
  );
};

export default Slider;

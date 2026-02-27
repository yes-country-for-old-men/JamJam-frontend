import React from 'react';
import * as S from './StepIndicator.styles';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <S.Container>
      {Array.from({ length: totalSteps }, (_, index) => (
        <S.StepDot key={index} active={currentStep >= index + 1} />
      ))}
    </S.Container>
  );
};

export default StepIndicator;

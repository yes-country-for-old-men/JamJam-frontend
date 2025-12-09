import React from 'react';
import styled from '@emotion/styled';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StepDot = styled.div<{ active: boolean }>`
  width: 40px;
  height: 4px;
  background-color: ${(props) =>
    props.active
      ? props.theme.COLORS.MAIN.PRIMARY
      : props.theme.COLORS.GRAY[3]};
  border-radius: 2px;
  margin: 0 4px;
  transition: all 0.3s ease;
`;

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <Container>
      {Array.from({ length: totalSteps }, (_, index) => (
        <StepDot key={index} active={currentStep >= index + 1} />
      ))}
    </Container>
  );
};

export default StepIndicator;

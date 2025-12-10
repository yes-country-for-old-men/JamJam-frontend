import styled from '@emotion/styled';

export const SliderContainer = styled.div`
  position: relative;
  height: 8px;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 4px;
  margin: 0 16px;
`;

export const SliderTrack = styled.div<{ left: number; width: number }>`
  position: absolute;
  left: ${(props) => props.left}%;
  width: ${(props) => props.width}%;
  height: 100%;
  background-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  border-radius: 4px;
`;

export const SliderHandle = styled.div<{
  position: number;
  isDragging: boolean;
}>`
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

export const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

export const SliderLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

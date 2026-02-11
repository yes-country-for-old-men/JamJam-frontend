import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const StepDot = styled.div<{ active: boolean }>`
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

import styled from '@emotion/styled';

export const Container = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  gap: 8px;

  & > * {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;

export const CheckButton = styled.button<{
  size: number;
  selected: boolean;
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) =>
    props.selected ? props.theme.COLORS.MAIN.PRIMARY : 'transparent'};
  border: ${(props) =>
    props.selected ? 'none' : `2px solid ${props.theme.COLORS.GRAY[4]}`};
  border-radius: 5px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.7;
  }
`;

export const Label = styled.label<{ disabled: boolean }>`
  font-size: 14px;
  font-weight: 500;
  user-select: none;
`;

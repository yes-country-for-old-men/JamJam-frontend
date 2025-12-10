import styled from '@emotion/styled';

export const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  gap: 4px;
`;

export const SelectContainer = styled.div`
  position: relative;
`;

export const StyledSelect = styled.select<{ error?: boolean }>`
  width: 100%;
  background-color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
  box-shadow: inset 0 0 0 1px
    ${(props) =>
      props.error ? props.theme.COLORS.RED : props.theme.COLORS.GRAY[5]};
  padding: 16px 40px 16px 16px;
  transition: all 0.2s ease;
  cursor: pointer;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px
      ${(props) =>
        props.error ? props.theme.COLORS.RED : props.theme.COLORS.MAIN.PRIMARY};
  }

  &:disabled {
    background-color: ${(props) => props.theme.COLORS.GRAY[5]};
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
    cursor: not-allowed;
  }

  @supports (-webkit-touch-callout: none) {
    font-size: 16px;
  }
`;

export const DropdownIcon = styled.div<{ disabled?: boolean; error?: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 12px;
  top: 50%;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
  pointer-events: none;
`;

import React from 'react';
import styled from '@emotion/styled';

const StyledButton = styled.button<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.selected ? `${props.theme.COLORS.MAIN.SECONDARY}` : 'white'};
  border-radius: 10px;
  box-shadow: inset 0 0 0 1px
    ${(props) =>
      props.selected
        ? props.theme.COLORS.MAIN.PRIMARY
        : props.theme.COLORS.GRAY[5]};
  color: ${(props) =>
    props.selected
      ? props.theme.COLORS.MAIN.PRIMARY
      : props.theme.COLORS.LABEL.SECONDARY};
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  padding: 16px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const IconWrapper = styled.div<{ selected: boolean }>`
  line-height: 1;
  svg {
    fill: ${(props) =>
      props.selected
        ? props.theme.COLORS.MAIN.PRIMARY
        : props.theme.COLORS.LABEL.SECONDARY};
  }
`;

interface ToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  icon,
  selected = false,
  onClick,
  disabled = false,
}) => (
  <StyledButton
    selected={selected}
    onClick={onClick}
    type="button"
    disabled={disabled}
  >
    {icon && <IconWrapper selected={selected}>{icon}</IconWrapper>}
    {label}
  </StyledButton>
);

export default ToggleButton;

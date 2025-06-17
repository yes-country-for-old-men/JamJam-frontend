import React from 'react';
import styled from '@emotion/styled';

const StyledButton = styled.button<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.selected ? `${props.theme.COLORS.JAMJAM_PRIMARY[2]}` : 'white'};
  border: none;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px
    ${(props) =>
      props.selected
        ? props.theme.COLORS.JAMJAM_PRIMARY[1]
        : props.theme.COLORS.GRAY[5]};
  color: ${(props) =>
    props.selected
      ? props.theme.COLORS.JAMJAM_PRIMARY[1]
      : props.theme.COLORS.LABEL_SECONDARY};
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: inset 0 0 0 1px
      ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
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
        ? props.theme.COLORS.JAMJAM_PRIMARY[1]
        : props.theme.COLORS.LABEL_SECONDARY};
  }
`;

interface ToggleButtonProps {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
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

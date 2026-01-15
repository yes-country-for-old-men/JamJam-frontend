import React from 'react';
import * as S from './ToggleButton.styles';

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
  <S.StyledButton
    selected={selected}
    onClick={onClick}
    type="button"
    disabled={disabled}
  >
    {icon && <S.IconWrapper selected={selected}>{icon}</S.IconWrapper>}
    {label}
  </S.StyledButton>
);

export default ToggleButton;

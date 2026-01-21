import React, { useId } from 'react';
import CheckIcon from '@/shared/assets/icons/check.svg?react';
import * as S from './Checkbox.styles';

interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  size?: number;
  selected: boolean;
  label?: string;
  onClick: () => void;
}

const Checkbox = ({
  size = 20,
  selected,
  label,
  disabled = false,
  onClick,
}: CheckboxProps) => {
  const id = useId();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled) {
      e.preventDefault();
      onClick?.();
    }
  };

  const handleClick = () => {
    if (!disabled) {
      onClick?.();
    }
  };

  return (
    <S.Container disabled={disabled} onClick={handleClick}>
      <S.CheckButton
        id={id}
        role="checkbox"
        aria-checked={selected}
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-disabled={disabled}
        size={size}
        selected={selected}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      >
        {selected && <CheckIcon width={size} height={size} />}
      </S.CheckButton>
      {label && (
        <S.Label id={`${id}-label`} htmlFor={id} disabled={disabled}>
          {label}
        </S.Label>
      )}
    </S.Container>
  );
};

export default Checkbox;

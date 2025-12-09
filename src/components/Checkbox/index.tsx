import React, { useId } from 'react';
import CheckIcon from '@assets/icons/check.svg?react';
import styled from '@emotion/styled';

interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  size?: number;
  selected: boolean;
  label?: string;
  onClick: () => void;
}

const Container = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  gap: 8px;

  & > * {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;

const CheckButton = styled.button<{
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
    props.selected ? props.theme.COLORS.JAMJAM_PRIMARY[1] : 'transparent'};
  border: ${(props) =>
    props.selected ? 'none' : `2px solid ${props.theme.COLORS.GRAY[4]}`};
  border-radius: 5px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.7;
  }
`;

const Label = styled.label<{ disabled: boolean }>`
  font-size: 14px;
  font-weight: 500;
  user-select: none;
`;

const Checkbox = React.memo<CheckboxProps>(
  ({ size = 20, selected, label, disabled = false, onClick }) => {
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
      <Container disabled={disabled} onClick={handleClick}>
        <CheckButton
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
        </CheckButton>
        {label && (
          <Label id={`${id}-label`} htmlFor={id} disabled={disabled}>
            {label}
          </Label>
        )}
      </Container>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;

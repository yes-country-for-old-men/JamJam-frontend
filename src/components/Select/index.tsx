import React, { type SelectHTMLAttributes } from 'react';
import ArrowDownIcon from '@assets/icons/arrow-down.svg?react';
import RequiredIcon from '@assets/icons/required.svg?react';
import styled from '@emotion/styled';
import theme from '@styles/theme';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  error?: boolean;
}

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  gap: 4px;
`;

const SelectContainer = styled.div`
  position: relative;
`;

const StyledSelect = styled.select<{ error?: boolean }>`
  width: 100%;
  background-color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.COLORS.LABEL_PRIMARY};
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
        props.error
          ? props.theme.COLORS.RED
          : props.theme.COLORS.JAMJAM_PRIMARY[1]};
  }

  &:disabled {
    background-color: ${(props) => props.theme.COLORS.GRAY[5]};
    color: ${(props) => props.theme.COLORS.LABEL_TERTIARY};
    cursor: not-allowed;
  }

  @supports (-webkit-touch-callout: none) {
    font-size: 16px;
  }
`;

const DropdownIcon = styled.div<{ disabled?: boolean; error?: boolean }>`
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

const Select = React.memo<SelectProps>(
  ({
    id,
    label,
    style,
    required = false,
    error = false,
    disabled = false,
    className,
    children,
    ...rest
  }) => {
    return (
      <SelectGroup>
        {label && (
          <Label htmlFor={id}>
            {label}
            {required && <RequiredIcon />}
          </Label>
        )}
        <SelectContainer>
          <StyledSelect
            id={id}
            style={style}
            required={required}
            error={error}
            disabled={disabled}
            className={className}
            aria-required={required}
            aria-invalid={error}
            {...rest}
          >
            {children}
          </StyledSelect>
          <DropdownIcon disabled={disabled} error={error}>
            <ArrowDownIcon
              fill={theme.COLORS.LABEL_SECONDARY}
              width={12}
              height={12}
            />
          </DropdownIcon>
        </SelectContainer>
      </SelectGroup>
    );
  },
);

Select.displayName = 'Select';

export default Select;

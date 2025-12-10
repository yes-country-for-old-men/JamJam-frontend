import React, { type SelectHTMLAttributes } from 'react';
import ArrowDownIcon from '@assets/icons/arrow-down.svg?react';
import RequiredIcon from '@assets/icons/required.svg?react';
import theme from '@styles/theme';
import * as S from './Select.styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  error?: boolean;
}

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
      <S.SelectGroup>
        {label && (
          <S.Label htmlFor={id}>
            {label}
            {required && <RequiredIcon />}
          </S.Label>
        )}
        <S.SelectContainer>
          <S.StyledSelect
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
          </S.StyledSelect>
          <S.DropdownIcon disabled={disabled} error={error}>
            <ArrowDownIcon
              fill={theme.COLORS.LABEL.SECONDARY}
              width={12}
              height={12}
            />
          </S.DropdownIcon>
        </S.SelectContainer>
      </S.SelectGroup>
    );
  },
);

Select.displayName = 'Select';

export default Select;

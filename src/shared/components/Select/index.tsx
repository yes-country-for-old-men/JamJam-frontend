import { type SelectHTMLAttributes } from 'react';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg?react';
import RequiredIcon from '@/shared/assets/icons/required.svg?react';
import theme from '@/shared/styles/theme';
import * as S from './Select.styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  error?: boolean;
}

const Select = ({
  id,
  label,
  style,
  required = false,
  error = false,
  disabled = false,
  className,
  children,
  ...rest
}: SelectProps) => {
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
};

export default Select;

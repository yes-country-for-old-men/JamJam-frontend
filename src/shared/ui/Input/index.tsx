import React, { useState } from 'react';
import InvisibleIcon from '@/shared/assets/icons/invisible.svg?react';
import RequiredIcon from '@/shared/assets/icons/required.svg?react';
import VisibleIcon from '@/shared/assets/icons/visible.svg?react';
import * as S from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
  error?: string;
}

const Input = ({
  id,
  label,
  style,
  required = false,
  className,
  showPasswordToggle = false,
  type,
  error,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputType = () => {
    if (showPasswordToggle && type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  const shouldShowToggle = showPasswordToggle && type === 'password';

  return (
    <S.InputGroup>
      {label && (
        <S.Label htmlFor={id}>
          {label}
          {required && <RequiredIcon />}
        </S.Label>
      )}
      <S.InputContainer>
        <S.StyledInput
          id={id}
          style={style}
          required={required}
          type={getInputType()}
          hasToggle={shouldShowToggle}
          className={className}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        {shouldShowToggle && (
          <S.PasswordToggleIcon
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {showPassword ? (
              <InvisibleIcon width={16} height={16} />
            ) : (
              <VisibleIcon width={16} height={16} />
            )}
          </S.PasswordToggleIcon>
        )}
      </S.InputContainer>
      {error && <S.ErrorMessage id={`${id}-error`}>{error}</S.ErrorMessage>}
    </S.InputGroup>
  );
};

export default Input;

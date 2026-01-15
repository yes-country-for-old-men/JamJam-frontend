import React from 'react';
import * as S from './Button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const Button = React.memo<ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    type = 'button',
    disabled = false,
    className,
    ...rest
  }) => {
    return (
      <S.StyledButton
        type={type}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        className={className}
        {...rest}
      >
        {children}
      </S.StyledButton>
    );
  },
);

Button.displayName = 'Button';

export default Button;

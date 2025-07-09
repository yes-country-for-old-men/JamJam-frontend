import React, { useState } from 'react';
import styled from '@emotion/styled';
import RequiredIcon from '@assets/icons/required.svg?react';
import VisibleIcon from '@assets/icons/visible.svg?react';
import InvisibleIcon from '@assets/icons/invisible.svg?react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
}

const InputGroup = styled.div`
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

const InputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input<{ hasToggle?: boolean }>`
  padding: ${(props) => (props.hasToggle ? '16px 40px 16px 16px' : '16px')};
  border: none;
  border-radius: 10px;
  font-size: 14px;
  box-shadow: inset 0 0 0 1px ${(props) => props.theme.COLORS.GRAY[5]};
  transition: all 0.2s ease;
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px
      ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
  }

  &:disabled {
    background-color: ${(props) => props.theme.COLORS.GRAY[5]};
    color: ${(props) => props.theme.COLORS.LABEL_TERTIARY};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL_TERTIARY};
  }
`;

const PasswordToggleIcon = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.COLORS.LABEL_TERTIARY};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  width: 24px;
  height: 24px;
`;

const Input: React.FC<InputProps> = ({
  id,
  label,
  style,
  required = false,
  className,
  showPasswordToggle = false,
  type,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputType = () => {
    if (showPasswordToggle && type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  const shouldShowToggle = showPasswordToggle && type === 'password';

  return (
    <InputGroup>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <RequiredIcon />}
        </Label>
      )}
      <InputContainer>
        <StyledInput
          id={id}
          style={style}
          required={required}
          type={getInputType()}
          hasToggle={shouldShowToggle}
          className={className}
          {...rest}
        />
        {shouldShowToggle && (
          <PasswordToggleIcon
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <InvisibleIcon width={16} height={16} />
            ) : (
              <VisibleIcon width={16} height={16} />
            )}
          </PasswordToggleIcon>
        )}
      </InputContainer>
    </InputGroup>
  );
};

export default Input;

import React from 'react';
import styled from '@emotion/styled';
import RequiredIcon from '@assets/icons/required.svg?react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
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
  color: ${(props) => props.theme.COLORS.LABEL_PRIMARY};
  gap: 4px;
`;

const StyledInput = styled.input`
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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

const Input: React.FC<InputProps> = ({
  id,
  label,
  required = false,
  className,
  ...rest
}) => {
  return (
    <InputGroup className={className}>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <RequiredIcon />}
        </Label>
      )}
      <StyledInput id={id} required={required} {...rest} />
    </InputGroup>
  );
};

export default Input;

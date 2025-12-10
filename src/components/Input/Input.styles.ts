import styled from '@emotion/styled';

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  gap: 4px;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const StyledInput = styled.input<{ hasToggle?: boolean }>`
  padding: ${(props) => (props.hasToggle ? '16px 40px 16px 16px' : '16px')};
  border: none;
  border-radius: 10px;
  font-size: 14px;
  box-shadow: inset 0 0 0 1px ${(props) => props.theme.COLORS.GRAY[5]};
  transition: all 0.2s ease;
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }

  &:disabled {
    background-color: ${(props) => props.theme.COLORS.GRAY[5]};
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

export const PasswordToggleIcon = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  width: 24px;
  height: 24px;
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.COLORS.RED};
  margin-top: 4px;
`;

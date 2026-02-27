import styled from '@emotion/styled';

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
`;

export const RadioInput = styled.input`
  accent-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
  resize: vertical;

  &:focus {
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const ButtonWrapper = styled.div`
  flex: 1;
`;

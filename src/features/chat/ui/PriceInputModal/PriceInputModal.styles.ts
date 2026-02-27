import styled from '@emotion/styled';

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Description = styled.div`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  white-space: pre-line;
`;

export const PriceInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;

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

import styled from '@emotion/styled';

export const Section = styled.section`
  margin-bottom: 36px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 240px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  padding: 16px;
  box-shadow: inset 0 0 0 1px ${(props) => props.theme.COLORS.GRAY[5]};
  resize: none;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

export const CharacterCounter = styled.div`
  text-align: right;
  font-size: 13px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin: 4px 4px 0 0;
`;

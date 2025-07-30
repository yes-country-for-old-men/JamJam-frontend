import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const CompletionIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const CompletionPrompt = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  margin: 0;
  line-height: 1.6;
  white-space: pre-line;
`;

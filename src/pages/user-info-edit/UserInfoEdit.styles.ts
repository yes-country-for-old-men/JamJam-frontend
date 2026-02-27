import styled from '@emotion/styled';

export const Container = styled.article`
  width: 840px;
  height: 100%;
`;

export const PasswordCheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100%;
  margin: auto;
`;

export const PasswordCheckTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin: 20px 0 8px 0;
`;

export const PasswordCheckPrompt = styled.div`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
`;

export const ContentSection = styled.section`
  margin-bottom: 48px;
`;

export const SectionHeader = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const FieldGroup = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

export const FieldLabel = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const InvalidMessage = styled.div`
  color: ${(props) => props.theme.COLORS.RED};
  font-size: 12px;
  margin: 4px 0 0 4px;
`;

export const SuccessMessage = styled.div`
  color: ${(props) => props.theme.COLORS.GREEN};
  font-size: 12px;
  margin: 4px 0 0 4px;
`;

export const InfoMessage = styled.div`
  color: ${(props) => props.theme.COLORS.GRAY[6]};
  font-size: 12px;
  margin: 4px 0 0 4px;
`;

export const FlexInputGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export const FlexInputWrapper = styled.div`
  flex: 1;
`;

export const ActionButtonWrapper = styled.div`
  width: 100px;
`;

export const SubmitButtonArea = styled.div`
  position: sticky;
  display: flex;
  bottom: 0;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  padding: 24px 0;
  margin-bottom: -24px;
`;

export const TimerText = styled.span`
  font-weight: 600;
`;

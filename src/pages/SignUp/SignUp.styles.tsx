import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100dvh;
  padding: 72px 16px 24px 16px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 90dvw;
  max-width: 420px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 36px;
  margin-bottom: 36px;
`;

export const LogoButton = styled.button``;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.4;
  white-space: pre-line;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
`;

export const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
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

export const InputWrapper = styled.div`
  position: relative;
`;

export const DateInputContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
`;

export const IdInputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export const IdInput = styled.div`
  flex: 1;
`;

export const NicknameInputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export const NicknameInput = styled.div`
  flex: 1;
`;

export const PhoneInputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export const PhoneInput = styled.div`
  flex: 1;
`;

export const ButtonWrapper = styled.div`
  width: 100px;
`;

export const NavigationButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 420px;
  gap: 12px;
  padding-top: 24px;
`;

export const GenderToggleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const CountdownText = styled.span`
  font-weight: 600;
`;

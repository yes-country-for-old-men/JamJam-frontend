import styled from '@emotion/styled';

export const Container = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin: 24px 0 4px 0;
`;

export const Description = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  text-align: center;
  margin-bottom: 20px;
`;

export const NavigationButtonsWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

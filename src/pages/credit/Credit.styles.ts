import styled from '@emotion/styled';

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  width: 840px;
  height: 100%;
`;

export const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
`;

export const CreditCard = styled.div`
  border-radius: 16px;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  padding: 32px;
  margin-bottom: 16px;
`;

export const CreditCardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const CreditAmount = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const AmountText = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
`;

export const Unit = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin-left: 8px;
`;

export const CreditButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const FilterSection = styled.div`
  width: 120px;
`;

export const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
`;

export const TransactionHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 16px 4px;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[4]};
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
`;

export const TransactionItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 16px 4px;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  align-items: center;

  :last-of-type {
    border-bottom: none;
  }
`;

export const TransactionDate = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
`;

export const TransactionDescription = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

export const TransactionAmount = styled.div<{ isPositive: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ isPositive, theme }) =>
    isPositive ? theme.COLORS.GREEN : theme.COLORS.RED};
`;

export const NoResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 80px 24px;
  font-size: 16px;
  color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
`;

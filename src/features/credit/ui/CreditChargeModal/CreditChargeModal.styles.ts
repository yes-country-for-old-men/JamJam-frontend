import styled from '@emotion/styled';
import Input from '@/shared/ui/Input';

export const CreditChargeForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const AmountInputField = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0 16px 0;
`;

export const AmountInput = styled(Input)`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;

  &::placeholder {
    font-weight: 500;
  }
`;

export const QuickAmountButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 8px;
`;

export const QuickAmountButton = styled.button`
  width: 100%;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  padding: 10px 0;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  }
`;

export const InfoNotification = styled.div`
  font-size: 11px;
  font-weight: 300;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  line-height: 1.4;
  margin-bottom: 16px;
`;

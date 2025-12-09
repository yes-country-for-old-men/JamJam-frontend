import Button from '@components/Button';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
`;

export const PageButton = styled(Button)<{ isActive?: boolean }>`
  padding: 12px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.COLORS.MAIN.PRIMARY : 'transparent'};
  color: ${({ isActive, theme }) =>
    isActive ? 'white' : theme.COLORS.LABEL.PRIMARY};

  &:hover {
    background-color: ${({ isActive, theme }) =>
      isActive ? theme.COLORS.MAIN.PRIMARY : theme.COLORS.GRAY[6]};
  }
`;

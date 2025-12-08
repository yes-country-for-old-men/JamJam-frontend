import styled from '@emotion/styled';
import Button from '@components/Button';

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
    isActive ? theme.COLORS.JAMJAM_PRIMARY[1] : 'transparent'};
  color: ${({ isActive, theme }) =>
    isActive ? 'white' : theme.COLORS.LABEL_PRIMARY};

  &:hover {
    background-color: ${({ isActive, theme }) =>
      isActive ? theme.COLORS.JAMJAM_PRIMARY[1] : theme.COLORS.GRAY[6]};
  }
`;

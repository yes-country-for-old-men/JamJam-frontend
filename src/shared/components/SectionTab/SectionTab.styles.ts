import styled from '@emotion/styled';
import { Z_INDEX } from '@/shared/constants';

export const TabContainer = styled.nav`
  position: sticky;
  display: flex;
  top: 80px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  z-index: ${Z_INDEX.BASE};
`;

export const TabButton = styled.button<{ active: boolean }>`
  background-color: transparent;
  border-bottom: 2.5px solid
    ${({ theme, active }) =>
      active ? theme.COLORS.MAIN.PRIMARY : 'transparent'};
  color: ${({ theme, active }) =>
    active ? theme.COLORS.LABEL.PRIMARY : theme.COLORS.LABEL.SECONDARY};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  padding: 16px 32px;
`;

export const ContentContainer = styled.div`
  padding: 28px 8px;
`;

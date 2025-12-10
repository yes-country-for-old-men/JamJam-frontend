import { Z_INDEX } from '@constants/index';
import styled from '@emotion/styled';

export const Container = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  z-index: ${Z_INDEX.HEADER};
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

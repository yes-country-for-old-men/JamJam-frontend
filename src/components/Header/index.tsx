import { Z_INDEX } from '@constants/index';
import styled from '@emotion/styled';
import HeaderAuth from './HeaderAuth';
import HeaderLogo from './HeaderLogo';

const Container = styled.header`
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

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <Container>
      <ContentWrapper>
        <HeaderContent>
          <HeaderLogo />
        </HeaderContent>
        <HeaderAuth />
      </ContentWrapper>
    </Container>
  );
};

export default Header;

import * as S from './Header.styles';
import HeaderAuth from './HeaderAuth';
import HeaderLogo from './HeaderLogo';

const Header = () => {
  return (
    <S.Container>
      <S.ContentWrapper>
        <S.HeaderContent>
          <HeaderLogo />
        </S.HeaderContent>
        <HeaderAuth />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Header;

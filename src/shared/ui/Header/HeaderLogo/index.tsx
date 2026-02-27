import { useNavigate } from 'react-router-dom';
import LogoSVG from '@/shared/assets/icons/logo-icon.svg?react';
import * as S from './HeaderLogo.styles';

const HeaderLogo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <S.LogoButton onClick={handleLogoClick}>
      <LogoSVG />
    </S.LogoButton>
  );
};

export default HeaderLogo;

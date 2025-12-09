import LogoSVG from '@assets/logo.svg?react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const LogoButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
`;

const HeaderLogo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <LogoButton onClick={handleLogoClick}>
      <LogoSVG />
    </LogoButton>
  );
};

export default HeaderLogo;

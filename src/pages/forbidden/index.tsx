import { useNavigate } from 'react-router-dom';
import ForbiddenIcon from '@/shared/assets/icons/forbidden.svg?react';
import Button from '@/shared/ui/Button';
import * as S from './Forbidden.styles';

const Forbidden = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <S.Container>
      <ForbiddenIcon />
      <S.Title>접근 권한이 없습니다</S.Title>
      <S.Description>이 페이지에 접근할 권한이 없습니다.</S.Description>
      <S.NavigationButtonsWrapper>
        <Button variant="outline" onClick={handleGoBack}>
          이전 페이지로
        </Button>
        <Button onClick={handleGoHome}>메인 페이지로</Button>
      </S.NavigationButtonsWrapper>
    </S.Container>
  );
};

export default Forbidden;

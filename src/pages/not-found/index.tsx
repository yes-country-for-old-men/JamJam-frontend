import { useNavigate } from 'react-router-dom';
import NotFoundIcon from '@/shared/assets/icons/not-found.svg?react';
import Button from '@/shared/ui/Button';
import * as S from './NotFound.styles';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <S.Container>
      <NotFoundIcon />
      <S.Title>페이지를 표시할 수 없습니다</S.Title>
      <S.Description>요청하신 페이지를 찾을 수 없습니다.</S.Description>
      <S.NavigationButtonsWrapper>
        <Button variant="outline" onClick={handleGoBack}>
          이전 페이지로
        </Button>
        <Button onClick={handleGoHome}>메인 페이지로</Button>
      </S.NavigationButtonsWrapper>
    </S.Container>
  );
};

export default NotFound;

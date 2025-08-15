import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import ForbiddenIcon from '@assets/icons/forbidden.svg?react';

const Container = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin: 24px 0 4px 0;
`;

const Description = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  text-align: center;
  margin-bottom: 20px;
`;

const NavigationButtonsWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const Forbidden = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Container>
      <ForbiddenIcon />
      <Title>접근 권한이 없습니다</Title>
      <Description>이 페이지에 접근할 권한이 없습니다.</Description>
      <NavigationButtonsWrapper>
        <Button variant="outline" onClick={handleGoBack}>
          이전 페이지로
        </Button>
        <Button onClick={handleGoHome}>메인 페이지로</Button>
      </NavigationButtonsWrapper>
    </Container>
  );
};

export default Forbidden;

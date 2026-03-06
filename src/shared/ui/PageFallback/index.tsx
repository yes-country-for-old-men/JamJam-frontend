import styled from '@emotion/styled';
import Spinner from '@/shared/ui/Spinner';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100dvh;
`;

const PageFallback = () => (
  <Container>
    <Spinner />
  </Container>
);

export default PageFallback;

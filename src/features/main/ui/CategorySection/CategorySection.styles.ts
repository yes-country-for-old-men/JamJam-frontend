import styled from '@emotion/styled';

export const Container = styled.section`
  width: 1200px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const Title = styled.h2`
  font-size: 21px;
  font-weight: 700;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;

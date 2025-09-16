import styled from '@emotion/styled';

export const Container = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  min-width: max-content;
  overflow-x: auto;
`;

export const SearchSection = styled.section`
  width: 100%;
  max-width: 560px;
  transform: scale(0.9);
  margin-bottom: 20px;
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  padding: 0 24px;
  width: 100%;
`;

export const CategoryHeader = styled.header`
  width: 100%;
  margin-bottom: 28px;
`;

export const CategoryTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  text-align: start;
`;

export const ServicesSection = styled.section``;

export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 36px;
  margin-bottom: 40px;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px;
`;

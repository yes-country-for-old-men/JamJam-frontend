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

export const SearchHeader = styled.header`
  width: 100%;
  margin-bottom: 28px;
`;

export const SearchTitle = styled.div`
  font-size: 21px;
  font-weight: 600;
`;

export const SearchKeyword = styled.span`
  color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
  font-weight: 700;
`;

export const ResultsSection = styled.section``;

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

export const NoResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${(props) => props.theme.COLORS.LABEL_TERTIARY};
  font-size: 18px;
  padding: 80px 24px;
`;

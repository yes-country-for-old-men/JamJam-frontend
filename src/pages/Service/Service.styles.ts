import styled from '@emotion/styled';

export const Container = styled.main`
  display: flex;
  width: 1200px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  gap: 36px;
  padding: 0 24px;
  margin: 0 auto;
`;

export const MainContent = styled.article`
  width: 840px;
`;

export const InfoSection = styled.section`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const PortfolioGridContainer = styled.div`
  position: relative;
`;

export const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(177, 177, 177, 0.5);
  border: 0.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: 1;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  & svg {
    opacity: 0.9;
  }

  &:hover {
    background-color: rgba(177, 177, 177, 0.8);
    border-color: rgba(255, 255, 255, 0.4);

    & svg {
      opacity: 1;
    }
  }

  &.prev {
    left: 16px;
  }

  &.next {
    right: 16px;
  }
`;

export const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export const PortfolioItem = styled.div`
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 8px;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
`;

export const PortfolioImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

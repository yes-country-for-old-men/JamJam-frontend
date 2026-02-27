import React, { useState } from 'react';
import { type ServiceDetailContent } from '@/features/service/api/serviceApi';
import * as S from '@/pages/service-detail/Service.styles';
import LeftIcon from '@/shared/assets/icons/left.svg?react';
import RightIcon from '@/shared/assets/icons/right.svg?react';

interface PortfolioSectionProps {
  data: ServiceDetailContent;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxItemsPerPage = 4;
  const { portfolioImages } = data;
  const totalPages = Math.ceil(portfolioImages.length / maxItemsPerPage);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentImages = portfolioImages.slice(
    currentIndex * maxItemsPerPage,
    (currentIndex + 1) * maxItemsPerPage,
  );

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < totalPages - 1;

  return (
    <S.InfoSection>
      <S.SectionTitle>포트폴리오</S.SectionTitle>
      <S.PortfolioGridContainer>
        {portfolioImages.length > maxItemsPerPage && canGoPrevious && (
          <S.NavigationButton className="prev" onClick={handlePrevious}>
            <LeftIcon />
          </S.NavigationButton>
        )}
        {portfolioImages.length > maxItemsPerPage && canGoNext && (
          <S.NavigationButton className="next" onClick={handleNext}>
            <RightIcon />
          </S.NavigationButton>
        )}
        <S.PortfolioGrid>
          {currentImages.map((image) => (
            <S.PortfolioItem key={image.id}>
              <S.PortfolioImage
                src={image.url}
                alt={`포트폴리오 ${image.id}`}
              />
            </S.PortfolioItem>
          ))}
        </S.PortfolioGrid>
      </S.PortfolioGridContainer>
    </S.InfoSection>
  );
};

export default PortfolioSection;

import React from 'react';
import styled from '@emotion/styled';

interface ServiceCardProps {
  name: string;
  minPrice: number;
  thumbnailUrl?: string;
  providerName: string;
}

const Container = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: start;
  letter-spacing: -0.025em;
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 12px 4px;
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 16px;
  overflow: hidden;
`;

const ThumbnailImage = styled.img`
  width: calc((1200px - 36px * 3) / 4);
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
`;

const ServiceName = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const MinimumPrice = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const ProviderName = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
`;

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  thumbnailUrl,
  minPrice,
  providerName,
}) => {
  return (
    <Container>
      <ThumbnailWrapper>
        <ThumbnailImage src={thumbnailUrl} alt={name} />
      </ThumbnailWrapper>
      <ContentSection>
        <ServiceName>{name}</ServiceName>
        <MinimumPrice>{minPrice.toLocaleString()}원 ~</MinimumPrice>
        <ProviderName>{providerName}</ProviderName>
      </ContentSection>
    </Container>
  );
};

export default ServiceCard;

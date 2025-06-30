import React from 'react';
import styled from '@emotion/styled';

interface ServiceCardProps {
  name: string;
  minPrice: number;
  thumbnailUrl?: string;
  providerName: string;
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: start;
  line-height: 1.2;
  cursor: pointer;
`;

const ThumbnailSection = styled.figure`
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 12px 4px;
`;

const ServiceName = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const PriceInfo = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const ProviderInfo = styled.span`
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
      <ThumbnailSection>
        <ThumbnailImage src={thumbnailUrl} alt={name} />
      </ThumbnailSection>
      <ContentSection>
        <ServiceName>{name}</ServiceName>
        <PriceInfo>{minPrice.toLocaleString()}원 ~</PriceInfo>
        <ProviderInfo>{providerName}</ProviderInfo>
      </ContentSection>
    </Container>
  );
};

export default ServiceCard;

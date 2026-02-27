import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ServiceCard.styles';

interface ServiceCardProps {
  id: number;
  name: string;
  minPrice: number;
  thumbnailUrl?: string;
  providerName?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  thumbnailUrl,
  minPrice,
  providerName,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/service/${id}`);
  };

  return (
    <S.Container onClick={handleClick}>
      <S.ThumbnailSection>
        <S.ThumbnailImage src={thumbnailUrl} alt={name} />
      </S.ThumbnailSection>
      <S.ContentSection>
        <S.ServiceName>{name}</S.ServiceName>
        <S.PriceInfo>{minPrice.toLocaleString()}원 ~</S.PriceInfo>
        <S.ProviderInfo>{providerName}</S.ProviderInfo>
      </S.ContentSection>
    </S.Container>
  );
};

export default ServiceCard;

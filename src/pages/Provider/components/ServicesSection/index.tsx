import React from 'react';
import { type ProviderDetailContent } from '@apis/provider';
import * as S from '@pages/Provider/Provider.styles';
import ServiceCard from '@components/ServiceCard';

interface ServicesSectionProps {
  data: ProviderDetailContent;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ data }) => (
  <>
    <S.SectionTitle>제공 서비스</S.SectionTitle>
    <S.ServicesGrid>
      {data.services.map((service) => (
        <ServiceCard
          key={service.serviceId}
          id={service.serviceId}
          name={service.serviceName}
          minPrice={service.salary}
          thumbnailUrl={service.thumbnailUrl}
        />
      ))}
    </S.ServicesGrid>
  </>
);

export default ServicesSection;

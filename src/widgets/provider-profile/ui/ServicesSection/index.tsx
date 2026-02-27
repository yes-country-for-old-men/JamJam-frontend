import React from 'react';
import { type ProviderDetailContent } from '@/entities/provider/api/providerApi';
import * as S from '@/pages/provider/Provider.styles';
import ServiceCard from '@/shared/ui/ServiceCard';

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

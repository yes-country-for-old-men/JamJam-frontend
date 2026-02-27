import React from 'react';
import { type ServiceDetailContent } from '@/features/service/api/serviceApi';
import * as S from '@/pages/service-detail/Service.styles';
import HTMLContent from '@/shared/components/HTMLContent';

interface ServiceInfoSectionProps {
  data: ServiceDetailContent;
}

const ServiceInfoSection: React.FC<ServiceInfoSectionProps> = ({ data }) => (
  <S.InfoSection>
    <S.SectionTitle>서비스 설명</S.SectionTitle>
    <HTMLContent content={data.description} />
  </S.InfoSection>
);

export default ServiceInfoSection;

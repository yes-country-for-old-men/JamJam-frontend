import React from 'react';
import { type ServiceDetailContent } from '@apis/service';
import HTMLContent from '@components/HTMLContent';
import * as S from '@pages/Service/Service.styles';

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

import React from 'react';
import { type ServiceDetailContent } from '@apis/service';
import Button from '@components/Button';
import * as S from '@pages/Service/components/SidePanel/SidePanel.styles';

interface ServiceSidePanelProps {
  data: ServiceDetailContent;
  onOrderClick: () => void;
}

const SidePanel: React.FC<ServiceSidePanelProps> = ({ data, onOrderClick }) => (
  <S.Container>
    <S.ThumbnailWrapper>
      <S.ThumbnailImage src={data.thumbnail} alt={data.serviceName} />
    </S.ThumbnailWrapper>
    <S.SideCard>
      <S.PriceInfo>
        <S.ServiceName>{data.serviceName}</S.ServiceName>
        <S.Price>
          {data.salary.toLocaleString()}원
          <S.PriceNote> (VAT 포함가)</S.PriceNote>
        </S.Price>
      </S.PriceInfo>
      <Button fullWidth onClick={onOrderClick}>
        서비스 의뢰
      </Button>
    </S.SideCard>
  </S.Container>
);

export default SidePanel;

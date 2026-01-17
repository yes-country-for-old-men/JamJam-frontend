import React from 'react';
import { type ServiceDetailContent } from '@/features/service/api/serviceApi';
import * as S from '@/features/service/components/ServiceDetail/SidePanel/SidePanel.styles';
import Button from '@/shared/components/Button';

interface ServiceSidePanelProps {
  data: ServiceDetailContent;
  isOwner: boolean;
  isClient: boolean;
  onOrderClick: () => void;
  onEditClick: () => void;
}

const SidePanel: React.FC<ServiceSidePanelProps> = ({
  data,
  isOwner,
  isClient,
  onOrderClick,
  onEditClick,
}) => {
  const renderActionButton = () => {
    if (isOwner) {
      return (
        <Button fullWidth onClick={onEditClick}>
          서비스 수정
        </Button>
      );
    }

    if (isClient) {
      return (
        <Button fullWidth onClick={onOrderClick}>
          서비스 의뢰
        </Button>
      );
    }

    return null;
  };

  return (
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
        {renderActionButton()}
      </S.SideCard>
    </S.Container>
  );
};

export default SidePanel;

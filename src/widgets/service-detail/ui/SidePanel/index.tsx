import React from 'react';
import { type ServiceDetailContent } from '@/entities/service/api/serviceApi';
import Button from '@/shared/components/Button';
import * as S from '@/widgets/service-detail/ui/SidePanel/SidePanel.styles';

interface ServiceSidePanelProps {
  data: ServiceDetailContent;
  isOwner: boolean;
  onOrderClick: () => void;
  onEditClick: () => void;
}

const SidePanel: React.FC<ServiceSidePanelProps> = ({
  data,
  isOwner,
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

    return (
      <Button fullWidth onClick={onOrderClick}>
        서비스 의뢰
      </Button>
    );
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

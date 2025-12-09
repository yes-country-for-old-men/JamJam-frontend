import React from 'react';
import { type ServiceDetailContent } from '@apis/service';
import LocationIcon from '@assets/icons/location.svg?react';
import UserProfileImageIcon from '@assets/icons/user-profile-image.svg?react';
import Button from '@components/Button';
import * as S from '@pages/Service/components/ServiceHeader/ServiceHeader.styles';
import { getCategoryNameById } from '@utils/dataMappers';

interface ServiceHeaderProps {
  data: ServiceDetailContent;
  onCategoryClick: () => void;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  data,
  onCategoryClick,
}) => (
  <>
    <S.CategoryLabel onClick={onCategoryClick}>
      {getCategoryNameById(data.category)}
    </S.CategoryLabel>
    <S.ServiceTitle>{data.serviceName}</S.ServiceTitle>
    <S.ProviderSection>
      <S.ProviderProfile>
        <S.ProviderImageWrapper>
          {data.profileUrl ? (
            <S.ProviderImage src={data.profileUrl} alt={data.nickName} />
          ) : (
            <UserProfileImageIcon width={64} height={64} />
          )}
        </S.ProviderImageWrapper>
        <S.ProviderInfo>
          <S.ProviderName>{data.nickName}</S.ProviderName>
          <S.ProviderLocation>
            <LocationIcon width={14} height={14} />
            {data.location}
          </S.ProviderLocation>
        </S.ProviderInfo>
      </S.ProviderProfile>
      <Button>문의하기</Button>
    </S.ProviderSection>
  </>
);

export default ServiceHeader;

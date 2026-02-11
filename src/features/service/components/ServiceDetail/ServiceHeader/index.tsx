import React from 'react';
import { type ServiceDetailContent } from '@/features/service/api/serviceApi';
import * as S from '@/features/service/components/ServiceDetail/ServiceHeader/ServiceHeader.styles';
import LocationIcon from '@/shared/assets/icons/location.svg?react';
import UserProfileImageIcon from '@/shared/assets/icons/user-profile-image.svg?react';
import Button from '@/shared/components/Button';
import { getCategoryNameById } from '@/shared/utils';

interface ServiceHeaderProps {
  data: ServiceDetailContent;
  isProvider: boolean;
  onCategoryClick: () => void;
  onInquiryClick: () => void;
  onProviderClick: () => void;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  data,
  isProvider,
  onCategoryClick,
  onInquiryClick,
  onProviderClick,
}) => (
  <>
    <S.CategoryLabel onClick={onCategoryClick}>
      {getCategoryNameById(data.category)}
    </S.CategoryLabel>
    <S.ServiceTitle>{data.serviceName}</S.ServiceTitle>
    <S.ProviderSection>
      <S.ProviderProfile onClick={onProviderClick}>
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
      {!isProvider && <Button onClick={onInquiryClick}>문의하기</Button>}
    </S.ProviderSection>
  </>
);

export default ServiceHeader;

import React from 'react';
import { type ProviderDetailContent } from '@/entities/provider/api/providerApi';
import LocationIcon from '@/shared/assets/icons/location.svg?react';
import UserProfileImageIcon from '@/shared/assets/icons/user-profile-image.svg?react';
import { getCategoryNameById } from '@/shared/utils';
import * as S from '@/widgets/provider-profile/ui/ProfileCard/ProfileCard.styles';

interface ProfileCardProps {
  data: ProviderDetailContent;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ data }) => (
  <S.Container>
    <S.ProfileImageWrapper>
      {data.profileUrl ? (
        <S.ProfileImage src={data.profileUrl} alt="profile" />
      ) : (
        <UserProfileImageIcon width={84} height={84} />
      )}
    </S.ProfileImageWrapper>
    <S.ProfileInfo>
      <S.ProfileHeader>
        <S.ProviderNickname>{data.nickname}</S.ProviderNickname>
        <S.CategoryBadge>
          {getCategoryNameById(data.categoryId)}
        </S.CategoryBadge>
      </S.ProfileHeader>
      <S.LocationInfo>
        <LocationIcon />
        {data.location}
      </S.LocationInfo>
    </S.ProfileInfo>
  </S.Container>
);

export default ProfileCard;

import React from 'react';
import { type ProviderDetailContent } from '@apis/provider';
import Button from '@components/Button';
import * as S from '@pages/Provider/components/SidePanel/SidePanel.styles';

interface SidePanelProps {
  data: ProviderDetailContent;
}

const formatContactHours = (contactHours: {
  startHour: number;
  endHour: number;
}): string => {
  if (contactHours.startHour === 0 && contactHours.endHour === 24) {
    return '24시간';
  }
  return `${contactHours.startHour}:00 - ${contactHours.endHour}:00`;
};

const SidePanel: React.FC<SidePanelProps> = ({ data }) => (
  <S.Container>
    <S.SideCardTitle>{data.nickname}</S.SideCardTitle>
    <S.StatusInfo>
      <S.StatusLabel>연락 가능 시간</S.StatusLabel>
      <S.StatusValue>{formatContactHours(data.contactHours)}</S.StatusValue>
    </S.StatusInfo>
    <S.StatusInfo>
      <S.StatusLabel>평균 응답 시간</S.StatusLabel>
      <S.StatusValue>{data.averageResponseTime}</S.StatusValue>
    </S.StatusInfo>
    <S.InquiryButtonWrapper>
      <Button fullWidth>문의하기</Button>
    </S.InquiryButtonWrapper>
  </S.Container>
);

export default SidePanel;

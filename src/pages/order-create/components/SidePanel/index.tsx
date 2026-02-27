import React, { useState } from 'react';
import { type ServiceDetailContent } from '@/entities/service/api/serviceApi';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg?react';
import Button from '@/shared/ui/Button';
import Checkbox from '@/shared/ui/Checkbox';
import * as S from './SidePanel.styles';

interface SidePanelProps {
  serviceData: ServiceDetailContent;
  onSubmit: () => void;
  isLoading: boolean;
}

const SidePanel: React.FC<SidePanelProps> = ({
  serviceData,
  onSubmit,
  isLoading,
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isTermsExpanded, setIsTermsExpanded] = useState(false);

  return (
    <S.SidePanel>
      <S.SideCard>
        <S.ServiceInfoWrapper>
          <S.ServiceThumbnail
            src={serviceData.thumbnail}
            alt={serviceData.serviceName}
          />
          <S.ServiceInfo>
            <S.ServiceName>{serviceData.serviceName}</S.ServiceName>
            <S.ServicePrice>
              {serviceData.salary.toLocaleString()}원 ~
            </S.ServicePrice>
          </S.ServiceInfo>
        </S.ServiceInfoWrapper>
        <S.TermsSection>
          <S.TermsHeader isExpanded={isTermsExpanded}>
            <S.TermsTitle>잼잼 서비스 이용약관</S.TermsTitle>
            <S.ToggleButton
              isExpanded={isTermsExpanded}
              onClick={() => setIsTermsExpanded(!isTermsExpanded)}
            >
              <ArrowDownIcon />
            </S.ToggleButton>
          </S.TermsHeader>
          <S.TermsContent isExpanded={isTermsExpanded}>
            <S.TermsText>
              {`제1조 (목적) 본 약관은 잼잼 서비스(이하 "회사"라 함)가 제공하는
              온라인 서비스 플랫폼을 통해 이루어지는 모든 거래 및 서비스 이용에
              관한 조건과 절차를 규정함을 목적으로 합니다. 제2조 (서비스 제공)
              회사는 의뢰인과 서비스 제공자를 연결하는 플랫폼을 운영하며,
              서비스의 품질과 안전성을 보장하기 위해 노력합니다. 제3조 (결제 및
              환불) - 결제는 사전 결제 방식으로 진행됩니다. - 서비스 시작 전
              취소 시 100% 환불이 가능합니다. - 서비스 진행 중 취소 시 진행률에
              따라 부분 환불됩니다. 제4조 (개인정보 보호) 회사는
              개인정보보호법에 따라 이용자의 개인정보를 안전하게 보호합니다.`}
            </S.TermsText>
          </S.TermsContent>
          <Checkbox
            selected={termsAccepted}
            label="위 약관에 동의합니다."
            onClick={() => setTermsAccepted(!termsAccepted)}
          />
        </S.TermsSection>
        <Button
          fullWidth
          disabled={!termsAccepted || isLoading}
          onClick={onSubmit}
        >
          의뢰하기
        </Button>
      </S.SideCard>
    </S.SidePanel>
  );
};

export default SidePanel;

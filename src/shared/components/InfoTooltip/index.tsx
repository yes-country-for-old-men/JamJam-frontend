import React, { useState } from 'react';
import InfoIcon from '@/shared/assets/icons/info.svg?react';
import * as S from '@/shared/components/InfoTooltip/InfoTooltip.styles';

interface InfoTooltipButtonProps {
  title: string;
  items: string[];
}

const InfoTooltip: React.FC<InfoTooltipButtonProps> = ({ title, items }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <S.Container>
      <S.InfoButton
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <InfoIcon />
      </S.InfoButton>
      <S.InfoBubble visible={isVisible}>
        <S.InfoBubbleTitle>{title}</S.InfoBubbleTitle>
        <S.InfoBubbleList>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </S.InfoBubbleList>
      </S.InfoBubble>
    </S.Container>
  );
};

export default InfoTooltip;

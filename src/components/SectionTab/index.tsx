import React from 'react';
import * as S from './SectionTab.styles';

interface SectionTabProps<T extends readonly string[]> {
  tabs: T;
  activeTab: T[number];
  onTabClick: (tabName: T[number]) => void;
  children: React.ReactNode;
}

const SectionTab = <T extends readonly string[]>({
  tabs,
  activeTab,
  onTabClick,
  children,
}: SectionTabProps<T>) => {
  return (
    <>
      <S.TabContainer>
        {tabs.map((tab) => (
          <S.TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => onTabClick(tab)}
          >
            {tab}
          </S.TabButton>
        ))}
      </S.TabContainer>
      <S.ContentContainer>{children}</S.ContentContainer>
    </>
  );
};

export default SectionTab;

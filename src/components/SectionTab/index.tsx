import React from 'react';
import styled from '@emotion/styled';

const TabContainer = styled.nav`
  position: sticky;
  display: flex;
  top: 80px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  z-index: 1;
`;

const TabButton = styled.button<{ active: boolean }>`
  background-color: transparent;
  border-bottom: 2.5px solid
    ${({ theme, active }) =>
      active ? theme.COLORS.MAIN.PRIMARY : 'transparent'};
  color: ${({ theme, active }) =>
    active ? theme.COLORS.LABEL.PRIMARY : theme.COLORS.LABEL.SECONDARY};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  padding: 16px 32px;
`;

const ContentContainer = styled.div`
  padding: 28px 8px;
`;

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
      <TabContainer>
        {tabs.map((tab) => (
          <TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => onTabClick(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabContainer>
      <ContentContainer>{children}</ContentContainer>
    </>
  );
};

export default SectionTab;

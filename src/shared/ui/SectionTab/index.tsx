import React from 'react';
import * as S from './SectionTab.styles';

export const TabList: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <S.TabContainer>{children}</S.TabContainer>;

export const Tab: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <S.TabButton active={active} onClick={onClick}>
    {children}
  </S.TabButton>
);

export const TabPanel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <S.ContentContainer>{children}</S.ContentContainer>;

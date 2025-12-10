import React from 'react';
import Header from '@components/Header';
import { Outlet } from 'react-router-dom';
import * as S from './Layout.styles';

const Layout: React.FC = () => {
  return (
    <S.LayoutContainer>
      <Header />
      <S.Content>
        <Outlet />
      </S.Content>
    </S.LayoutContainer>
  );
};

export default Layout;

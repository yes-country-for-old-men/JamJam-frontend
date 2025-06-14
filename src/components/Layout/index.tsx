import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import Header from '@components/Header';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 80px;
`;

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;

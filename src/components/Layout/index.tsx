import React from 'react';
import Header from '@components/Header';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 80px;
`;

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </LayoutContainer>
  );
};

export default Layout;

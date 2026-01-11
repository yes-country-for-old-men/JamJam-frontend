import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme';

const queryClient = new QueryClient();

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>{children}</Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;

import { ThemeProvider } from '@emotion/react';
import theme from '@styles/theme';
import GlobalStyle from '@styles/GlobalStyle';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;

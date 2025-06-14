import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '@styles/theme';
import GlobalStyle from '@styles/GlobalStyle';
import Layout from '@components/Layout';
import Main from '@pages/Main';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

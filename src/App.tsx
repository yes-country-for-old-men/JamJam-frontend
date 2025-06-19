import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'jotai';
import { ThemeProvider } from '@emotion/react';
import theme from '@styles/theme';
import GlobalStyle from '@styles/GlobalStyle';
import Layout from '@components/Layout';
import Modal from '@components/Modal';
import Main from '@pages/Main';
import SignUp from '@pages/SignUp';
import Category from '@pages/Category';

const App = () => {
  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="/category/:categoryId" element={<Category />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
        <Modal />
      </ThemeProvider>
    </Provider>
  );
};

export default App;

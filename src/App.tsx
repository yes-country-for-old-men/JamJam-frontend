import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'jotai';
import { ThemeProvider } from '@emotion/react';
import EventHandler from '@components/EventHandler';
import theme from '@styles/theme';
import GlobalStyle from '@styles/GlobalStyle';
import ScrollInitializer from '@components/ScrollInitializer';
import Layout from '@components/Layout';
import Modal from '@components/Modal';
import Main from '@pages/Main';
import SignUp from '@pages/SignUp';
import Category from '@pages/Category';
import Chat from '@pages/Chat';

const App = () => {
  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <ScrollInitializer />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/chat" element={<Chat />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
        <EventHandler />
        <Modal />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
